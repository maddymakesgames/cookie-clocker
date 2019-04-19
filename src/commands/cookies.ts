import { Command, CookieClockerClient, CookieClockerMessage } from "../modules/types";

export default class Cookies implements Command {
	run(Client: CookieClockerClient, message: CookieClockerMessage, args: string[]): void {
		message.channel.send(`${message.author.tag} you have ${message.author.cookies} cookies giving a ${(message.author.cookieBoost*100)-100}% boost to cpm.`);
	}	
	aliases: string[] = [];
	name: string = 'cookies';


}