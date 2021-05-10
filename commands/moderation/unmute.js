const db = require("quick.db");

module.exports = {
  name: "unmute",
  category: "mod",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        "Lo siento, pero no tienes permiso para dejar de silenciar a nadie."
      );
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("No tengo permiso para administrar roles.");
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("Por favor, mencione al miembro al que desea dejar de silenciar.");
    }

    let muterole = message.guild.roles.cache.find(x => x.name === "Muted");

    if (user.roles.cache.has(muterole)) {
      return message.channel.send("Dado que el usuario no tiene un rol mudo, ¿qué se supone que debo tomar?");
    }

    user.roles.remove(muterole)

    await message.channel.send(`**${message.mentions.users.first().username}** ahora no está silenciado`);

    user.send(`Ahora ha dejado de silenciar **${message.guild.name}**`);
    
    message.delete()
  }
};
