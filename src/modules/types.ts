import { Client, Message, GuildMember, MessageMentions, Collection, User, Role, GuildMemberStore, Base } from "discord.js";
import { CookieClockerUser } from "../extenders/user";
import { CookieClockerGuild } from "../extenders/guild";
import { CookieClockerTextChannel } from "../extenders/textChannel";

export type Maker = {
    name:string;
    description:string;
    requirements:string[];
    cost:number;
    cpm:number;
    cpgm:boolean;
    effects:string[];
}

export type UserMaker = {
	name:string;
    description:string;
    requirements:string[];
    cost:number;
    cpm:number;
    cpgm:boolean;
	effects:string[];
	count:number;
}

export class CookieClockerClient extends Client {
    public config:ConfigFile;
    public commands:any;
    public aliases:any;
    public makers:Maker[];
    public userDataPath:string;
}

export class CookieClockerMessage extends Message {
    public author:CookieClockerUser;
    public member:CookieClockerGuildMember;
    public guild:CookieClockerGuild;
	public mentions:CookieClockerMessageMentions;
	public channel:CookieClockerTextChannel;
}

export class CookieClockerGuildMember extends GuildMember {
    public user:CookieClockerUser;
    public guild:CookieClockerGuild;
}

type ConfigFile = {
    token:string;
}

export interface Command  {
    run(Client:CookieClockerClient, message:CookieClockerMessage, args:string[]):void;
    aliases:string[];
    name:string;
}

export type PageOptions = {
    itemsPerPage?:number;
    title?:string;
    textOnly?:boolean;
    hasOptions?:boolean;
}

class CookieClockerMessageMentions extends MessageMentions {
    public members:Collection<string, CookieClockerGuildMember>
    public users:Collection<string, CookieClockerUser>
}

class CookieClockerGuildMemberStore extends GuildMemberStore {
    public members:Collection<string, CookieClockerGuildMember>
}