require('dotenv').config();

const fs = require("fs");

const { MessageEmbed } = require("discord.js");

const {  default_prefix } = require("./config.json")

const db = require("quick.db")

const Color = `00FFFF`;

const discord = require("discord.js");

const keep_alive = require('./keep_alive.js');

const canvas = require("discord-canvas");

const { addexp } = require("./handlers/xp.js")

const client = new discord.Client({
    ws: {
        properties: {
            $browser: "Discord Android"
        }
    }
});

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.queue = new Map();
client.vote = new Map();

["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

//Snipe
client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author.tag,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  
})
 
 //
client.on("message", async message => {
if(!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`)
  if(prefix === null) prefix = default_prefix;
  
  if(!message.content.startsWith(prefix)) return;
 
})

//Delete Logs
client.on("messageDelete", async message => {
  let Channel = await db.fetch(`Logging_${message.guild.id}`);
  if (Channel === null) return;

  let Embed = new MessageEmbed()
    .setColor(Color)
    .setAuthor(`${message.author.tag}`, message.author.avatarURL({dynamic: true}))
    .setDescription(`Message from <@${message.author.id}> deleted in <#${message.channel.id}>\n> ${message.content}`)
    .setFooter(`ID: ${message.author.id}`)
    .setTimestamp();

  return client.channels.cache.get(Channel).send(Embed);
});

//Update Logs
client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (oldMessage.content.toLowerCase() === newMessage.content.toLowerCase())
    return;

  let Channel = await db.fetch(`Logging_${oldMessage.guild.id}`);
  if (Channel === null) return;

  let Embed = new MessageEmbed()
    .setColor(Color)
    .setAuthor(`${oldMessage.author.tag}`, oldMessage.author.avatarURL({dynamic: true}))
    .setDescription(`Message edited in <#${oldMessage.channel.id}> [Jump to Message\](https://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id}\)`)
    .addField(`Before`, `${oldMessage.content}`, true)
    .addField(`After`, `${newMessage.content}`, true)
    .setFooter(`ID: ${oldMessage.author.id}`)
    .setTimestamp();

  return client.channels.cache.get(Channel).send(Embed);
});

//Channel Delete Logs 
client.on("channelDelete", async channel => {
  if (
    channel.type === "category" ||
    channel.type === "dm" ||
    channel.type === "unknown"
  )
    return;

  let Channel = await db.fetch(`Logging_${channel.guild.id}`);
  if (Channel === null) return;

  let Typed;
  if (channel.type === "text") {
    Typed = "Text";
  } else if (channel.type === "voice") {
    Typed = "Voice";
  } else if (channel.type === "news") {
    Typed = `News`;
  } else {
    Typed = `Store`;
  }

  let Nsfw;
  let Limit;

  if (channel.type !== "voice") {
    Nsfw = channel.nsfw ? "Yes" : "No";
  } else {
    Limit = channel.userLimit > 0 ? channel.userLimit : "Unlimited";
  }

  let Pos;
  if (channel.position === "-1") {
    Pos = `Last`;
  } else {
    Pos = channel.position + 1;
  }

  let Embed = new MessageEmbed()
    .setColor(Color)
    .setTitle(`Channel Deleted!`)
    .setDescription(`A Channel Is Deleted!`)
    .addField(`Name`, channel.name, true)
    .addField(`Type`, Typed, true)
    .addField(`ID`, channel.id, true)
    .addField(`Category`, channel.parent, true)
    .addField(`Position`, Pos, true)
    .addField(
      `${channel.type !== "voice" ? "Nsfw" : "Users Limit"}`,
      `${channel.type !== "voice" ? Nsfw : Limit}`
    )
    .addField(
      `${channel.type !== "voice" ? "Topic" : "Created Date"}`,
      `${
        channel.type !== "voice"
          ? channel.topic || "No Topic!"
          : channel.createdAt.toDateString()
      }`
    )
    .setTimestamp();

  return client.channels.cache.get(Channel).send(Embed);
});

//Channel Create Logs
client.on("channelCreate", async channel => {
  if (
    channel.type === "category" ||
    channel.type === "dm" ||
    channel.type === "unknown"
  )
    return;

  let Channel = await db.fetch(`Logging_${channel.guild.id}`);
  if (Channel === null) return;

  let Typed;
  if (channel.type === "text") {
    Typed = "Text";
  } else if (channel.type === "voice") {
    Typed = "Voice";
  } else if (channel.type === "news") {
    Typed = `News`;
  } else {
    Typed = `Store`;
  }

  let Nsfw;
  let Limit;

  if (channel.type !== "voice") {
    Nsfw = channel.nsfw ? "Yes" : "No";
  } else {
    Limit = channel.userLimit > 0 ? channel.userLimit : "Unlimited";
  }

  let Pos;
  if (channel.position === "-1") {
    Pos = `Last`;
  } else {
    Pos = channel.position + 1;
  }

  let Embed = new MessageEmbed()
    .setColor(Color)
    .setTitle(`Channel Created!`)
    .setDescription(`A Channel Is Created!`)
    .addField(`Name`, channel.name, true)
    .addField(`Type`, Typed, true)
    .addField(`ID`, channel.id, true)
    .addField(`Category`, channel.parent, true)
    .addField(`Position`, Pos, true)
    .addField(
      `${channel.type !== "voice" ? "Nsfw" : "Users Limit"}`,
      `${channel.type !== "voice" ? Nsfw : Limit}`
    )
    .addField(
      `${channel.type !== "voice" ? "Topic" : "Created Date"}`,
      `${
        channel.type !== "voice"
          ? channel.topic || "No Topic!"
          : channel.createdAt.toDateString()
      }`
    )
    .setTimestamp();

  return client.channels.cache.get(Channel).send(Embed);
});

//AFK 
client.on('message', async message => {
  if (message.author.bot || message.channel.type === "dm") return; // Ignore if the user is a bot.
   
  let afk = new db.table("MizukiAfk"),
      authorStatus = await afk.fetch(`${message.author.id}_${message.guild.id}`),
      mentioned = message.mentions.members.first();
  
  if (mentioned) {
    let status = await afk.fetch(`${mentioned.id}_${message.guild.id}`);
    
    if (status) {
      const embed = new MessageEmbed()
      .setColor("00FFFF")
      .setDescription(`This user (${mentioned.user.tag}) is AFK: **${status}**`)
      message.channel.send(embed).then(i => i.delete({timeout: 5000}));
    }
  }
    
    if (authorStatus) {
    const embed = new MessageEmbed()
    .setColor("00FFFF")
    .setDescription(`Welcome back! **${message.author.tag}**.`)
    message.channel.send(embed).then(i => i.delete({timeout: 5000}));
    afk.delete(`${message.author.id}_${message.guild.id}`)
        message.member.setNickname(message.member.user.username)
  }
})

//join logs
client.on("guildCreate", guild => {

  const { MessageEmbed } = require("discord.js");

  const ID = "790199712321634324";

  const channel = client.channels.cache.get(ID);

  const sowner = guild.owner.user;

  if (!channel) return;

  const embed = new MessageEmbed()

    .setTitle("**I Joined a Server!**")

    .addField(`**SERVER NAME**`, `\`\`\`${guild.name}\`\`\``)

    .addField(`**SERVER ID**`, `\`\`\`${guild.id}\`\`\``)

    .addField(`**SERVER OWNER**`, `\`\`\`${sowner.tag}\`\`\``)

    .addField(`**OWNER ID**`, `\`\`\`${sowner.id}\`\`\``)
 
    .addField(`**CREATED ON**`, `\`\`\`${guild.createdAt}\`\`\``)
  
    .addField(`**MEMBERS**`, `\`\`\`${guild.memberCount}\`\`\``)
  
    .setTimestamp()

    .setColor("32CD32")

    .setFooter(`Servers Count - ${client.guilds.cache.size}`);

  channel.send(embed);

});

// logs


//LEVEL
client.on("message", async message => {
if(message.author.bot) return;
  if(!message.guild) return;
  
return addexp(message)
})