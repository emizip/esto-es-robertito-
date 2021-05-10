const db = require("quick.db")

module.exports = {
    name: "status",
    description: "Cambia el status del bot",
    usage: "status <PLAYING || WATCHING> <status>",
    category: "owner",
    ownerOnly: true,
    run: (client, message, args) => {
		let developers = [/*WOG*/"751887889272406156", /*goonzaalo*/"555549010211897373"]
  
if(developers.includes(message.author.id) == false) return message.channel.send(new Discord.MessageEmbed()
                                              .setDescription("<a:escudo_no:760939447310614592> | ¡No tienes permisos para hacer esto!")
                                              .setColor("RED"))
        if(!args.length) {
      return message.channel.send("Por Favor estableca un tipo de status ejemplo PLAYING || WATCHING.") }
        let stype = args[0]
        if(!args[1]) return message.channel.send("Por Favor proporcione un mensage para el status ejemplo `y!status PLAYING || WATCHING <status>`.")
        let status = args.join(' ').split(' ').slice(1).join(' ')
        db.set(`status`, status)
        client.user.setActivity(status, {type: stype})        
    }
}