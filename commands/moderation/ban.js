const discord = require("discord.js");

module.exports = {
  name: "ban",
  category: "mod",
  description: "Prohibir a cualquiera de un solo tiro sin conocer a nadie xD",
  usage: "ban <@user> <reason>",
  run: async (client, message, args) => {
    
    const target = message.mentions.members.first()
    
    const reason = args.slice(1).join(" ")
    
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`No tienes suficientes poderes para prohibir a alguien`)
    
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply(`No tengo poderes para prohibir a alguien`)
    
    if(!args[0]) return message.reply(`Por favor menciona a alguien a quien prohibir`)
    
    if(!target) return message.reply(`No puedo encontrar a ese miembro`)
    
    if(target.roles.highest.position >= message.member.roles.highest.position || message.author.id !== message.guild.owner.id) {
      return message.reply(`Ellos tienen mas poder que tu`)
    }
    
    if(target.id === message.author.id) return message.reply(`No puedo prohibirte como eres el jefe`)
    
    if(target.bannable) {
      let embed = new discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Banned \`${target}\` for \`${reason || "No se proporcionó ninguna razón"}\``)
      
      message.channel.send(embed)
      
      target.ban()
      
      message.delete()
      
    } else {
      return message.reply(`No puedo prohibirlos, asegúrate de que mi papel esté por encima del de ellos.`)
    }
    return undefined
  }
};