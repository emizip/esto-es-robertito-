const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "snipe",
  aliases: ["ms", "messagesnipe"],
  category: "info",
  usage: "(prefix)snipe",
  description: "Obtener el último mensaje que se elimina con el autor del mensaje y la imagen (si corresponde)",
  run:async (client, message, args) => {
    
    const msg = client.snipes.get(message.channel.id)
    if(!msg) return message.channel.send("No hay nada que disparar!")
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author)
    .setDescription(msg.content)
    if(msg.image)embed
    .setImage(msg.image)
    .setColor("00FFFF")
    .setTimestamp();
    
    message.channel.send(embed)
   
    
  }
}