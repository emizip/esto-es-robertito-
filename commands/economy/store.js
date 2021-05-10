const { MessageEmbed } = require('discord.js');
const { default_prefix } = require('../../config');
const db = require('quick.db');

module.exports = {
   
        name: "shop",
        noalias: [""],
        category: "economia",
        description: "Muestra la lista de elementos",
        usage: " ",
        accessableby: "everyone"
    ,
    run: async (bot, message, args) => {
        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);
let g = [1 , 2, 3, 4, null]
        if (fetched === null) {
            prefix = default_prefix
        } else {
            prefix = fetched
        }
 

     let embed = new MessageEmbed()
            .setDescription(`** TIENDA: **\n PadLock: \`500$\`\n puede usar un candado para mantener su billetera segura [${prefix}buy/${prefix}sell PadLock]\n\n LapTop: \`800$\`
 puedes usar una computadora portátil para ganar algo de dinero en línea 💰
[${prefix}buy/${prefix}sell Laptop] \n\nFishing Rod: \`1600$\` 
 puedes comprar pescado y ganar algo de dinero. 
[${prefix}buy/${prefix}sell Fishing Rod]\n\nHunting Rifle: \`2000$\`
con rifle de caza puedes atrapar algún animal y ganar dinero. [${prefix}buy/${prefix}sell Hunting Rifle]\n\nBank Note: \`2600$\`
 puede aumentar el almacenamiento de su banco de 100 a 5000. [${prefix}buy/${prefix}sell Bank Note]
 `)
            .setColor("BLUE")
        .setFooter(`Pedido por ${message.author.username}`)
        message.channel.send(embed)
      if(args[0] === "2"){
        
        }
    }
}