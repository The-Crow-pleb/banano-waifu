const { MessageEmbed } = require('discord.js')
const { default: fetch } = require('node-fetch')
module.exports = {
    description: '', aliases: ['txid', 'blockinfo'],
    run: async(client, message, args) => {

        try {

            const txid = args[0]; const {guild} = message; message.channel.startTyping()
            if(!txid || !txid.match('^[a-fA-F0-9]{64}$')) return message.reply("Invalid hash")
            let options = {method: "post",body: JSON.stringify({ "action": "block_info", "json_block": "true", "hash": `${txid}` })}
            let fetched = await fetch(process.env.url, options)
            let jsonForm = await fetched.json()

            const txEmbed = new MessageEmbed()
                .setColor('#ffe135')
                .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
                .setTitle('Tx Block Returned:')
                .setDescription(`\`\`\`json\n${JSON.stringify(jsonForm, null, '\t')}\`\`\``)
                .setFooter('Made by Tocka Waifu for the Banano Community.')
            message.reply(txEmbed)
            message.channel.stopTyping()
        } catch (error) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ffe135')
                .setAuthor(message.author.username, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
                .setDescription(`Oops, Something went wrong!:\n\n\`\`\`diff\n +Error: ${error}\`\`\``)
                .setFooter('Made by Tocka Waifu for the Banano Community.')
            message.reply(errorEmbed)
            message.channel.stopTyping()
        }   
    }
}
