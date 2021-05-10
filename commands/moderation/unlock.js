const Discord = module.require("discord.js");

module.exports = {
   name: "unlock",
   description: "Abre el canal",
    usage: "unlock <channel>",
  args: true,
  category: "mod",
    permissions: "MANAGE_CHANNELS",
   run: async(client, message, args) => {
   if (!message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
   return message.channel.send("No tienes suficientes permisos")
   }
   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        null : ['SEND_MESSAGES'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   .setTitle("Actualizaciones del canal")
   .setDescription(`🔓 ${message.channel}  Ha sido desbloqueado`)
   .setColor("RANDOM");
   await message.channel.send(embed);
   message.delete();
}
}