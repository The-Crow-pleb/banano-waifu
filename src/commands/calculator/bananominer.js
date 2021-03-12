const lang = require('../../utils/languages/languages')
const math = require('mathjs')
const { MessageEmbed } = require("discord.js")

module.exports = {
    aliases: ['bm', 'bnnm'],
    description: 'Calcula o quanto de banano você vai receber do f@h',
    run: async(client, message, args) => {

        const {guild} = message; const get = client.crypto
        let PPD = args[0]; let scope; let PPDAlt; let PPDUtil;
        
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
        } 

        const banano = await get.coins.markets({vs_currency: 'btc', ids: 'banano'})
        let data = banano.data
        let btc = await data.map(x => x.current_price);

        let usd = await get.coins.markets({vs_currency: 'usd', ids: 'banano'})
        let bananoUSD =  PPDAlt * usd.data.map(x => x.current_price)

        const nano = await get.coins.markets({vs_currency: 'usd', ids: 'nano'})
        let nanoData = nano.data.map(x => x.current_price)
        let nanoPrice = bananoUSD / nanoData

        if(data.error === 'invalid vs_currency') {

            const errorEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setTitle(lang(guild, "crypt_err"))
                .addField(lang(guild, "crypt_err2"), `\`\`\`Invalid Currency\`\`\``)
            return message.reply(errorEmbed)

        } else if(banano.success === true) {

            message.reply(`${lang(guild, "miner_2")} ${PPD}${lang(guild, "miner_2b")}`).then(async(msg) => {
                const dlt = msg.delete({timeout: 3000})
                message.channel.startTyping()
                const calculoUm = new MessageEmbed()
                    .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/815713271918231564.gif?v=1')
                    .addFields(
                        {name: `${lang(guild, "miner_3")} ${PPDUtil}`, value: `\`\`\`diff\n-${lang(guild,"miner_diff1")} ${PPD}\n\n+${lang(guild, "miner_diff2")} ${PPDAlt} Bananos\n\n+${lang(guild, "miner_diff3")} ${btc * PPDAlt} Sats\n\n+${lang(guild, "miner_diff4")} ${nanoPrice}\n\n+${lang(guild, "miner_diff5")} ${bananoUSD}\n\n---${lang(guild, "miner_auth")}\`\`\``}
                    )
                    .setColor("#FA5407")
                    .setFooter(`${lang(guild, "data_prov")} ${data.map(x=>x.last_updated)}`)
                await dlt; message.channel.stopTyping()
                message.reply(calculoUm)
            })
        }
        
    }
}