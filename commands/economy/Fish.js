const fishes = require('../../JSON/fishes.json');
let db = require('quick.db');
const ms = require("parse-ms");
const { randomRange } = require('../../functions');
const { MessageEmbed } = require('discord.js');

module.exports = {
    
        name: 'fish',
        aliases: ['catchfish'],
        category: 'economia',
        description: 'Pescar un pez de un vasto océano',
        usage: '[list | rewards] (opcional)',
        acessableby: 'everyone'
    ,
    run: async (bot, message, args) => {

        let user = message.author;

        let bal = db.fetch(`money_${user.id}`)
   
        let fish = await db.fetch(`fish_${user.id}`)
        if (!args[0]) {
            if (bal === null) bal = 0;

            if (fish == null) fish = 0;

            const fishID = Math.floor(Math.random() * 10) + 1;
            let rarity;
            if (fishID < 5) rarity = 'junk';
            else if (fishID < 8) rarity = 'common';
            else if (fishID < 9) rarity = 'uncommon';
            else if (fishID < 10) rarity = 'rare';
            else rarity = 'legendary';
            const fishh = fishes[rarity];
            const worth = randomRange(fishh.min, fishh.max);

            let timeout = 1800000;
            let fishtime = await db.fetch(`fishtime_${user.id}`);

            if (fishtime !== null && timeout - (Date.now() - fishtime) > 0) {
                let time = ms(timeout - (Date.now() - fishtime));

                let timeEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`❌ Recientemente has lanzado una línea\n\nPescar de nuevo en ${time.minutes}m ${time.seconds}s `);
                return message.channel.send(timeEmbed)
            }

            let embed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`**🎣 Lanzaste tu línea y atrapaste un ${fishh.symbol}, Apuesto a que se venderá por alrededor ${worth}**!`)
            message.channel.send(embed);

            db.add(`money_${user.id}`, worth);
            db.add(`fish_${user.id}`, 1);
            db.set(`fishtime_${user.id}`, Date.now())
        }
        if (args[0] === 'list' || args[0] === 'rewards') {

            let lEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`Lista de nombres de peces y recompensas que puede obtener`)
                .setDescription(`
\`\`\`🔧Junk      :: Max Reward: 5, Min Reward: 1
🐟Common    :: Recompensa máxima: 25, recompensa mínima: 10
🐠Uncommon  :: Recompensa máxima: 50, recompensa mínima: 18
🦑Rare      :: Recompensa máxima: 75, recompensa mínima: 30
🐋Legendary :: Recompensa máxima: 100, recompensa mínima: 50\`\`\`
**Todas las recompensas son aleatorias de máximo / mínimo**
​
`)
                .setFooter(message.guild.name, message.guild.iconURL())
            return message.channel.send(lEmbed);
        }
    }
}