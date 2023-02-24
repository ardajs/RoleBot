// app.js

const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!giveRole')) {
    const roleName = message.content.slice(10); // remove "!giveRole " from the message content
    const role = message.guild.roles.cache.find((r) => r.name === roleName);

    if (!role) {
      return message.reply(`Couldn't find the role "${roleName}"`);
    }

    try {
      await message.member.roles.add(role);
      message.reply(`You now have the "${roleName}" role!`);
    } catch (err) {
      console.error(err);
      message.reply('Sorry, there was an error!');
    }
  }
});

client.login(token);
