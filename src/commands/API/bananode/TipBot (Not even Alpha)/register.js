const userSchema = require("../../../../configs/dbs/schemas/userSchema")
const {MessageEmbed} = require('discord.js')
const {default: fetch} = require('node-fetch')
const QRAcc = require("qrcode")

module.exports = {
    description: "", aliases: ["reg"],
    run: async(client, message, args) => {

        try {
            
            return message.reply('Niet, Don\'t have enough banano to continue to test the tipbot.')

            const {author: {id: UserId, username: AuthorUsername}, guild: {name: guildName}, guild} = message
            const userReg = await userSchema.findOne({_id: UserId}); message.channel.startTyping()
            
            if(!userReg) {
                let options = {method: "post",body: JSON.stringify({ "action": "account_create", "wallet": `${process.env.key}`})}
                let created = await fetch(process.env.url, options)
                let accountCreate = await created.json()

                await userSchema.findOneAndUpdate({_id: UserId}, {_id: UserId, username: AuthorUsername,  nodeRegister: true, account: accountCreate.account}, {upsert: true})
                QRAcc.toFile(`src/commands/API/bananode/TipBot (Not even Alpha)/qrs/${AuthorUsername}.png`, accountCreate.account)

                const registeredEmbed = new MessageEmbed()
                    .setAuthor(guildName, guild.iconURL({dynamic: true}))
                    .setColor('#ffe135')
                    .setDescription(`You were successfully registered, here's your address on this tipbot:\n\n\`\`\`${accountCreate.account}\`\`\``)
                    .attachFiles(await `src/commands/API/bananode/TipBot (Not even Alpha)/qrs/${AuthorUsername}.png`)
                return message.reply(registeredEmbed).then(message.channel.stopTyping())
            } else {
                const registered = await userSchema.findOne({_id: UserId})
                const alreadyReg = new MessageEmbed()
                    .setDescription(`You are already registered:\n\n\`\`\`${registered.account}\`\`\``)
                    .attachFiles(await `src/commands/API/bananode/TipBot (Not even Alpha)/qrs/${AuthorUsername}.png`)
                    .setAuthor(guildName, guild.iconURL({dynamic: true}))
                    .setColor('#ffe135')
                return message.reply(alreadyReg).then(message.channel.stopTyping())
            }
        } catch (error) {
            console.log(error)
            const errorEmbed = new MessageEmbed()
                .setColor('#ffe135')
                .setAuthor(message.author.username, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
                .setDescription(`Oops, Something went wrong!:\n\n\`\`\`diff\n +Error: ${error}\`\`\`\nIf this error continues, please, open an issue at my github page.`)
                .setFooter('Made by Tocka Waifu for the Banano Community.')
            message.reply(errorEmbed)
            message.channel.stopTyping()
        }
    }
}