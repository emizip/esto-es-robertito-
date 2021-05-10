const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "setwelcome",
  category: "mod",
  usage: "setwelcome <#channel>",
  description: "Selecciona el canal de bienvenidas",
  run: (client, message, args) => {
     if (!message.member.hasPermission("ADMINISTRATION")) {
      return message.channel.send("lo siento, necesitas permiso para un");
    }
    let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send("Primero mencione el canal")
    }
    
    //Now we gonna use quick.db
    
    db.set(`welchannel_${message.guild.id}`, channel.id)
    
    message.channel.send(`El canal de bienvenida está configurado como ${channel}`)
  }
}