const { MessageEmbed } = require('discord.js')
const ms = require('ms');
module.exports = {
  name: "reroll",
  description:
    "Reiniciar los ganadores de un sorteo",
  usage: "help <cmd>",
  category:"giveaway",
    run: async (bot, message, args) => {
       if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: Debes tener los permisos de administración de mensajes para volver a lanzar los sorteos..');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send(':x: Espicifica la ID del sorte!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    bot.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    bot.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('Incapaz de encontrar un Giveaway para `'+ args.join(' ') +'`.');
    }

    // Reroll the giveaway
    bot.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        // Success message
        message.channel.send('Giveaway rerolled!');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway con ID de mensaje ${giveaway.messageID} no ha terminado.`)){
            message.channel.send('Este sorteo no ha terminado!');
        } else {
            console.error(e);
            message.channel.send('A ocurrido un error...');
        }
    });

    }
}