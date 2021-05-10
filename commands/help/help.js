const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description:
    "Veamos todos los comandos",
  usage: "help <cmd>",
  category: "info",
  run: async (client, message, args) => {
    if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Comando desconocido: " + args[0]);
      }

      let embed = new MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .addField("Descripcion", command.description || "No provisto :(")
        .addField("Uso", "`" + command.usage + "`" || "No provisto")
		.addField("Alias", "`" + command.aliases + "`" || "No provisto")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      const commands = await client.commands;

      let emx = new MessageEmbed()
        .setDescription("**[Unete a mi soporte](https://discord.gg/NcH3xWcvGz )**.  | **[Canal de mi Creador ](https://www.youtube.com/channel/UC8itpSllGcO6jpdPIq05CwA)** Recuerda usar la prefix antes de un comando")
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        
        .setThumbnail(client.user.displayAvatarURL());
          
      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Desconocido";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        emx.addField(`${category.toUpperCase()}[${value.length}]`, desc);
      }

      return message.channel.send(emx);
    }
  }
};
