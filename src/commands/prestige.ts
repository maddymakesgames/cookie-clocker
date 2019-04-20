import {CookieClockerClient, Command, CookieClockerMessage} from '../modules/types'

export default new class Prestige implements Command {
    aliases: string[] = [];
    name: string = 'prestige';
    run = (client:CookieClockerClient, message:CookieClockerMessage, args:string[]) => {
        if(message.author.canPrestige) {
            let potentialCookies = message.author.potentialCookies;
            message.channel.send(`${message.author.tag}, are you sure you want to prestige? You will get ${potentialCookies} (+${(1+(potentialCookies*0.01))*100}% cpm) and reset your makers and clocks to zero. \n(y/n)`)
            let acceptableAnswers = ['y','n','yes','no'];
            message.channel.awaitMessages((msg)=>message.author.id==msg.author.id && acceptableAnswers.includes(msg.content.toLowerCase())).then((collection)=>{
                if(collection.first().content.toLowerCase() == 'y' || collection.first().content.toLowerCase() == 'yes'){
                    message.author.prestige();
                    message.channel.send(`${message.author.tag}, you have prestiged for the ${message.author.currPrestiege} time and you have gained ${potentialCookies} (+${(1+(potentialCookies*0.01))*100}% cpm) cookies`);
                }
                else {
                    message.channel.send(`${message.author.tag} you have decided to not prestige, keep on getting those clocks!`);
                }
            });
        }
        else {
            message.channel.send(`${message.author.tag} you need ${1000000000 - message.author.clocks} more clocks in order to prestige.`);
        }
    }
    
}