const discord = require("discord.js")

module.exports = {
  name: "servericon",
  aliases: ["sav", "guildavatar"],
  category: "info",
  description: "Mira el Avatar del Server",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    
      embed.setDescription(`[π»πΌπβπΈβπΎπΈβ](${message.guild.iconURL({ dynamic: true, size: 1024 })})`)
      embed.setImage(message.guild.iconURL({ dynamic: true, size: 1024 }))
      embed.setColor("BLUE")
    
      message.channel.send(embed)
    
  }
}