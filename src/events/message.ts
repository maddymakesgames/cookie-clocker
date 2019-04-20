import { CookieClockerClient, CookieClockerMessage, CookieClockerGuildMember } from '../modules/types';
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
function main(client:CookieClockerClient,message:CookieClockerMessage) {
	if(message.author.bot) return;
	if(!message.author.hasMakers) message.author.addMaker(client.makers[0]);
	message.author.updateClocks();
	//message.guild.members.forEach((member:CookieClockerGuildMember) => member.user.globalMakersTick());

	if(!message.author.hasMakers) message.author.addMaker(client.makers[0]); 

	let prefix:string;
	for(let prefox of message.guild.prefix) {
		if(message.content.startsWith(prefox)) prefix = prefox; 
	}
	if(!prefix) return;
	else {
		message.content = message.content.slice(prefix.length);
		let args = message.content.split(' ')
		// let quotes = message.content.split('"');
		// quotes.forEach((str, index) => {
		// 	if(index%2 == 1) return;
		// 	quotes[index] = str.replace(/ /g, '<<secret-space-char-encoding-lo>>');
		// });
		// let args = quotes.join(' ').split(' ');
		// for(let i = 0; i < args.length; i++) {
		// 	args[i] = args[i].replace(/<<secret-space-char-encoding-lo>>/g, ' ');
		// }
		let command = client.commands[args[0]];
		if(!command) command = client.commands[client.aliases[args[0]]];
		if(!command) return console.log(`no command: ${args}`);
		args.shift();
		command.run(client, message, args);
	}
}

module.exports = {run:main, name:'message'};