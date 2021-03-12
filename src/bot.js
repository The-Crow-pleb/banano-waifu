require('dotenv').config(); const partial = ["USER", "REACTION", "GUILD_MEMBER", "CHANNEL"];
const {Client} = require('discord.js');
const client = new Client({disableMentions: "everyone", partials: [partial]});

const {registerCommands, registerEvents} = require('../src/utils/validation/registry');

(async() => {
    client.login(process.env.TOKEN); client.commands = new Map();
    await registerCommands(client, '../../commands');
    await registerEvents(client, '../../events');
})();