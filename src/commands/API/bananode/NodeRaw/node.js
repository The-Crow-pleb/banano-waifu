const { MessageEmbed } = require('discord.js'); const lang = require('../../../../utils/languages/languages')
const { default: fetch } = require('node-fetch')
module.exports = {
    description: '', aliases: [],
    run: async(client, message, args) => {

        try {

            const {guild} = message; message.channel.startTyping()
            let options = {method: "post",body: JSON.stringify({ "action": "block_count" })}
            let fetched = await fetch(process.env.url, options)
            if(fetched.statusText === 'OK') {
                const peersEmbed = new MessageEmbed()
                    .setColor('#ffe135')
                    .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
                    .setDescription(`${lang(guild, "nodecheck")}\n${lang(guild, "nodecurl")}`)
                message.reply(peersEmbed).then(message.channel.stopTyping())
            }

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