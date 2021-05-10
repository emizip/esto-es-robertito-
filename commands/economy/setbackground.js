const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../config')

module.exports = {
    
        name: "setbackground",
        aliases: ['setbg'],
        category: "economia",
        description: 'Establece el fondo del perfil',
        usage: "[upload Image]",
        accessableby: 'everyone'
    ,
    run: async (bot, message, args) => {

        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = default_prefix
     } else {
            prefix = fetched
        }
        let user = message.author;
        let amount = 250;
        let bal = await db.fetch(`money_${user.id}`)

        let newBg = message.attachments.first()
        let fetchBg = await db.fetch(`bg_${user.id}`);
        if (!newBg) {
            if (fetchBg) {
                return message.channel.send(`**Fondo de perfil ya establecido como - \`${fetchBg}\`**`)
            } else {
                return message.channel.send("**Necesita cargar la imagen para establecer un nuevo fondo!**")
            }
        }

        if (bal < amount) return message.channel.send(`**No tienes suficiente dinero!\nPrecio para cambiar el fondo - ${amount}**`)
        db.subtract(`money_${user.id}`, amount)
        db.set(`bg_${user.id}`, newBg.url)

        let embed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`Se ha configurado su imagen de fondo`, user.displayAvatarURL())
            .setDescription(`**\`${amount}\` Se ha deducido y se ha establecido el fondo del perfil\nLink - \`${newBg.url}\`!**`)
            .setFooter(`Para comprobar el tipo de fondo ${prefix}profile`)
        return message.channel.send(embed)
    }
}