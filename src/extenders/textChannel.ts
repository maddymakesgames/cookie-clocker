import { Structures, MessageEmbed, MessageAttachment, TextChannel, Message } from 'discord.js';

export class CookieClockerTextChannel extends TextChannel {
	constructor(...args) {
		super(args[0], args[1]);
	}

	/**
	 * @param {any} content
	 * @param { MessageEmbed | MessageAttachment | (MessageEmbed | MessageAttachment)[]} options
	 * Sends a message, but if the content is >2000 chars then it splits it into multiple messages
	 */
	safeSend(content:any = '', options: (MessageEmbed | MessageAttachment | (MessageEmbed | MessageAttachment)[])=null):(Promise<Message | Message[]> | Promise<Message | Message[]>[]) {
		if(typeof content == 'string') {
			if(content.length > 2000) {
				let messages:Promise<Message | Message[]>[] = [];
				content.split(/(.|\n){0,2000}/g).forEach((element)=>messages.push(super.send(element)));
				messages.push(super.send(options));
				return messages;
			}
		}
		return super.send(content, options);
	}
}

Structures.extend('TextChannel', (...args) => CookieClockerTextChannel);