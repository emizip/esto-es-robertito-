const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { default_prefix } = require('../../config')

module.exports = {
   
        name: "sell",
        noalias: [""],
        category: "economia",
        description: "Venderle a alguien",
        usage: "[mencion | ID] <amount>",
        accessableby: "everyone"
    ,
    run: async (bot, message, args) => {
        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            fetched = prefix
        } else {
            prefix = fetched
        }
        let user = message.author;

        if (args.join(' ').toLocaleLowerCase() == 'nikes') {
            let embed1 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ No tienes Nike para vender`);

            let nikees = await db.fetch(`nikes_${user.id}`)

            if (nikees < 1) return message.channel.send(embed1)

            db.fetch(`nikes_${user.id}`)
            db.subtract(`nikes_${user.id}`, 1)

            let embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Vendió Nike nuevas por 600 monedas`);

            db.add(`money_${user.id}`, 600)
            message.channel.send(embed2)
        } else if (args.join(' ').toLocaleLowerCase() == 'car') {
            let embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ No tienes un coche para vender`);

            let cars = await db.fetch(`car_${user.id}`)

            if (cars < 1) return message.channel.send(embed3)

            db.fetch(`car_${user.id}`)
            db.subtract(`car_${user.id}`, 1)

            let embed4= new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Vendio un carro por 800 monedas`);

            db.add(`money_${user.id}`, 800)
            message.channel.send(embed4)
        } else if (args.join(' ').toLocaleLowerCase() == 'mansion') {
            let sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ No tienes una mansión para vender`);

            let houses = await db.fetch(`house_${user.id}`)

            if (houses < 1) return message.channel.send(sembed2)

            db.fetch(`house_${user.id}`)
            db.subtract(`house_${user.id}`, 1)

            let sembed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Vendio una mansion por 1200 monedas`);

            db.add(`money_${user.id}`, 1200)
            message.channel.send(sembed3)
        } else {
            if (message.content.toLowerCase() === `${prefix}vender`) {
                let embed9 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`❌ Ingrese un artículo para vender. Tipo ${prefix}almacenar para ver la lista de artículos`)
                return message.channel.send(embed9)
            } else {
              return message.channel.send("**No es un artículo válido!**")
            }
        }
    }
}