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

                let amount = args[1]
                if(isNaN(amount)) {
                    return message.reply(`${amount} is not a number!`)
                } else if(amount < 1) {
                    return message.reply('Please, use whole numbers, not decimals or something that is lesser than 1')
                } else if(amount.includes('.' || ',')) {
                    return message.reply('Please, use whole numbers, not decimals.\nSince I\'m this bot has only a single dev, I am able to only use whole numbers, not decimals.')
                } else {
                    amount = `${amount}00000000000000000000000000000`
                }

                const registered = await userSchema.findOne({_id: UserId})
                
                let options = {method: "post",body: JSON.stringify({ "action": "send", "wallet": `${process.env.key}`, "source": `${registered.account}`, "destination": args[0], "amount": `${amount}`})}
                let fetched = await fetch(process.env.url, options)
                let send = await fetched.json()
                
                const sentEmbed = new MessageEmbed()
                    .setAuthor(guildName, guild.iconURL({dynamic: true}))
                    .setColor('#ffe135')
                    .setDescription(`You have sucessfully sent \`${amount}\` to ${args[0]}\n\n[This](https://creeper.banano.cc/explorer/block/${send.block}) is the transaction block.`)
                return message.reply(sentEmbed)

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