module.exports = {
  name: "bug",
category: "info",
run : async(client, message, args) => { 
// again make this fit your command handler style 😀
  if (!args[0]) return message.reply("Especifique el error. Ejemplo:\n`/ punch no funciona. No menciona al usuario al que intento marcar.`");   
  if (args[0] === "bug") return message.reply("Especifique el error. Ejemplo:\n`/ punch no funciona. No menciona al usuario al que intento marcar.`");   
  args = args.join(" ");   
  message.reply("Gracias por enviar un error!");  
  const content = `\`\`\`**${message.author.username}#${message.author.discriminator}** (${message.author.id}) reported:\n~~--------------------------------~~\n${args}\n~~--------------------------------~~\nOn the server: **${message.guild.name}**\nServer ID: **${message.guild.id}**\`\`\``;   
  client.channels.cache.get('751887889272406156').send(content)
}
}