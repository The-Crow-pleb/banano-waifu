const { MessageEmbed } = require("discord.js")
const lang = require('../../utils/languages/languages')
module.exports = {
    aliases: [],
    description: 'CryptoHelp',
    run: async(client, message, args) => {
        try {
            const {guild} = message
            if(args.length > 3) return message.reply(`${lang(guild, "maxArgsExc")} 3`)
            
            const crypto = client.crypto
            let currency = args[1]; let coin = args[0]
    
            if(!currency) {
                const noCurrency = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setTitle(lang(guild, "crypt_curr"))
                    .setColor('#ff0000')
                return message.reply(noCurrency)
            } else if (!coin) {
                const noCurrency = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setTitle(lang(guild, "crypt_curr"))
                    .setColor('#ff0000')
                return message.reply(noCurrency)
            }
    
            if(currency.includes(',')) {
                currency = currency.replace(',', '')
            }
            currency.toLowerCase(); let up = ' ' + currency.toUpperCase()
            message.channel.startTyping()
            let nano = await crypto.coins.markets({vs_currency: currency, ids: coin})
            const data = nano.data
            
            if(nano.data.error) {
                let error = nano.data.error
                if(error === 'invalid vs_currency') error = `Invalid Currency: ${up}`
                const errorEmbed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setTitle(lang(guild, "crypt_err"))
                    .addField(lang(guild, "crypt_err2"), `\`\`\`${error}\`\`\``)
                return message.reply(errorEmbed).then(message.channel.stopTyping())
            }else if(data.map(x => x.name).length === 0) {
                return message.reply(`**${coin.toUpperCase()}** ${lang(guild, "nac")}`).then(msg => {msg.delete({timeout: 10000}); message.channel.stopTyping()})
            } else if(nano.success === true) {
                let amount = args[2]
    
                if(!amount) {
                    return message.reply(`${lang(guild, "noAmount")}`).then(msg => {msg.delete({timeout: 10000}); message.channel.stopTyping()})
                } 
                if(amount.includes(',')) {
                    amount = amount.replace(',', '.')
                } else if(isNaN(amount)) {
                    return message.reply(`**${amount.toUpperCase()}** ${lang(guild, "nan")}`).then(msg => {msg.delete({timeout: 10000}); message.channel.stopTyping()})
                } 
    
                let price = await data.map(x => x.current_price); let name = await data.map(x => x.name)
                const finalPrice = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setTitle(name)
                    .addFields(
                        {name: `📥 Input:`, value: `\`\`\`${price} (${name} price)\nX\n${await amount} (What you inputted)\`\`\``},
                        {name: `📤 Output:`, value: `\`\`\`${price * await amount + up}\`\`\``}
                    )
                    .setColor("RANDOM")
                    .setThumbnail(data.map(x => x.image).toString())
                message.reply(finalPrice).then(message.channel.stopTyping())
            }
        } catch (error) {
            message.channel.stopTyping()
            return message.reply(`Something went wrong! Please, rerun this command. If this continue, please, open an issue at my github.\n\`\`\`diff\n-Error:\n+${error}\`\`\``)
        }
    }
}