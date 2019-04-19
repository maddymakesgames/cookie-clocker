import { Page }  from '../modules/page';
import {Command, CookieClockerClient, CookieClockerMessage} from '../modules/types'

export default class Shop implements Command {
	aliases: string[] = [];
	name: string = 'shop';
	run = async (client:CookieClockerClient, message:CookieClockerMessage, args:string[]) => {
		let makerList = {};
		let emoteList = [':keycap_ten:', ':nine:', ':eight:', ':seven:', ':six:', ':five:', ':four:', ':three:', ':two:', ':one:'].reverse();
		for(let i = 0; i < client.makers.length; i++) {
			let maker = client.makers[i];
			makerList[`${emoteList[i%8]} : ${maker.name}`] = `Cost: ${message.author.getCost(maker)}\n${!maker.cpgm ? `CPM: ${maker.cpm}` : `CPGM: ${maker.cpgm}`}`
		}
		let msg = await message.channel.send('Loading Store... \n Please Wait...');

		let optionsFunction = (index:number, currPage:number) => {
			let chosenMaker = client.makers[index+(8*currPage)];
			const cost = message.author.getCost(chosenMaker);
			if(message.author.clocks >= cost) {
				message.author.addMaker(chosenMaker);
				message.author.clocks = message.author.clocks - cost;
				(<CookieClockerMessage>msg).edit(`${message.member.displayName}, you have bought one ${chosenMaker.name} for ${cost}`, {embed:null});
				page.stop();
			} else {
				(<CookieClockerMessage>msg).edit(`${message.member.displayName} you do not have enough clocks to buy ${chosenMaker.name}`, {embed:null})
				page.stop();
			}
		}
	
		let page = new Page((<CookieClockerMessage>msg), message.member, makerList, {hasOptions:true, itemsPerPage:8, title: 'Clock Maker Shop'}, optionsFunction);
		page.start();
	}
}