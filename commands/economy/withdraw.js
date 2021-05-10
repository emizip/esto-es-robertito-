const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    
        name: "withdraw",
        aliases: ["wd"],
        category: "economia",
        description: "Retira dinero del banco",
        usage: "<amount>",
    
    run: async (bot, message, args) => {
        let user = message.author;

        let member2 = db.fetch(`bank_${user.id}`)

        if (args.join(' ').toLocaleLowerCase() == 'all') {
            let money = await db.fetch(`bank_${user.id}`)
            let embed = new MessageEmbed()
              .setColor("GREEN")
              .setDescription(`❌**No tienes dinero para retirar!**`)
            if (!money) return message.channel.send(embed)
            db.subtract(`bank_${user.id}`, money)
            db.add(`money_${user.id}`, money)
            let embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Has retirado todas tus monedas de tu banco`); 
            message.channel.send(embed5)

        } else {

            let embed2 = new MessageEmbed() 
                .setColor("GREEN")
                .setDescription(`❌ Especifique una cantidad para retirar!`);

            if (!args[0]) {
                return message.channel.send(embed2)
            }
            let embed6 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Your Amount Is Not A Number!`)

            if(isNaN(args[0])) {
                return message.channel.send(embed6)
            }
            let embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ No puedes retirar dinero negativo!`);

            if (message.content.includes('-')) {
                return message.channel.send(embed3)
            }
            let embed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ No tienes tanto dinero en el banco!`);

            if (member2 < args[0]) {
                return message.channel.send(embed4)
            }

            let embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Te has retirado ${args[0]} monedas de tu banco!`);

            message.channel.send(embed5)
            db.subtract(`bank_${user.id}`, args[0])
            db.add(`money_${user.id}`, args[0])
        }
    }
}