const discord = require("discord.js");
const akaneko = require('akaneko');

module.exports = {
  name: "nsfwwallpapers",
  aliases: ["nmw", "nsfwmobilewallpapers", "nsfwmwall"],
  category: "nsfw",
  description: "Impresionantes Wallpapers xd",
  run: async (client, message, args) => {
    
    if(!message.channel.nsfw) {
      return message.reply("This channel dosen't support nsfw content")
      
    } else {
    
    let akanekoSan = new discord.MessageEmbed()
    akanekoSan.setColor("RANDOM")
    akanekoSan.setImage(akaneko.nsfw.mobileWallpapers());
    return message.channel.send(akanekoSan);
      
    }
  }
}