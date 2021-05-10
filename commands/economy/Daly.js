const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    
        name: "daily",
        aliases: ["coins-system"],
        category: "economia",
        description: "Te da 200 por día",
        usage: " ",
        accessableby: "everyone"
    ,
    run: async (bot, message, args) => {
        let user = message.author;

        let timeout = 86400000;
        let amount = 200;

        let daily = await db.fetch(`daily_${user.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let timeEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Ya recogió su recompensa diaria\n\nRecógelo de nuevo en ${time.hours}h ${time.minutes}m ${time.seconds}s `);
            message.channel.send(timeEmbed)
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Has recolectado tu recompensa diaria de ${amount} monedas`);
            message.channel.send(moneyEmbed)
            db.add(`money_${user.id}`, amount)
            db.set(`daily_${user.id}`, Date.now())


        }
    }
}