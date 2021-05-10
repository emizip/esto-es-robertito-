const { MessageEmbed } = require('discord.js')
const ms = require('ms');
module.exports = {
    name: "start",
        description: "Crea giveaway",
        accessableby: "Administrator",
        category: "giveaway",
        aliases: ["giveaway-start"],
        usage: '<canal> <duracion> <winners>, <premio>',
    run: async (bot, message, args) => {
       if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: Debes tener los permisos de administración de mensajes para comenzar con los sorteos..');
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send(':x: ¡Tienes que mencionar un canal válido!');
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: Tienes que especificar una duración válida!');
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: Tienes que especificar un número válido de ganadores.!');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(':x: Tienes que especificar un premio válido!');
    }

    // Start the giveaway
    bot.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayNumberWinners,
        // Who hosts this giveaway
        hostedBy: message.author,
        // Messages
        messages: {
            giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
            giveawayEnded: "🎉🎉 **GIVEAWAY Terminado** 🎉🎉",
            timeRemaining: "Tiempo restante: **{duration}**!",
            inviteToParticipate: "Reaccionar con 🎉 para participar!",
            winMessage: "Felicidades, {winners}! Ganaste **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelado, no participaciones válidas.",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Terminó a las",
            units: {
                seconds: "segundos",
                minutes: "minutos",
                hours: "horas",
                days: "dias",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`Giveaway inició en ${giveawayChannel}!`);

    }
}