let game = {
	"536040503234527244": {
	  "host": "366456097839644672",
	  "channel": "536040503234527244",
	  "players": [
		"366456097839644672"
	  ],
	  "points": [
		0
	  ]
	}
  };

import {Command, CookieClockerClient, CookieClockerMessage} from '../modules/types'

export default class Join implements Command {
	run(Client:CookieClockerClient, message:CookieClockerMessage, args: string[]): void {
		console.log(game);
		if(!game[message.channel.id]) game[message.channel.id] = {"host":message.author.id, channel:message.channel.id, players:[],points:[]};
		game[message.channel.id].players.push(message.author.id);
	}	
	aliases: string[] = [];
	name: string = 'join';

	
}