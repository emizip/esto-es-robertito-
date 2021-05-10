const { default_prefix } = require('../config');
module.exports = async bot => {
    console.log(`${bot.user.username} tamo activo pa!`)
    let totalUsers = bot.guilds.cache.reduce((acc, value) => acc + value.memberCount, 0)
    var activities = [ `${bot.guilds.cache.size} servers`, `${totalUsers} users!` ], i = 0;
    setInterval(() => bot.user.setActivity(`${default_prefix}help | ${activities[i++ % activities.length]}`, { type: "PLAYING" }),50000)
    
};