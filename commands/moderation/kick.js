const { MessageEmbed } = require("discord.js")
const moment = require('moment')

module.exports = {
name: "kick",
category: "mod",
description: "Patea un usuario del server",
cooldown: 5,
userPerms: ["KICK_MEMBERS"],
clientPerms: ["KICK_MEMBERS"],
run: async(client, message, args) => {  
const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
const reason = args.slice(1).join(" ")
          if (!args[0]) return message.channel.send(":x: | **Especificar a alguien a quien patear.**")
        if (!mentionedMember) return message.channel.send(":x: | **I can't find that member.**")
        if (mentionedMember.id === message.author.id) return message.channel.send(":x: | No puedes patearte a ti mismo.")
        if (mentionedMember.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id) {
            return message.channel.send(":x: | **Usted puede\'no puede hechar a este miembro debido a que su función es inferior a la de ese miembro.**")
        }
        if (mentionedMember.kickable) {
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL({dynamic: true}))
            .setThumbnail(mentionedMember.user.displayAvatarURL({dynamic: true}))
            .setColor(`RANDOM`)
            .setDescription(`
**Miembro:** ${mentionedMember.user.username} - (${mentionedMember.user.id})
**Razon:** ${reason || "None"}
            `)
        message.channel.send(embed)
        mentionedMember.kick()
        } else {
            return message.channel.send(":x: | **No puedo\'Hechar a este usuario, asegurarse de que el rol de los usuarios sea más bajo que mi rol.**")
        }
        return undefined
    }
}