const lang = require('../../utils/languages/languages')
const math = require('mathjs')
const pages = require('discord.js-pagination')
const { MessageEmbed } = require("discord.js")

module.exports = {
    aliases: ['bm', 'bnnm'],
    description: 'Calcula o quanto de banano você vai receber do f@h',
    run: async(client, message, args) => {

        const {guild} = message
        let PPD = args[0]; let currency = args[1];
        let scope; let PPDAlt; let PPDUtil;
        
        if(PPD > 300000) {
            scope = {fExp: 5E-05, ppd:PPD, sExp:112.13}
            PPDAlt = math.evaluate('(fExp * ppd + sExp)', scope)
            PPDUtil = '5E-05 x PPD + 112.13'
        } else {
            scope = {fExp:0.49, ppd:PPD, sExp:0.42}
            PPDAlt = math.evaluate('fExp * (ppd^sExp)', scope)
            PPDUtil = '0.49 x PPD ^ 0.42'
        }

        if(!PPD) {
            return message.reply(lang(guild, "miner"))
        } else if(!currency) {
            
            message.reply(`${lang(guild, "miner_2")} ${PPD}${lang(guild, "miner_2b")}`).then(async(msg) => {
                const dlt = msg.delete({timeout: 3000})
                message.channel.startTyping()
                const calculo = new MessageEmbed()
                    .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/815713271918231564.gif?v=1')
                    .addFields(
                        {name: `${lang(guild, "miner_3")}: ${PPDUtil}`, value: `\`\`\`diff\n-${lang(guild,"miner_diff1")} ${PPD}\n\n+${lang(guild, "miner_diff2")} ${PPDAlt} Bananos\n\n---${lang(guild, "miner_auth")} ZZMthesurand#4965\`\`\``}
                    )
                    .setColor("#FA5407")
                await dlt; message.channel.stopTyping()
                message.reply(calculo)
            })

        } else {
            const get = client.crypto
            const banano = await get.coins.markets({vs_currency: currency, ids: 'banano'})
            let data = banano.data

            if(data.error === 'invalid vs_currency') {
                const errorEmbed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setTitle(lang(guild, "crypt_err"))
                    .addField(lang(guild, "crypt_err2"), `\`\`\`Invalid Currency\`\`\``)
                return message.reply(errorEmbed)
            } else if(banano.success === true) {
                let price = await data.map(x => x.current_price);

                message.reply(`Certo, seu PPD é de ${PPD}, irei calcular para você, me dê um segundo. . .`).then(async(msg) => {
                    const dlt = msg.delete({timeout: 3000})
                    message.channel.startTyping()
                    const calculoUm = new MessageEmbed()
                        .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/815713271918231564.gif?v=1')
                        .addFields(
                            {name: `${lang(guild, "miner_3")}: ${PPDUtil}`, value: `\`\`\`diff\n-${lang(guild,"miner_diff1")} ${PPD}\n\n+${lang(guild, "miner_diff2")} ${PPDAlt} Bananos\n\n+${lang(guild, "miner_diff3")} ${price * PPDAlt} ${currency.toUpperCase()}\n\n---${lang(guild, "miner_auth")} ZZMthesurand#4965\`\`\``}
                        )
                        .setColor("#FA5407")
                    await dlt; message.channel.stopTyping()
                    message.reply(calculoUm)
                })

            }
        }
    }
}