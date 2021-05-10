module.exports = {
  name: "slowmode",
  category: "mod",
  description: "POn lento un canal de texto.",
  args: true,
  usage: "<time>",
  run: (client, message, args) => {
    const amount = parseInt(args[0]);
    if (message.member.hasPermission("MANAGE_CHANNEL"))
      if (isNaN(amount))
        return message.channel.send("<a:crossWrong:No parece ser un número válido");
    if (args[0] === amount + "s") {
      message.channel.setRateLimitPerUser(amount);
      if (amount > 1) {
        message.channel.send("el modo lento es ahora " + amount + " segundos");
        return;
      } else {
        message.channel.send("el modo lento es ahora " + amount + " segundo");
        return;
      }
    }
    if (args[0] === amount + "min") {
      message.channel.setRateLimitPerUser(amount * 60);
      if (amount > 1) {
        message.channel.send("el modo lento es ahora " + amount + " minutos");
        return;
      } else {
        message.channel.send("el modo lento es ahora " + amount + " minuto");

        return;
      }
    }
    if (args[0] === amount + "h") {
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) {
        message.channel.send("el modo lento es ahora " + amount + " horas");
        return;
      } else {
        message.channel.send("el modo lento es ahora " + amount + " hora");
        return;
      }
    } else {
      message.channel.send(
        "Solo puede configurar segundos (s), minutos (min) y horas (h)"
      );
    }
  }
};
