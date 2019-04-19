import {Command, CookieClockerClient, CookieClockerMessage} from '../modules/types';

export default class Clocks implements Command {
	run(Client: CookieClockerClient, message: CookieClockerMessage, args: string[]): void {
		message.channel.send(`${message.member.displayName} you have ${message.author.clocks} clocks!`);
	}	
	aliases: string[] = [];
	name: string = 'clocks';
}