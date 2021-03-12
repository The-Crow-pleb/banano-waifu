require('dotenv').config(); const partial = ["USER", "REACTION", "GUILD_MEMBER", "CHANNEL"];
const {Client} = require('discord.js'); const gecko = require('coingecko-api')
const client = new Client({disableMentions: "everyone", partials: [partial]}); const cripto = new gecko()

const {registerCommands, registerEvents} = require('../src/utils/validation/registry');

(async() => {
    client.login(process.env.TOKEN); client.commands = new Map(); client.crypto = cripto
    await registerCommands(client, '../../commands');
    await registerEvents(client, '../../events');
})();