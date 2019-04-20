import {CookieClockerClient, CookieClockerMessage, Command} from '../modules/types';

class setDescription implements Command {
	run(client:CookieClockerClient, message:CookieClockerMessage, args: string[]) {
		let newDesc = args.join(' ');
		let success = message.author.setDescription(newDesc);
		if(success == -1) return message.channel.send(`${message.author.tag}, your description must be shorter than 552 characters`);
		message.channel.send(`${message.author.tag}, your description has been changed.`);
	}
	name = 'description';
	aliases = ['setDescription', 'descript'];
}

export default new setDescription();