const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "warn",
  category: "mod",
  usage: "warn <@mention> <reason>",
  description: "Advierte usuarios",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        "Debe tener permisos de administrador para usar este comando!"
      );
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        "Por favor, mencione a la persona a la que desea warnear - warn @mencion <razon>"
      );
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("No puedes warnear bots");
    }

    if (message.author.id === user.id) {
      return message.channel.send("No puedes warnearte ti mismo");
    }

    if (user.id === message.guild.owner.id) {
      return message.channel.send(
        "Idiota, ¿cómo puedes warnear al propietario del servidor? -_-"
      );
    }

    const reason = args.slice(1).join(" ");

    if (!reason) {
      return message.channel.send(
        "Proporcione una razón para warnear - warn @mencion <razon>"
      );
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1);
      user.send(
        `Has sido advertido en **${message.guild.name}** por ${reason}`
      );
      await message.channel.send(
        `Usted advirtió **${
          message.mentions.users.first().username
        }** por ${reason}`
      );
    } else if(warnings !== null) {
      
      db.add(`warnings_${message.guild.id}_${user.id}`, 1);
      
      user.send(`Has sido advertido en **${message.guild.name}** for ${reason}`);
      
      await message.channel.send(`Usted advirtió **${message.mentions.users.first().username}** por ${reason}`);
      
      message.delete
      
    }
  }
};
