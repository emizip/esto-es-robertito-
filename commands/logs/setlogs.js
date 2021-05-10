const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "setlogs",
    category: "config",
    description: "Set channel for Message Delete, Update and Channel Create, Delete Logs.",
    usage: "setLogs <#channel>",
    authorPermission: ["MANAGE_CHANNELS"],
    run: async (client, message, args) => {

        //Start

        let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!Channel) return message.channel.send(`Please Mention A Channel!`);

        if (Channel.type === "voice") return message.channel.send(`Please Mention A Text Channel!`);

        await db.set(`Logging_${message.guild.id}`, Channel.id);

        let Embed = new MessageEmbed()
        .setColor("00FFFF")
        .setDescription(`Logs Channel is setted as <#${Channel.id}>`)

        return message.channel.send(Embed);

        //End

    }
};
