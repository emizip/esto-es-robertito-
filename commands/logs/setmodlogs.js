const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db")

module.exports = {
  name: "setmodlog",
  category: "config",
  usage: "setmodlog <#channel>",
  description: "Set channel for Mod Logs.",
  authorPermission: ["MANAGE_CHANNELS"],
  run: (client, message, args) => {
    
    let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send("Please Mention the channel first")
    }
    
    //Now we gonna use quick.db
    
    db.set(`modlog_${message.guild.id}`, channel.id)
    
    
    let Embed = new MessageEmbed()
     .setColor("00FFFF")
     .setDescription(`Mod Logs Channel setted as ${channel}`)
     
    message.channel.send(Embed)
  }
}