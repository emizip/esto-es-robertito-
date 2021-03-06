const Discord = require("discord.js");
const bot = new Discord.Client();
module.exports = {
  name: "purge",
  category: "mod",
  aliases: ['clear', 'delete', 'purge'],

  async run(bot, message, args) {
// UPDATE ^ ACCORDING TO YOUR HANDLER
let prefix = "q"
 try { 
 
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No tienes **MANAGE_MESSAGES** permisos para usar este comando.");
  if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("No tengo **MANAGE_MESSAGES** permisos para usar este comando.");

const commands = [
`bots\` - Eliminar mensajes enviados por bots. (Ignore humans)`, 
`humans\` - Eliminar mensajes enviados por humanos. (Ignore bots)`, 
`embeds\` - Eliminar mensajes que contienen incrustaciones enriquecidas.`, 
`files\` - Eliminar mensajes que contienen archivos / imágenes / adjuntos.`, 
`mentions\` - Eliminar mensajes que contienen menciones de miembros / usuarios / canales / roles.`, 
`pins\` - Eliminar mensajes que están fijados.`, 
`text\` - Eliminar mensajes que solo contienen texto. (Ignores files/images/attachments, embeds)`, 
`match\` <text> - Eliminar mensajes que contienen texto.` , 
`not\` <text> - Eliminar mensajes que no contienen texto.`, 
`startswith\` <text> - Eliminar mensajes comienza con texto.`, 
`endswith\` <text> - Eliminar mensajes termina con texto.`
]

const embd = new Discord.MessageEmbed() 
.setColor("BLUE") 
.setTitle("Purge | Clear | Delete | Prune") 
.setDescription(`Eliminar varios mensajes de un canal. (Ignores the pinned messages and limit is 100)`) 
.addField("Usage", `\`${prefix}purge <amount>\` - Eliminar varios mensajes.\n\`${prefix}purge <amount> --${commands.join(`\n\`${prefix}purge <amount> --`)}`) 
.setFooter(`${prefix}purge, ${prefix}clear, ${prefix}delete, ${prefix}prune`) 




if(!args[0] || !args.length) return message.channel.send(embd);
let amount = Number(args[0],10) || parseInt(args[0]);
if(isNaN(amount) || !Number.isInteger(amount)) return message.channel.send("Ingrese una cantidad de mensajes para depurar.");
if(!amount || amount < 2 || amount > 100) return message.channel.send("Ingrese un número de mensaje entre 2 y 100.")
if(!args[1]) {

try {
  await message.delete()
await message.channel.bulkDelete(amount).then(async (m) => { 
  
   let embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:4000})); 
})

   } catch (e) { 
     console.log(e) 
     message.channel.send(`Solo puede eliminar los mensajes que no tengan más de 14 días.`)
     

   }

} else if(args[1]) {
  let msg;
  let data;
  let embed;
  switch(args[1]) {
    case "--bots":
     msg = await message.channel.messages.fetch({limit: amount})
    data = []
    msg.map(m => m).forEach(ms => {
      if(ms.author.bot && !ms.pinned) data.push(ms)
    })
   
   try {
     await message.delete()
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
      embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Solo puede eliminar los mensajes que no tengan más de 14 días.`) 
   }

      break;
     case "--humans":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
      if(!ms.author.bot && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
      embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`.`) 
   }

      break;
case "--embeds":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
      if(ms.embeds.length && !ms.pinned) data.push(ms)
    })
    
   try {
     
      await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Solo puede eliminar los mensajes que no tengan más de 14 días.`) 
   }

      break;
case "--files":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
      if(ms.attachments.first() && !ms.pinned) data.push(ms)
    })
    
   try {
  
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Solo puede eliminar los mensajes que no tengan más de 14 días.`) 
   }

      break;case "--text":
    msg = await message.channel.messages.fetch({limit: amount})
    data = []
    msg.map(m => m).forEach(ms => {
      if(!ms.attachments.first() && !ms.embeds.length && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Solo puede eliminar los mensajes que no tengan más de 14 días.`) 
   }

      break;
  case "--mentions":
     msg = await message.channel.messages.fetch({limit: amount})
  data = []
    msg.map(m => m).forEach(ms => {
      if((ms.mentions.users.first() || ms.mentions.members.first() || ms.mentions.channels.first() || ms.mentions.roles.first())&& !ms.pinned) data.push(ms)
    })
    
   try {
 
       await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Solo puede eliminar los mensajes que no tengan más de 14 días.`) 
   }

      break;
case "--pins":
    msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
      if(ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
      embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Solo puede eliminar los mensajes que no tengan más de 14 días.`) 
   }

      break;
case "--match":
     msg = await message.channel.messages.fetch({limit: amount})
    data = []
    msg.map(m => m).forEach(ms => {
if(!args[2]) return message.channel.send(embd);
      if(ms.content.includes(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
    })
    
   try {
    
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Solo puede eliminar los mensajes que no tengan más de 14 días.`) 
   }

      break;
case "--not":
    msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
if(!args[2]) return message.channel.send(embd);
      if(!ms.content.includes(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Solo puede eliminar los mensajes que no tengan más de 14 días.`) 
   }

      break;
case "--startswith":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
if(!args[2]) return message.channel.send(embd);
      if(ms.content.startsWith(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Solo puede eliminar los mensajes que no tengan más de 14 días.`) 
   }

      break;
case "--endswith":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
if(!args[2]) return message.channel.send(embd);
      if(ms.content.endsWith(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('0x#00ffff')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`Solo puede eliminar los mensajes que no tengan más de 14 días.`) 
   }

      break;
default:
return message.channel.send(embd) 
break;
}

} else {
 return message.channel.send(`An error occoured.`)
}
} catch (error) {
  console.log(error)
  message.channel.send(`An error occurred: \`${error}\``)
}


}
}


