const discord_akairo_1 = require("discord-akairo");
const Discord = require('discord.js')

module.exports = {
    name: 'hack',
	aliases: [],
    category: 'fun/entretenimiento',
	description: 'y si hackeamos a AMLO',
    
run: async (client, message, args) => {
    
       
       const user = await message.mentions.users.first()
        if(!user) return message.channel.send("Woaaah más lento, ¿a quién estamos pirateando? Debe ser un miembro, no un rol.")
        

        message.channel.send(`Hackeo ${user} comenzado...`)
        .then((msg) => {
            setTimeout(function() {
            msg.edit(`[▝]Encontrar la dirección IP`);
          }, 1500)
            setTimeout(function() {
            msg.edit(`[▗] **IP DIRECCION** : 127.0.0.1:2643`);
          }, 3000)
          setTimeout(function() {
            msg.edit(`[▖] Vendiendo datos al gobierno...`);
          }, 4500)
          setTimeout(function() {
            msg.edit(`[▘] Reporte de cuenta a la discord por romper TOS...`);
          }, 6000)
          setTimeout(function() {
            msg.edit(`[▝] Encontrar la dirección de correo electrónico...`);
          }, 7500)
          setTimeout(function() {
            msg.edit(`[▗] **Email DIRECCION** : ${user.username}@gmail.com`);
          }, 9000)
          setTimeout(function() {
            msg.edit(`[▖] Hackear la cuenta de Epic Games...`);
          },  10500)
          setTimeout(function() {
            msg.edit(`[▘] Hackear registros médicos...`);
          },  12000)
         setTimeout(function() {
            msg.edit(`Hackeo terminado @${user.username}`);
         }, 13500)
         setTimeout(function() {
            message.channel.send('El truco * totalmente * `real` y` peligroso` está completo')
         }, 15000)
         });


    }
}