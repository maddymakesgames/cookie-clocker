//Get the config file and user data paths
let configPath = '../config.json'
let userDataPath = '../user_data/'
let makersPath = '../makers.json'

import Discord from 'discord.js'
import * as fs from 'fs'
import {Maker, CookieClockerClient, Command} from './modules/types'

console.time('Start Up');
//Make an array of all the events we don't want to listen to. We only really need reactions for reactionCollectors and such and messages for commands, duh
const disabledEvents = <Discord.WSEventType[]>['CHANNEL_CREATE','CHANNEL_DELETE','CHANNEL_PINS_UPDATE','CHANNEL_UPDATE','GUILD_BAN_ADD','GUILD_BAN_REMOVE','GUILD_EMOJIS_UPDATE','GUILD_INTEGRATIONS_UPDATE','MESSAGE_DELETE_BULK','MESSAGE_REACTION_REMOVE_ALL','PRESENCE_UPDATE','TYPING_START','VOICE_STATE_UPDATE','VOICE_SERVER_UPDATE','WEBHOOKS_UPDATE']; //Thats a lot of events

// Require the extender files before making the client
fs.readdirSync('./extenders').forEach((file) => {
	console.log(`Loading Extender ${file}`)
	if(!file.endsWith('.js')) return;
	require(`./extenders/${file}`);
});

//Create the client and the disable some events and disable @everyone because it is annoying
const client = <CookieClockerClient>new Discord.Client({disableEveryone:true, disabledEvents:disabledEvents});

//Grab the config file and put it on the client object
client.config = require(configPath);

//Require the event files and bind them to their respective events, and send them the client object as a perameter
fs.readdirSync('./events').forEach((file) => {
	if(!file.endsWith('.js')) return;
	console.log(`Loading Event: ${file}`);
	let func = require(`./events/${file}`);
	client.on(func.name, func.run.bind(null, client));
});



//Require the command files and add them to the list of commands. We'll use these in our message event
client.commands = {};
client.aliases = {};

fs.readdirSync('./commands').forEach((file) => {
	console.log(`Loading Command: ${file}`);
	let cmd;
	//Detect if the thing we found in the commands dir and if it is put all the files in that dir into the commands object if they end in .js
	if(fs.lstatSync(`./commands/${file}`).isDirectory()) fs.readdirSync(`./commands/${file}`).forEach((f) => {
		if(f.endsWith('.js')) cmd = require(`./commands/${file}/${f}`);
		if(!cmd) return;
		client.commands[cmd.name] = cmd;
		cmd = cmd.default;
		for(let i = 0; i < cmd.aliases.length; i++) {
			client.aliases[cmd.aliases[i]] = cmd.name;
		}
	});
	else {
		if(file.endsWith('.js')) cmd = require(`./commands/${file}`);
		if(!cmd) return;
		cmd = cmd.default;		
		client.commands[cmd.name] = cmd;
		for(let i = 0; i < cmd.aliases.length; i++) {
			client.aliases[cmd.aliases[i]] = cmd.name;
		}
	}
});

client.makers = require(makersPath).makers;
client.userDataPath = userDataPath;


console.log('Logging in');
//Login to the discord api
client.login(client.config.token).catch((err)=> console.error(err));