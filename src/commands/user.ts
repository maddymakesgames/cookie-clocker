import {MessageEmbed} from 'discord.js'
import {CookieClockerClient, CookieClockerMessage, Command, CookieClockerGuildMember} from '../modules/types'

export default class User implements Command {
    aliases: string[] = [];
    name: string = 'user';
    run = (client:CookieClockerClient, message:CookieClockerMessage, args:string[]) => {
        const targetUser = message.mentions.users.first() || message.author;
        const targetMember = message.guild.members.filter(member => member.user.id == targetUser.id).first();
        
        let embed = new MessageEmbed();
        embed = embed.setColor(message.member.displayHexColor).setFooter(targetUser.tag).addField('Cookies',targetUser.cookies).addField('Clocks',targetUser.clocks).setDescription(targetUser.description).setThumbnail(targetUser.displayAvatarURL()).setTimestamp(Date.now()).setTitle(targetMember.displayName || targetUser.username);
        console.log(embed);
        message.channel.send(embed);
    }
}
