const db = require("quick.db");

module.exports = {
  name: "resetwarns",
  aliases: ["rwarns", "rsetwarns"],
  category: "mod",
  usage: "rwarns <@user>",
  description: "Reinicia los warns de un usuario",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "Debe tener permisos de administrador para usar este comando"
      );
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("Mencione a la persona cuya advertencia desea restablecer");
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("Los bots no pueden tener advertencias");
    }

    if (message.author.id === user.id) {
      return message.channel.send("No tiene permitido restablecer sus advertencias");
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      return message.channel.send(`${message.mentions.users.first().username} no tengo ninguna advertencia`);
    }

    db.delete(`warnings_${message.guild.id}_${user.id}`);
    user.send(
      `Todas sus advertencias son reseteadas por ${message.author.username} de ${message.guild.name}`
    );
    await message.channel.send(
      `Restableció todas las advertencias de ${message.mentions.users.first().username}`
    );
  }
};
