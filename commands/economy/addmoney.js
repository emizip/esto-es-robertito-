const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
   
        name: "addmoney",
        aliases: ["am"],
        category: "economia",
        description: "Agregale dinero a un usuario",
        usage: "[ mention | ID]",
        accessableby: "Administrator, Owner"
    ,
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("❌ | Tu no tienes permisos para agregar dinero! - [ADMINISTRATOR]");
        if (!args[0]) return message.channel.send("**Por favor menciona un Usuario!**")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("**Ingrese un Usuario VALIDO!**")
        if (!args[1]) return message.channel.send("**Ingrese una Cantidad!**")
        if (isNaN(args[1])) return message.channel.send(`**❌ Tu monto no es un número!**`);
        if (args[0] > 10000) return message.channel.send("**No se puede agregar tanta cantidad!**")
        db.add(`Dinero_${user.id}`, args[1])
        let bal = db.fetch(`Dinero_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ Agregado ${args[1]} coins\n\nNuevo equilibrio: ${bal}`);
        message.channel.send(moneyEmbed)

    }
}