const { MessageEmbed } = require('discord.js')
const { default: fetch } = require('node-fetch')
module.exports = {
    description: '', aliases: ['txid', 'blockinfo'],
    run: async(client, message, args) => {

        const txid = args[0]
        if(!txid || !txid.match('^[a-fA-F0-9]{64}$')) return message.reply("Invalid hash")
        const {guild} = message
        let options = {
            method: "post",
            body: JSON.stringify({ "action": "block_info", "json_block": "true", "hash": `${txid}` })
        }
        message.channel.startTyping()
        let fetched = await fetch(process.env.url, options)
        let jsonForm = await fetched.json()
        if(fetched.statusText === 'OK') {
            const peersEmbed = new MessageEmbed()
                .setColor('#ffe135')
                .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
                .setTitle('Tx Block Returned:')
                .setDescription(`\`\`\`json\n-${jsonForm}\`\`\``)
                .setFooter('Made by Tocka Waifu for the Banano Community.')
            message.reply(peersEmbed)
            message.channel.stopTyping()
        } else {
            const errorEmbed = new MessageEmbed()
                .setColor('#ffe135')
                .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
                .setDescription(`Oops, Something went wrong!:\n\n\`\`\`diff +Error: ${error}\`\`\``)
                .setFooter('Made by Tocka Waifu for the Banano Community.')
            message.reply(errorEmbed)
            message.channel.stopTyping()
        }
    }
}
