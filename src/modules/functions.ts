module.exports = (client) => {
	process.on('beforeExit', () => {
		client.guilds.array().forEach((guild) => {	
			guild.saveData();
			
		});
		client.users.array().forEach((user) => {
			user.saveData();
		})
	});
};