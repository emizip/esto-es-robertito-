const discord = require("discord.js");

module.exports = {
  name: "ping",
  category: "info",
  description: "Devuelve latencia y ping API",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    .setDescription(`Pong - ${client.ws.ping}ms`)
    .setColor("RANDOM")
    .setFooter(`Pedido por ${message.author.username}`)
    
    message.channel.send(embed)
  }
}