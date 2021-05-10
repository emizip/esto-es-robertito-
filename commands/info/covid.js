const Discord = require('discord.js')

module.exports = {
    name: "emojiinfo",
    async run(client, message, args) {
        let emojiName = args.join(" ");
        let emoji = message.guild.emojis.cache.get(args[0]) || message.guild.emojis.cache.find(emoji => emoji.name === `${emojiName}`) 
        if (!args[0]) return message.channel.send("Please provide an emoji name or id!")
        if (!emoji) return message.channel.send("Please provide a **valid** emoji name or id!")
        let xd;
        if(emoji.animated) xd = "Yes"
        if(!emoji.animated) xd = 'No'
        let embed = new Discord.MessageEmbed()

            .addField("Name", `${emoji.name}`)
            .addField("Emoji id", `${emoji.id}`)
            .addField("Outlook", `${emoji}`)
            .addField("Created at", `${emoji.createdAt.toDateString()}`)
            .addField("Guild", message.guild.name)
            .addField("Animated?", xd)
            .setThumbnail(emoji.url)
            .setColor("00FFFF")
            .addField("Format", `\`${emoji}\``)
            .addField("URL", `[Click Here](${emoji.url})`)

        message.channel.send(embed)
    }
    
}