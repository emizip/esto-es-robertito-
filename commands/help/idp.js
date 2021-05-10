const discord = require("discord.js");

module.exports = {
  name: "idp",
  category:"fun",
  run: async (client, message, args) => {
    
    if(!args[0]) {
      return message.channel.send("Indique el ID de la habitación")
    }
    
    let pass = args.slice(1).join(" ")
    
    if(!pass) {
      return message.channel.send("Por favor ingrese la contraseña de la habitación");
    }

  let embed = new discord.MessageEmbed()
  .addField("Room ID", "`" + args[0] + "`")
  .addField("Password", "`" + pass + "`")
  .setColor("RANDOM")
  message.channel.send(embed)

  message.delete()
    
  }
}