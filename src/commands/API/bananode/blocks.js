const { MessageEmbed } = require('discord.js')
const { default: fetch } = require('node-fetch')
module.exports = {
    description: '', aliases: [],
    run: async(client, message, args) => {

        const {guild} = message
        let options = { method: "post", body: JSON.stringify({ "action": "block_count" }) }
        message.channel.startTyping()
        let fetched = await fetch(process.env.url, options)
        let jsonForm = await fetched.json()
        let diff = await fetch('https://api-beta.banano.cc:443', options)
        let diffJson = await diff.json()

        if(fetched.statusText === 'OK') {
            const peersEmbed = new MessageEmbed()
                .setColor('#ffe135')
                .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
                .setDescription(`Block Count:\n\`\`\`diff\n-Count: ${parseFloat(jsonForm.count).toLocaleString('en-US')}\n+Unchecked: ${parseFloat(jsonForm.unchecked).toLocaleString('en-US')}\n-Cemented: ${parseFloat(jsonForm.cemented).toLocaleString('en-US')}\`\`\``)
                .setFooter('Made by Tocka Waifu for the Banano Community.')
            if(jsonForm.unchecked < diffJson.count) {
                const count = diffJson.count - jsonForm.unchecked
                const form = `**Block Count:**\`\`\`diff\n-Count: ${parseFloat(jsonForm.count).toLocaleString('en-US')}\n+Unchecked: ${parseFloat(jsonForm.unchecked).toLocaleString('en-US')}\n-Cemented: ${parseFloat(jsonForm.cemented).toLocaleString('en-US')}\`\`\`\n**Amount of Unchecked Blocks till Full Sync:**\n\`\`\`diff\n-Count: ${parseFloat(count).toLocaleString('en-US')}\`\`\``
                peersEmbed.setDescription(form)
                return message.reply(peersEmbed).then(message.channel.stopTyping())
            } else {
                message.reply(peersEmbed).then(message.channel.stopTyping())
            }
        } else {
            const errorEmbed = new MessageEmbed()
                .setColor('#ffe135')
                .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
                .setDescription(`Oops, Something went wrong!:\n\n\`\`\`diff\n +Error: ${error}\`\`\``)
                .setFooter('Made by Tocka Waifu for the Banano Community.')
            message.reply(errorEmbed)
            message.channel.stopTyping()
        }
    }
}

