const discord = require("discord.js");
const akaneko = require('akaneko');

module.exports = {
  name: "ass",
  aliases: [],
  category: "nsfw",
  description: "No te lo voy a decir investigalo probando el comando xd",
  run: async (client, message, args) => {
    
    if(!message.channel.nsfw) {
      return message.reply("This channel dosen't support nsfw content")
      
    } else {
    
    let akanekoSan = new discord.MessageEmbed()
    akanekoSan.setColor("RANDOM")
    akanekoSan.setImage(akaneko.nsfw.ass());
    return message.channel.send(akanekoSan);
      
    }
  }
}