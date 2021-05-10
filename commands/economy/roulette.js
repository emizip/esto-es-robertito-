const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const { default_prefix } = require('../../config');

module.exports = {
   
        name: "roulette",
        aliases: ["roul"],
        category: "economia",
        description: "Apueste un color para ganar o perder",
        usage: "[colour]<amount>",
        accessableby: "everyone"
    ,
    run: async (bot, message, args) => {
        let prefix = "q"
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            fetched = prefix
        } else {
            prefix = fetched
        }
      
        let user = message.author;

        function isOdd(num) {
            if ((num % 2) == 0) return false;
            else if ((num % 2) == 1) return true;
        }

        let colour = args[0];
        let money = parseInt(args[1]);
        let moneydb = await db.fetch(`money_${user.id}`)

        let random = Math.floor((Math.random() * 10));

        let moneyhelp = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ Especifique una cantidad para apostar | ${prefix}ruleta <color> <amount>`);

        let moneymore = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ Estás apostando más de lo que tienes`);

        let colorbad = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ Especifica un color | Rojo [1.5x] (normal) Negro [2x] (hard) Verde [15x](rare)`);

        if (!colour) return message.channel.send(colorbad);
        colour = colour.toLowerCase()
        if (!money) return message.channel.send(moneyhelp);
        if (money > moneydb) return message.channel.send(moneymore);

        if (colour == "n" || colour.includes("negro")) colour = 0;
        else if (colour == "r" || colour.includes("rojo")) colour = 1;
        else if (colour == "v" || colour.includes("verde")) colour = 2;
        else return message.channel.send(colorbad);

        if (random == 1 && colour == 2) { // Green
            money *= 15
            db.add(`money_${user.id}`, money)
            let moneyEmbed1 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ You won ${money} monedas\n\nMultiplicador: 15x`);
            message.channel.send(moneyEmbed1)
        } else if (isOdd(random) && colour == 1) { // Red
            money = parseInt(money * 1.5)
            db.add(`money_${user.id}`, money)
            let moneyEmbed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`🔴 Ganaste ${money} monedas\n\nMultiplicadas: 1.5x`);
            message.channel.send(moneyEmbed2)
        } else if (!isOdd(random) && colour == 0) { // Black
            money = parseInt(money * 2)
            db.add(`money_${user.id}`, money)
            let moneyEmbed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`⬛ Ganaste ${money} monedas\n\nMultiplicado: 2x`);
            message.channel.send(moneyEmbed3)
        } else { // Wrong
            db.subtract(`money_${user.id}`, money)
            let moneyEmbed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Perdiste ${money} monedas\n\nMultiplicado: 0x`);
            message.channel.send(moneyEmbed4)
        }
          db.add(`games_${user.id}`, 1)
    }
}