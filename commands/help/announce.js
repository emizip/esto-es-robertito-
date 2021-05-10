const Discord = require ('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
name: "announce",
aliases: ["", "a"],
category: "mod",
usage: "announce <texto a decir>",
description: "Devuelve el texto proporcionado en el formulario de inserción.",
run: async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATION")) return message.channel.send(`NO TIENES PERMISO `)
 await message.delete()
  let say = message.content.split(" ").slice(1).join(" ")
  if(!say) return message.channel.send(`❌ | `+"No puedo repetir el mensaje en blanco")
  let embed = new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL())
  .setDescription(`${say}`)
  .setColor("RANDOM")
.setFooter(` ${message.guild}`)
.setTimestamp()
  message.channel.send(embed)
}
}