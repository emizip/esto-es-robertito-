const discord = require("discord.js");

module.exports = {
  name: "membercount",
  category: "info",
  description: "Cuantos miembros hay?",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    .setDescription(
    `
Total de miembros - ${message.guild.memberCount}
Humanos - ${message.guild.members.cache.filter(m => !m.user.bot).size}
Bots - ${message.guild.members.cache.filter(m => m.user.bot).size}`)
    .setColor("PINK")
    .setTimestamp(message.timestamp = Date.now())
    
    message.channel.send(embed)
  }
}