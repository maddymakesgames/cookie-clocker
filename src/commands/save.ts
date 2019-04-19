import {CookieClockerMessage, CookieClockerClient, Command} from '../modules/types'

export default class Save implements Command {
    aliases: string[] = [];
    name: string = 'save';
    run = (client:CookieClockerClient, message:CookieClockerMessage, args:string[]) => {
    message.author.saveData();
    message.channel.send(`${message.author.tag} you're user data has been saved`);
}
}