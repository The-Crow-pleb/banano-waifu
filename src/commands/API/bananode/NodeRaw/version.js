const { MessageEmbed } = require('discord.js')
const { default: fetch } = require('node-fetch')
module.exports = {
    description: '', aliases: [],
    run: async(client, message, args) => {

        try {

            const {guild} = message; message.channel.startTyping()
            let options = {method: "post",body: JSON.stringify({ "action": "version" })}
            let fetched = await fetch(process.env.url, options)
            let jsonForm = await fetched.json()

            const versionEmbed = new MessageEmbed()
                .setColor('#ffe135')
                .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
                .setTitle('Node Version:')
                .setDescription(`\`\`\`json\n${JSON.stringify(jsonForm, null, '\t')}\`\`\``)
                .setFooter('Made by Tocka Waifu for the Banano Community.')
            message.reply(versionEmbed)
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
