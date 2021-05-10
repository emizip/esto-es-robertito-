const { hangman } = require('reconlx')

module.exports = {
    name : 'ahorcado',
	aliases: ["ahorcarucas"],
	category: 'fun/entretenimiento',
	description: 'Que te parece si jugamos ahorcado pero sin rucas',
	
    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Necesitas el permiso MANAGE_MESSAGES.')
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.channel.send('Por Favor indique un canal')
        const word = args.slice(1).join(" ")
        if(!word) return  message.channel.send('Por Favor especifique una palabra.')

        const hang = new hangman({
            message: message,
            word: word,
            client: client,
            channelID: channel.id,
        })

        hang.start();
    }
}