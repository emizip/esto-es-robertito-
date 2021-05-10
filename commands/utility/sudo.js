module.exports = {
  name: "sudo",
  description: "Crea implesionantes Webhooks con nombres de usuarios",
  usage: "sudo <user> <mensaje>",
  category: "utility",
  args: true,
  cooldown: 5,
  botpermission: ["MANAGE_WEBHOOKS"],
  run: async (client, message, args) => {
    message.delete();
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("Por favor mencione un usuario!");
    const webhook = await message.channel.createWebhook(user.displayName, {
      avatar: user.user.displayAvatarURL(),
      channel: message.channel.id
    });
    await webhook.send(args.slice(1).join(" ")).then(() => {
      webhook.delete();
    });
  }
};