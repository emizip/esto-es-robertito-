const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const Color = `00FFFF`;
const ownerid = "751887889272406156";
const moment = require('moment');

module.exports = {
    name: "botserverinfo",
    category: "owner",
    description: "ve la informacion de los servers del BOT!",
    usage: "Botserverinfo <ID>",
    run: async (client, message, args) => {

        //Start
        if (message.author.id === ownerid) {
        if (!args[0] || isNaN(args[0])) return message.channel.send(`Por Favor indique una ID valida!`);

        let g;

        try {

        g = await client.guilds.cache.get(args[0]);

        } catch (error) {
          return message.channel.send(`ID invalida!`);
        };
        let Name = g.name
        
        let ID = g.id
        
        let Mem = g.memberCount;

        let Human = g.members.cache.filter(m => !m.user.bot).size || "0";

        let Bots = g.members.cache.filter(m => m.user.bot).size || "0";

        let Owner = g.owner.user.tag;
        
    let OwnerID = g.owner.user.id;
      

        let Roles = g.roles.cache.size;
        
        let Channels = g.channels.cache.filter(c => c.type !== "category").size || "0";
        
        let Text = g.channels.cache.filter(channel => channel.type === "text").size;
        
        let Voice = g.channels.cache.filter(channel => channel.type === "voice").size;
        
        let Category = g.channels.cache.filter(channel => channel.type === "category").size
            
        let BoostCount = g.premiumSubscriptionCount
          if (!BoostCount) BoostCount = "0";
        
        let Created = g.createdAt.toDateString();

        let Embed = new MessageEmbed()
        .setColor(Color)
        .setThumbnail(g.iconURL({ dynamic: true }))
        .setAuthor(`SERVER INFORMACION`)
        .addField(`**SERVER NAME**`, `\`\`\`${Name}\`\`\``, true)
        .addField(`**SERVER ID**`, `\`\`\`${ID}\`\`\``, true)
        .addField(`**SERVER OWNER**`, `\`\`\`${Owner}\n(${OwnerID})\`\`\``, true)
        .addField(`**CREADO**`, `\`\`\`${Created}\`\`\``, true)
        .addField(`**CANALES**`, `\`\`\`${Channels} (#${Text}, 🔊${Voice})\`\`\``, true)
        .addField(`**CATEGORIAS**`,`\`\`\`${Category}\`\`\``, true)
        .addField(`MIEMBROS`,`\`\`\`${Mem} (${Human} Usuarios y ${Bots} Bots)\`\`\``, true)
        .addField(`**ROLES**`, `\`\`\`${Roles}\`\`\``, true)
        .addField(`**BOOST**`, `\`\`\`${BoostCount}\`\`\``, true)
        .setTimestamp();

        return message.channel.send(Embed);

        //End

    }
    }
};