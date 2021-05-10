const { MessageEmbed }= require("discord.js");
const db = require("quick.db");

module.exports = {
    
        name: "removemoney",
        aliases: ["rm"],
        category: "economia",
        description: "Elimina dinero de un usuario",
        usage: "[ mencion | ID]",
        accessableby: "Administrator, Owner"
    ,
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_GUILD")) return message.channel.send("❌ No tienes permisos para retirar dinero!");
        if (!args[0]) return message.channel.send("**Por favor ingrese un usuario!**")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("**Ingrese un Usuario Valible!**")

        if (!args[1]) return message.channel.send("**Ingrese una cantidad!**")
        if (isNaN(args[1])) return message.channel.send("**Ingrese una cantidad válida!**");
        let bal = await db.fetch(`money_${user.id}`)

        if (args[0] > bal) return message.channel.send("**No puedo sacar tanto dinero!**")
        db.subtract(`money_${user.id}`, args[1])
        let bal2 = await db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ Removido ${args[1]} monedas\n\nNuevo Balance: ${bal2}`);
        message.channel.send(moneyEmbed)

    }
}