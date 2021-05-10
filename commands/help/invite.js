const discord = require("discord.js");

module.exports = {
  name: "invite",
  category: "info",
  description: "Invite a Robertito",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    .setTitle(`HERE INVITE LINK OF BOT`)
    .setDescription(`<:greenTick:822101337436323851> [CLICK HERE](https://discord.com/oauth2/authorize?client_id=818542511579594764&permissions=8&scope=bot)`)
    .setColor("RANDOM")
    .setFooter(`Invitame :D`)
    .setTimestamp(message.timestamp = Date.now())
    
    message.channel .send(embed)
    
  
  }
}