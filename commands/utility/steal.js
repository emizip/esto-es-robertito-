const Discord = require('discord.js')
const { parse } = require("twemoji-parser");


module.exports = {
    name: "steal",
    usage: `steal <emoji>`,
    aliases: ["addemoji"],
    description: "Steals Emoji from Other Servers to ur Server.",
    authorPermission: ["MANAGE_EMOJIS"],

    run: async (bot, message, args) => {

   const pls = new Discord.MessageEmbed()
.setDescription("Please give a Emoji to be Added.")
.setColor("FF2052")
        const emoji = args[0];
        if (!emoji) return message.channel.send(pls);

        let customemoji = Discord.Util.parseEmoji(emoji);

        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
              customemoji.animated ? "gif" : "png"
            }`;
            const name = args.slice(1).join(" ");
            message.guild.emojis.create(
                `${Link}`,
                `${name || `${customemoji.name}`}`
            )
            const Added = new Discord.MessageEmbed()
   .setColor(`00FFFF`) 
   .setDescription(`Added emoji with name [${name || `${customemoji.name}`}](${Link}).`);
       
  message.channel.startTyping();
setTimeout(function(){
    message.channel.stopTyping();
    message.channel.send(Added);
}, 2000)
            
        } else {
            let CheckEmoji = parse(emoji, {
                assetType: "png"
            });
            
          const plsw = new Discord.MessageEmbed()
.setDescription("Please Give a Valid Emoji")
.setColor("FF2052")  
            if (!CheckEmoji[0])
                return message.channel.send(plsw);
            
        }
}

}