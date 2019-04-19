import { Command, CookieClockerClient, CookieClockerMessage } from '../modules/types'
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */
export default class Info implements Command {
	run(Client: CookieClockerClient, message: CookieClockerMessage, args: string[]): void {
		let infoMessage = `\`\`\`How to Play\`\`\`\nWith this bot you earn clocks everytime you send a message. The amount of clocks you earn is based on what makers you have.\nYou can check your clocks with {{prefix}}clocks.\nYou can buy new makers with {{prefix}}shop.\n\`\`\`Basic Info\`\`\`\n\`Clocks\`\nClocks are the main currency.\nThey are produced by most makers.\n\`CPM\`\nCPM stands for Clocks Per Message. This tells how many clocks the maker gives you per message.\n\`CPGM\`\nCPGM stands for Clocks Per Global Message and is a replacement for CPM on some makers.\nCPGM is how many clocks you will get per message by anyone in any server you are in (that the bot is also in).\n \`Cookies\`\nCookies are awarded apon a prestige.\nEach cookie provides a 0.01x (1%) bonus to your cpm and cpgm.\nThey are awarded apon a prestige, you get 1 for ever trillion clocks you have and 1 for each 100 makers of the same type you have.`; 
		message.channel.send(infoMessage.replace(/{{prefix}}/g, message.guild.prefix[0]));
	}	
	aliases: string[] = [];
	name: string = 'info';	
}