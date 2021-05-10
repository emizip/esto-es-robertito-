const superagent = require("snekfetch");
const Discord = require('discord.js')


module.exports = {
  name: "cat",
  category: "fun/entretenimiento",
description: "Envio imagenes randoms de gatos",
usage: "[command]",
run: async (client, message, args, level) => {
//command
superagent.get('https://nekos.life/api/v2/img/meow')
    .end((err, response) => {
  const lewdembed = new Discord.MessageEmbed()
  .setTitle("Gato Random")
  .setImage(response.body.url)
  .setColor(`#000000`)
  .setFooter(`owo`)
  .setURL(response.body.url);
message.channel.send(lewdembed);
})
}
};