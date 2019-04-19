import { Command, CookieClockerClient, CookieClockerMessage } from "../modules/types";
import { Page } from '../modules/page';
import { Message } from "discord.js";

export default class Makers implements Command {
    aliases: string[] = [];
    name: string = 'makers';
    run = async (client:CookieClockerClient, message:CookieClockerMessage, args:string[]) => {
        let msg = await message.channel.send('loading...');
        let makerList = {};
        for(let i = 0; i < message.author.makers.length; i++) {
            let maker = message.author.makers[i];
            makerList[maker.name] = `Count: ${maker.count}\n Total ${maker.cpgm ? 'CPGM:' : 'CPM:'} ${maker.count * maker.cpm}`
        }
    
        let page = new Page(<Message>msg, message.member, makerList, {title:'Maker List {{currentPage}}'});
        page.start();
    }
    
}
