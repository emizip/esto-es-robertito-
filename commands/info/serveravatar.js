const discord = require("discord.js")

module.exports = {
  name: "servericon",
  aliases: ["sav", "guildavatar"],
  category: "info",
  description: "Mira el Avatar del Server",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    
      embed.setDescription(`[𝔻𝔼𝕊ℂ𝔸ℝ𝔾𝔸ℝ](${message.guild.iconURL({ dynamic: true, size: 1024 })})`)
      embed.setImage(message.guild.iconURL({ dynamic: true, size: 1024 }))
      embed.setColor("BLUE")
    
      message.channel.send(embed)
    
  }
}