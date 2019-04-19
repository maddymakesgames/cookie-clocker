import { Guild, Structures } from "discord.js";

export class CookieClockerGuild extends Guild {
	public prefix:string[]
	constructor(client, ...args) {
		super(client, ...args);
		this.prefix = ['cc.', 'CC.'];
	}

	saveData() {

	}

	loadData() {
		
	}
}
Structures.extend(('Guild'), (...args) => CookieClockerGuild);