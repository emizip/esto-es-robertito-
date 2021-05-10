const db = require('quick.db')
const Discord  = require('discord.js')

module.exports = {
    name : 'afk',
    category: "utility",
    usage: "afk [Razon]",
    aliases: ["setafk"],
    description: "Establece tu modo afk(AFK).",
    run : async(client, message, args) => {
       const status = new db.table("MizukiAfk");
    let afk = await status.fetch(message.author.id);
    const embed = new Discord.MessageEmbed().setColor("00FFFF")
    
    if (!afk) {
      embed.setDescription(`**${message.author.tag}** Esta AFK.`)
      embed.setFooter(`Razon: ${args.join(" ") ? args.join(" ") : "Ninguna"}`)
      status.set(`${message.author.id}_${message.guild.id}`, args.join(" ") || `Niniguna`)
message.member.setNickname(`[AFK]  ${message.member.user.username}`)
    }
    message.channel.send(embed)
  }
 }