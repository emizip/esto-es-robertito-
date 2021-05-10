const fetch = require('node-fetch');

const url = require('url');

module.exports = {
  
name: "screenshot",
  
description: "Get screenshot of the Website the given Website's Homepage.",
  
usage: "screenshot <sitelink>",

category: "utility",

aliases: ["ss"],
  
run: async (client, message, args) => {
  
   const urls = args[0];
  
        const site = /^(https?:\/\/)/i.test(urls) ? urls : `http://${urls}`;
  
        try {
            const { body } = await fetch(`https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`);
          
            return message.channel.send(`Here is a screenshot from requested URL`, { files: [{ attachment: body, name: 'screenshot.png' }] } );
          
        } catch (err) {
          
            if (err.status === 404) return message.channel.send('Could not find any results. Invalid URL?');
          
            return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
    }
}