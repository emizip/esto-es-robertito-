const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'setwlcm',
	category: 'config',
	usage: 'setwlcm <#channel>',
	description: 'Set channel for Welcome Message with a Simple Welcome Card.',
	authorPermission: ['MANAGE_CHANNELS'],
	run: (client, message, args) => {
		let channel = message.mentions.channels.first();

		if (!channel) {
			return message.channel.send('Please Mention the channel first');
		}

		//Now we gonna use quick.db

		db.set(`welchannel_${message.guild.id}`, channel.id);

		let Embed = new MessageEmbed()
			.setColor('00FFFF')
			.setDescription(`Welcome Channel is setted as ${channel}`);

		message.channel.send(Embed);
	}
};