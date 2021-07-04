const userSchema = require("../../../../configs/dbs/schemas/userSchema")
const {MessageEmbed} = require('discord.js')
const {default: fetch} = require('node-fetch')

module.exports = {
    description: "", aliases: [],
    run: async(client, message, args) => {
     
        try {
            
            return message.reply('Niet, Don\'t have enough banano to continue to test the tipbot.')

            const {author: {id: UserId, username: AuthorUsername}, guild: {name: guildName}, guild} = message
            const userReg = await userSchema.findOne({_id: UserId}, {_id: UserId})
            if(!userReg._id) {
                
                let options = {method: "post",body: JSON.stringify({ "action": "account_create", "wallet": `${process.env.key}`})}
                let created = await fetch(process.env.url, options)
                let accountCreate = await created.json()

                await userReg.findOneAndUpdate({_id: UserId}, {_id: UserId, username: AuthorUsername,  nodeRegister: true, account: accountCreate.account}, {upsert: true})
                QRAcc.toFile(`src/commands/API/bananode/TipBot (Not even Alpha)/qrs/${AuthorUsername}.png`, accountCreate.account)
    
                const registeredEmbed = new MessageEmbed()
                    .setAuthor(guildName, guild.iconURL({dynamic: true}))
                    .setColor('#ffe135')
                    .setDescription(`You were successfully registered, here's your address on this tipbot:\n\n\`\`\`${accountCreate.account}\`\`\``)
                    .attachFiles(await `src/commands/API/bananode/TipBot (Not even Alpha)/qrs/${AuthorUsername}.png`)
                return message.reply(registeredEmbed)
            
            } else {

                const registered = await userSchema.findOne({_id: UserId})
                const alreadyReg = new MessageEmbed()
                    .setDescription(`Deposit on this address or use the QR code sent:\n\n\`\`\`${registered.account}\`\`\``)
                    .attachFiles(await `src/commands/API/bananode/TipBot (Not even Alpha)/qrs/${AuthorUsername}.png`)
                    .setAuthor(guildName, guild.iconURL({dynamic: true}))
                    .setColor('#ffe135')
                return message.reply(alreadyReg)
                
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