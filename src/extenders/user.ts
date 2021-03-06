import { Structures, User } from 'discord.js';
import {UserMaker, Maker, CookieClockerClient} from '../modules/types';
import fs from 'fs'

export class CookieClockerUser extends User {

	public clocks:number;
	public makers:UserMaker[];
	public globalMakers:UserMaker[];
	public currPrestiege:number;
	public cookies:number;
	public description:string;
	public allTimeClocks:number;
	public allTimeCookies:number;
	public client:CookieClockerClient;
	private highestClocks:number;


	constructor(client:CookieClockerClient, data:object) {
		//Required, basiaclly creates a User object and then attaches my methods to it.
		super(client, data);
		this.clocks = 0;
		this.makers = [];
		this.globalMakers = [];
		this.currPrestiege = 1;
		this.cookies = 0;
		this.description = 'A cool person is me.'
		this.allTimeClocks = 0;
		this.allTimeCookies = 0;

		this.loadData();
		if(!this.bot)setTimeout(this.recursiveSave.bind(this), 6000);
	}

	/**
	 * Update the amount of clocks the user has
	 */
	updateClocks() {
		for(let i = 0; i < this.makers.length; i++) {
			let maker = this.makers[i]
			this.clocks += Math.floor((maker.cpm*maker.count)*this.cookieBoost);
		}
		if(this.clocks > this.highestClocks) this.highestClocks = this.clocks;
	}

	globalMakersTick() {
		for(let i = 0; i < this.makers.length; i++) {
			let maker = this.globalMakers[i];
			this.clocks += Math.floor((maker.cpm*maker.count)*this.cookieBoost);
		}
	}

	/**
	 * Add a maker to the user
	 */
	addMaker(maker:Maker) {
		//test if the user already has a maker of the type. If they do just add 1 to the count.
		if(this.makers.filter((m) => m.name == maker.name)[0]) this.makers[this.makers.findIndex((m)=>m.name==maker.name)]['count'] += 1;
		//If they don't then give them the maker and add a new prop to it listing how many the user has
		else {
			(<UserMaker>maker).count = 1;
			if(maker.cpgm) this.globalMakers.push(<UserMaker>maker);
			else this.makers.push(<UserMaker>maker);
			
		}
	}

	/**
	 * If the user has any makers
	 */
	get hasMakers() {
		return Object.keys(this.makers)[0]
	}

	/**
	 * Returns if the user can prestige, its just if they have > 1,000,000,000 clocks
	 */
	get canPrestige() {
		return this.clocks > 1000000000
	}

	/**
	 * Resests clocks and makers to zero and then gives cookies based on the amount of makers and the amount of clocks
	 */
	prestige() {
		this.currPrestiege++;
		let extraCookies = 0;
		for(let i = 0; i < this.makers.length; i++) {
			let maker = this.makers[i];
			if(maker.count > 100) {
				extraCookies += maker.count%100;
			}
		}
		this.allTimeClocks += this.clocks;
		this.cookies += Math.floor(Math.cbrt(this.clocks/1000000000) + extraCookies);
		this.clocks = 0;
		this.makers = [];
		this.highestClocks = 0;
	}

	/**
	 * Loads the user's data from userData/[user_id].json
	 */
	loadData() {
		let data;
		try {data = JSON.parse(fs.readFileSync(`${this.client.userDataPath}${this.id}.json`).toString()); }
		catch(e) {
			data = {};
		}
		if(!data) return;
		this.cookies = data.cookies || this.cookieBoost;
		this.clocks = data.clocks || this.clocks;
		this.currPrestiege = data.currPrestiege || this.currPrestiege;
		this.makers = data.makers || this.makers;
		this.description = data.description || this.description;
		this.globalMakers = data.globalMakers || this.globalMakers;
		this.allTimeClocks = data.allTimeClocks || this.allTimeClocks;
		this.allTimeCookies = data.allTimeCookies || this.allTimeCookies;
		this.highestClocks = data.highestClocks || this.highestClocks;
	}

	/**
	 * Recursivly calls saveData()
	 */
	recursiveSave() {
		this.saveData();
		setTimeout(this.recursiveSave.bind(this), 60000);
	}

	/**
	 * Saves the user data to userData/[user_id].json
	 */
	saveData() {
		let data;
		
		try{ data = JSON.parse(fs.readFileSync(`${this.client.userDataPath}${this.id}.json`).toString()); }
		catch(e) {
			data = {};
			console.error(e)
		}
		let userdata = {
			makers:this.makers,
			globalMakers:this.globalMakers,
			cookies:this.cookies,
			clocks:this.clocks,
			currPrestiege:this.currPrestiege,	
			description:this.description,
			allTimeClocks:this.allTimeClocks,
			allTimeCookies:this.allTimeCookies,
			highestClocks:this.highestClocks
		}
		fs.writeFileSync(`${this.client.userDataPath}${this.id}.json`, JSON.stringify(userdata));
	}

	/**
	 * Returns the cost of the maker for the user, this allows the cost to increase in order to avoid crazy power out of the early things.
	 */
	getCost(maker:Maker) {
		//If the user doesn't already have the maker just return the default cost
		if(Object.keys(this.makers).indexOf(maker.name) == -1) return maker.cost;
		else {
			//Get the local maker info
			let localMaker = this.makers[maker.name];
			//Magic formula for the cost. The ending cost is 25%*count more that default
			return localMaker.cost*(1+(.25*localMaker.count)); 
		}
	}

	/**
	 * The boost to cpm the user gets from cookies, in decimial not percent
	 */
	get cookieBoost() {
		return ((0.01*this.cookies)+1);
	}

	/**
	 * Gets the current amount of cookies the user would get for prestiging.
	 */
	get potentialCookies() {
		let extraCookies = 0;
		for(let i = 0; i < this.makers.length; i++) {
			let maker = this.makers[i];
			if(maker.count > 100) {
				extraCookies += maker.count%100;
			}
		}
		return Math.floor(Math.cbrt(this.clocks%1000000000) + extraCookies);
		
	}

	/**
	 * @param {Object} maker
	 * Tests if the user has the conditions to unlock a maker
	 */
	canUseMaker(maker:Maker) {
		if(!maker.requirements)return this.clocks > maker.cost*.9;
		maker.requirements.push('this.clocks > maker.cost*.9')
		for(let i = 0; i < maker.requirements.length; i++){
			let test = maker.requirements[i];
			test.replace(/{{prestige}}/g, this.currPrestiege.toString()).replace(/{{cookies}}/g, this.cookies.toString()).replace(/{{clocks}}/g, this.clocks.toString());
			let req = eval(test);
			if(!req) return false;
		}
		return true;
	}

	/**
	 * @param {String} newDesc
	 * @returns {Number | String} returns -1 if the description is too long, returns the new description apon a valid set
	 */
	setDescription(newDesc:string) {
		if(typeof newDesc != 'string') throw new TypeError('User\'s description must be a string');
		if(newDesc.length > 552) return -1;
		this.description = newDesc;
		return this.description;
	}

}

//Extend the base User object to add some things to make it easier for the bot
Structures.extend('User', (...args) => CookieClockerUser);