const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "removerole",
  aliases: ["rmrole", "-role"],
  category: "mod",
  description: "quitale el rol a un usuario",
  run: async (client, message, args) => {
    
    let target = message.mentions.members.first();
    
    if(!target) return message.reply(`No puedo encontrar al usuario`)
    
    let rrole = message.mentions.roles.first();
    
    if(!rrole) return message.reply(`No puedo encontrar el papel`)
    
    let ticon = target.user.avatarURL({ dynamic: true, size: 2048 });
    let aicon = message.author.avatarURL({ dynamic: true, size: 2048 });
    
      const embed = new MessageEmbed()
      .setAuthor(target.user.username, ticon)
      .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
      .setColor("RANDOM")
      .setDescription(`${rrole} Rol removido ${target}`)
      .setFooter(`Rol agregado por ${message.author.username}`, aicon)
      .setTimestamp()
      
      await message.channel.send(embed)
      
      target.roles.remove(rrole)
    
  }
}