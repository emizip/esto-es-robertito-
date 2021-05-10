const discord = require("discord.js");
const { Random } = require("something-random-on-discord");
const random = new Random();

module.exports = {
  name: "cry",
  category: "fun/entretenimiento",
  description: "llora con gifs",
  run: async (client, message, args) => {
    
    let data = await random.getAnimeImgURL("cry");
    
    let embed = new discord.MessageEmbed()
    .setImage(data)
    .setColor("RANDOM")
    .setFooter(`El usuario ${message.author} Esta llorando 😢`)
    .setTimestamp()
    
    message.channel.send(embed);
  }
};