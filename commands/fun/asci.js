const discord = require("discord.js");const figlet = require("figlet"); // MAKE SURE TO INSTALL FIGLET PACKAGE OR CODE WONT WORK

module.exports = {
    name: "ascii",
    aliases: [],
    category: "fun/entretenimiento",
    usage: "ascii <text>",
    description: "ASCII ART pero tu lo dices.",
    run: async (client, message, args) => {

   let text = args.join(" ");
   if(!text) {
return message.channel.send(`Proporcione texto para la conversion ascii!`)
}
   let maxlen = 20
if(text.length > 20) {
return message.channel.send(`Ingrese texto que tenga 20 caracteres o menos porque la conversión no será buena!`)
}
 // AGAIN, MAKE SURE TO INSTALL FIGLET PACKAGE!
figlet(text, function(err, data) {
message.channel.send(data, {
code: 'AsciiArt' 
});
})

    }
};