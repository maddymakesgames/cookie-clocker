import {CookieClockerClient } from '../modules/types';

const ready = (client:CookieClockerClient) => {
	console.timeEnd('Start Up');
	console.log('I\'m ready to collect those clocks!');
}

module.exports = {run:ready, name:'ready'};