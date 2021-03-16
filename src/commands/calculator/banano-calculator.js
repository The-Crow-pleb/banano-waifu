const lang = require('../../utils/languages/languages')
const math = require('mathjs')
const { MessageEmbed } = require("discord.js")

module.exports = {
    aliases: ['bc', 'bnc'],
    description: 'Calcula o quanto de banano você vai receber do f@h',
    run: async(client, message, args) => {

        const {guild} = message; const get = client.crypto
        let PPD = args[0]; let scope; let PPDAlt; let PPDUtil;
        
        if(PPD.includes(',')) {
            PPD = PPD.replace(',', '')
        } else if(PPD.includes('.')) {
            PPD = PPD.replace('.', '')
        }

        if(!currency) {
            currency = 'usd'
        } else currency = args[1]
        
        
        if(PPD > 3000000) {
            scope = {fExp:2, sExp:4E-12, tExp:2, fExp:2, ftExp: 2E-05, sxExp:2, stExp: 224.65, ppd: PPD}
            PPDAlt = math.evaluate('fExp * ((sExp *(ppd / tExp)) ^ fExp + ftExp * (ppd / sxExp) + stExp)', scope)
            PPDUtil = '2 * ((4E-12*(PPD/2))^2 + 2E-05*(PPD/2) + 224.65)'
        } else {
            2 * 0.39 * (PPD/2)^0.45
            scope = {fExp: 2, sExp:0.39, tExp:2, ftExp:0.45 , ppd:PPD}
            PPDAlt = math.evaluate('fExp * sExp * ((ppd / tExp) ^ ftExp)', scope)
            PPDUtil = '2 * 0.39 * (ppd/2)^0.45'
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
        
        if(banano.success === true) {

            message.reply(`${lang(guild, "miner_2")} ${PPD}${lang(guild, "miner_2b")}`).then(async(msg) => {
                const dlt = msg.delete({timeout: 3000})
                message.channel.startTyping()
                const calculoUm = new MessageEmbed()
                    .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/815713271918231564.gif?v=1')
                    .addFields(
                        {name: `${lang(guild, "miner_3")} ${PPDUtil}`, value: `\`\`\`diff\n-${lang(guild,"miner_diff1")} ${PPD}\n\n+${lang(guild, "miner_diff2")} ${PPDAlt} Bananos\n\n+${lang(guild, "miner_diff3")} ${btc * PPDAlt} Sats\n\n+${lang(guild, "miner_diff4")} ${nanoPrice}\n\n+${lang(guild, "miner_diff5")} ${bananoUSD + ' ' + currency.toUpperCase()}\n\n---${lang(guild, "miner_auth")}\`\`\``}
                    )
                    .setColor("#ffdf00")
                    .setFooter(`${lang(guild, "data_prov")} ${data.map(x=>x.last_updated)}\n${lang(guild, "disclaimer")}`)
                await dlt; message.channel.stopTyping()
                message.reply(calculoUm)
            })
        }
        
    }
}