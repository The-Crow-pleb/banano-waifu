const { MessageEmbed } = require('discord.js')
const { default: fetch } = require('node-fetch')
module.exports = {
    description: '', aliases: ['ban-acc', 'bananoacc'],
    run: async(client, message, args) => {
        const banAcc = args[0]
        if(!banAcc || !banAcc.match('^ban_[13][1-9a-z]{59}$')) return message.reply("Invalid hash")
        const {guild} = message
        let options = {
            method: "post",
            body: JSON.stringify({ "action": "account_info", "account":`${banAcc}` })
        }
        message.channel.startTyping()
        let fetched = await fetch(process.env.url, options)
        let jsonForm = await fetched.json()
        if(fetched.statusText === 'OK') {
            const accEmbed = new MessageEmbed()
                .setColor('#ffe135')
                .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
                .setTitle('Account Info:')
                .setDescription(`\`\`\`json\n-${jsonForm}\`\`\``)
                .setFooter('Made by Tocka Waifu for the Banano Community.')
            message.reply(accEmbed)
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