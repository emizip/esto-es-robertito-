const Discord = require("discord.js");
const ownerid = "751887889272406156";///quita esa id y no la copies n se la pases a nadie o te pteo pto

module.exports = {
	name: "serverlist",
	aliases: ["slt"],
	category: "owner",
	description: "Muestra la lista de servidores.!",
	usage: "solo el creador la puede usar osea yo",//pta yupleix eres un buen owner xd 

	run: async (bot, message, args) => {
		if (message.author.id == ownerid) {
			if (!message.guild.me.hasPermission("ADMINISTRATOR"))
				return message.channel
					.send("No tengo permisos")
					.then(msg => msg.delete({ timeout: 5000 }));

			let i0 = 0;
			let i1 = 10;
			let page = 1;

			let description =
				`Total Servers - ${bot.guilds.cache.size}\n\n` +
				bot.guilds.cache
					.sort((a, b) => b.memberCount - a.memberCount)
					.map(r => r)
					.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Miembros\nID - ${r.id}`)
					.slice(0, 10)
					.join("\n\n");

			let embed = new Discord.MessageEmbed()
				.setAuthor(bot.user.tag, bot.user.displayAvatarURL({ dynamic: true }))

				.setColor("00FFFF")
				.setFooter(`Pagina - ${page}/${Math.ceil(bot.guilds.cache.size / 10)}`)
				.setDescription(description);

			let msg = await message.channel.send(embed);

			await msg.react("⬅");
			await msg.react("➡");
			await msg.react("❌");

			let collector = msg.createReactionCollector(
				(reaction, user) => user.id === message.author.id
			);

			collector.on("collect", async (reaction, user) => {
				if (reaction._emoji.name === "⬅") {
					// hola jupleix
					i0 = i0 - 10;
					i1 = i1 - 10;
					page = page - 1;

					// eres
					if (i0 + 1 < 0) {
						console.log(i0)
						return msg.delete();
					}
					if (!i0 || !i1) {
						return msg.delete();
					}

					description =
						`Total Servers - ${bot.guilds.cache.size}\n\n` +
						bot.guilds.cache
							.sort((a, b) => b.memberCount - a.memberCount)
							.map(r => r)
							.map(
								(r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Miembros\nID - ${r.id}`)
							.slice(i0, i1)
							.join("\n\n");

					// gei
					embed
						.setFooter(
							`Pagina - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`
						)
						.setDescription(description);

					// y te 
					msg.edit(embed);
				}

				if (reaction._emoji.name === "➡") {
					// gusta 
					i0 = i0 + 10;
					i1 = i1 + 10;
					page = page + 1;

					// la
					if (i1 > bot.guilds.cache.size + 10) {
						return msg.delete();
					}
					if (!i0 || !i1) {
						return msg.delete();
					}

					description =
						`Total Servers - ${bot.guilds.cache.size}\n\n` +
						bot.guilds.cache
							.sort((a, b) => b.memberCount - a.memberCount)
							.map(r => r)
							.map(
								(r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Miembros\nID - ${r.id}`)
							.slice(i0, i1)
							.join("\n\n");

					// pija
					embed
						.setFooter(
							`Pagina - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`
						)
						.setDescription(description);

					//jejeje
					msg.edit(embed);
				}

				if (reaction._emoji.name === "❌") {
					return msg.delete();
				}

				// hola jupleix te gusta la pija jeje
				await reaction.users.remove(message.author.id);
			});
		} else {
			return;
		}
	}
};