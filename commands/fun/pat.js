const discord = require("discord.js");
const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = {
  name: "pat",
  aliases: ["palmada"],
  category: "fun/entretenimiento",
  description: "Dale una pequeña palmada a alguien :D",
  run: async (client, message, args) => {
    
    let target = message.mentions.members.first()
    
    let data = await random.getAnimeImgURL("pat");
    
    let embed = new discord.MessageEmbed()
    .setImage(data)
    .setColor("RANDOM")
    .setFooter(`${message.author.username} acaricio a owo ${target.user.username}`)
    .setTimestamp()
    
    message.channel.send(embed);
  }
};