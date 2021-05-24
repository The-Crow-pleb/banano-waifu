const pages = require('discord.js-pagination'); const {MessageEmbed} = require("discord.js"); const diskSpace = require('check-disk-space'); const os = require('os')
module.exports={
    description:'', aliases:[],
    run: async(client, message, args) => {

        const {guild} = message

        try {
            message.channel.startTyping()
            const guildAmount = client.guilds.cache.size
            const peopleAmount = client.users.cache.size
            const freeDiskSpace = diskSpace('C://')
            const formatedDiskSpace = Math.round((await freeDiskSpace).free / 1024 / 1024 / 1024)
            const freeRam = os.freemem()
            const formatedFreeRam = Math.round(await freeRam / 1024 / 1024 / 1024)
            const totalRam = os.totalmem()
            const formatedTotalRam = Math.round(await totalRam / 1024 / 1024 / 1024)

            const infoEmbed = new MessageEmbed()
                .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
                .setColor("RANDOM")
                .setTitle('Bot Info:')
                .addFields(
                    {name: 'Guild Amount:', value: `\`\`\`${guildAmount} guilds!\`\`\``},
                    {name: 'User Amount:', value: `\`\`\`${peopleAmount} users!\`\`\``},
                    {name: 'Free Disk Space:', value: `\`\`\`${formatedDiskSpace} GB\`\`\``},
                    {name: 'Free RAM:', value: `\`\`\`${formatedFreeRam} GB of RAM\`\`\``},
                    {name: 'Total RAM', value: `\`\`\`${formatedTotalRam} GB of Total RAM\`\`\``}
                )
            message.reply(infoEmbed)
            return message.channel.stopTyping()
        } catch (error) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ffe135')
                .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
                .setDescription(`Oops, Something went wrong!:\n\n\`\`\`diff +Error: ${error}\`\`\``)
                .setFooter('Made by Tocka Waifu for the Banano Community.')
            message.reply(errorEmbed)
            return message.channel.stopTyping()
        }
    }
}