const { MessageEmbed } = require('discord.js')
const ms = require('ms')
module.exports = {
    aliases: [],
    description: '',
    run: async(client, message, args) => {

        const {guild} = message

        const uptime = client.uptime
        const uptimeFormat = ms(uptime, {long: true})
        
        message.reply('🏓 Pinging . . .').then(async(msg) => {
            const pingUptime = new MessageEmbed()
                .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
                .setColor("#ffdf00")
                .addFields(
                    {name: 'Ping', value: `\`\`\`Server ping: ${msg.createdTimestamp - message.createdTimestamp}ms\nDiscord API Ping: ${Math.round(client.ws.ping)}ms\`\`\``},
                    {name: 'Uptime', value: `\`\`\`I've been online for: ${uptimeFormat}!\`\`\``}
                )
            let del = msg.delete({timeout: ms('4s')})
            await del; message.reply(pingUptime)
        })
    }
}