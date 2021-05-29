const { MessageEmbed } = require('discord.js')
const { default: fetch } = require('node-fetch')
module.exports = {
    description: '', aliases: ['ac', 'accinfo'],
    run: async(client, message, args) => {

        try {

            const account = args[0];const {guild} = message; message.channel.startTyping()
            if(!account || !account.match('^ban_[13][13456789abcdefghijkmnopqrstuwxyz]{59}$')) return message.reply("Invalid hash")
            let options = {method: "post",body: JSON.stringify({ "action": "account_info", "account": `${account}` })}
            let fetched = await fetch(process.env.url, options)
            let jsonForm = await fetched.json()

            const account_embed = new MessageEmbed()
                .setColor('#ffe135')
                .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
                .setTitle('Account Info:')
                .setDescription(`\`\`\`json\n${JSON.stringify(jsonForm, null, '\t')}\`\`\``)
                .setFooter('Made by Tocka Waifu for the Banano Community.')
            message.reply(account_embed)
            message.channel.stopTyping() 
            
        } catch (error) {
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
