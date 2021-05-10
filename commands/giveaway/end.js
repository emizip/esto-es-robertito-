const { MessageEmbed } = require('discord.js')
const ms = require('ms');
module.exports = {
        name: "end",
        description: "Finaliza un giveaway",
        accessableby: "Administrator",
        category: "giveaway",
        aliases: ["giveaway-end"],
        usage: '<giveawaymessageid>',
    run: async (bot, message, args) => {
      if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: Debes tener los permisos de administración de mensajes para volver a lanzar los sorteos..');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send(':x: Tienes que especificar un ID de mensaje válido!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    bot.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    bot.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('Incapaz de encontrar un obsequio para `'+ args.join(' ') + '`.');
    }

    // Edit the giveaway
    bot.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    // Success message
    .then(() => {
        // Success message
        message.channel.send('El sorteo terminará en menos de '+(bot.giveawaysManager.options.updateCountdownEvery/1000)+' segundos...');
    })
    .catch((e) => {
        if(e.startsWith(`Sorteo con ID de mensaje ${giveaway.messageID} ya esta terminado.`)){
            message.channel.send('Este sorteo ya terminó!');
        } else {
            console.error(e);
            message.channel.send('A Ocurrido un Error...');
        }
    });
    }
}