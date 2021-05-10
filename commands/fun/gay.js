const Discord = require("discord.js")



module.exports = {
  name: "gay",
  aliases: ["gayporcentaje"],
  category: "fun/entretenimiento",
description: "que tan gay",
usage: "gay @usuario",
run: async (client, message, args) => {

    let porcentaje = ["10%", "12%", "13%", "14%", "15%", "16%", "17%", "18%", "19%", "20%", "21%", "22%", "23%", "24%", "25%", "26%", "26%", "27%", "28%", "29%", "30%", "31%", "32%", "33%", "34%", "35%", "50%", "51%", "54%", "53%", "101%", "81%", "56%", "78%", "74%"]

    var gay = porcentaje[Math.floor(Math.random() * porcentaje.length)]
      let userm = message.mentions.users.first()
  if (!userm) return message.reply(":x: **Mencione a quien medir el porcentaje Gay**  :rainbow_flag:")
  const embed = new Discord.MessageEmbed()
    .addField(`Porcentaje gay de ${userm.username}`, `Es **${gay}** gay  :rainbow_flag:`)
    .setColor("RANDOM")
    message.channel.send(embed)
  }
}
;
