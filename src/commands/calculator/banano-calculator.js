const lang = require('../../utils/languages/languages')
const math = require('mathjs')
const { MessageEmbed } = require("discord.js")

module.exports = {
    aliases: ['bc', 'bnc'],
    description: 'Calcula o quanto de banano você vai receber do f@h',
    run: async(client, message, args) => {
        try {
            const {guild} = message; const get = client.crypto
            let PPD = args[0]; let scope; let PPDAlt; let PPDUtil; let currency = args[1]
            
            if(isNaN(PPD)) {return message.reply(`" **${PPD}** " is not a number!\nCorrect usage: b!bnc <PPD> ?currency`)}
            
            if(!currency) {currency = 'usd'}
            else if(!PPD) {return message.reply(lang(guild, "miner")).then(message.channel.stopTyping())}      
    
            if(PPD.includes(',')) {PPD = PPD.replace(',', '')} 
            else if(PPD.includes('.')) {PPD = PPD.replace('.', '')}  
    
            const selC = await get.coins.markets({vs_currency: currency, ids: 'banano'})
            if(selC.data.error) {
                return message.reply(`Oops, somethings went wrong:\n\`\`\`diff\n-${selC.data.error}\`\`\``).then(message.channel.stopTyping())
            }
            const selC2 = selC.data.map(x => x.current_price)

            scope = {fExp: 0.35, sExp: (PPD/2), tExp: 0.44}
            PPDAlt = math.evaluate('fExp * sExp ^ tExp', scope)
            PPDUtil = '0.35 * (PPD / 2) ^ 0.44'
            // if(PPD > 3000000) {
            //     scope = {fExp:2, sExp:4E-12, tExp:2, fExp:2, ftExp: 2E-05, sxExp:2, stExp: 224.65, ppd: PPD}
            //     PPDAlt = math.evaluate('fExp * ((sExp *(ppd / tExp)) ^ fExp + ftExp * (ppd / sxExp) + stExp)', scope)
            //     PPDUtil = '2 * ((4E-12*(PPD/2))^2 + 2E-05*(PPD/2) + 224.65)'
            // } else {
            //     scope = {fExp: 2, sExp:0.39, tExp:2, ftExp:0.45 , ppd:PPD}
            //     PPDAlt = math.evaluate('fExp * sExp * ((ppd / tExp) ^ ftExp)', scope)
            //     PPDUtil = '2 * 0.39 * (ppd/2)^0.45'
            // }
    
            const banano = await get.coins.markets({vs_currency: 'btc', ids: 'banano'})
            let data = banano.data
            let btc = await data.map(x => x.current_price);
    
            const bananoSat = await get.coins.markets({vs_currency: 'sats', ids: 'banano'})
            let priceSat = bananoSat.data.map(x=> x.current_price)
    
            let usd = await get.coins.markets({vs_currency: 'usd', ids: 'banano'})
            let bananoUSD =  PPDAlt * usd.data.map(x => x.current_price)
    
            const nano = await get.coins.markets({vs_currency: 'usd', ids: 'nano'})
            let nanoData = nano.data.map(x => x.current_price)
            let nanoPrice = bananoUSD / nanoData
    
            const selCP = selC2 * PPDAlt
            
            if(banano.success === true) {
    
                let correctPriceUsage; let correctFormat;
                if(PPD < 300) {
                    correctPriceUsage = priceSat
                    correctFormat = 'Full Sats'
                } else if(PPD > 300) {
                    correctPriceUsage = btc;
                    correctFormat = 'Sats'
                }
    
                client.user.setActivity(`${priceSat} sats = 1 Ban!`)
                message.reply(`${lang(guild, "miner_2")} ${PPD}${lang(guild, "miner_2b")}`).then(async(msg) => {
                    const dlt = msg.delete({timeout: 3000})
                    message.channel.startTyping()
                    const calculoUm = new MessageEmbed()
                        .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
                        .addFields(
                            {name: `${lang(guild, "miner_3")} ${PPDUtil}`, value: `\`\`\`diff\n-${lang(guild,"miner_diff1")} ${PPD}\n\n+${lang(guild, "miner_diff2")} ${PPDAlt} Bananos\n\n+${lang(guild, "miner_diff3")} ${correctPriceUsage * PPDAlt} ${correctFormat}\n\n+${lang(guild, "miner_diff4")} ${nanoPrice}\n\n+${lang(guild, "miner_diff5")} ${selCP + ' ' + currency.toUpperCase()}\n\n---${lang(guild, "miner_auth")}\`\`\``}
                        )
                        .setColor("#ffdf00")
                        .setFooter(`${lang(guild, "data_prov")} ${data.map(x=>x.last_updated)}\n${lang(guild, "disclaimer")}`)
                    await dlt; message.channel.stopTyping()
                    message.reply(calculoUm)
                })
            }
        } catch (error) {
            message.channel.stopTyping()
            return message.reply(`Something went wrong! Please, rerun this command. If this continue, please, open an issue at my github.\n\`\`\`diff\n-Error:\n+${error}\`\`\``)
        }
    }
}