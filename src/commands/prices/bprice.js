const { MessageEmbed } = require("discord.js")

module.exports = {
    aliases: [],
    description: '',
    run: async(client, message, args) => {
        
        const {guild} = message; const get = client.crypto

        
        const nano = await get.coins.markets({vs_currency: 'btc', ids: 'nano'})

        if(nano.success === true) {

            //Nano

            const nanoData = nano.data
            const nanoRank = nanoData.map(x => x.market_cap_rank)

            const nanoBinance = await get.exchanges.fetchTickers('binance', {coin_ids: 'nano'})
            const nanoBinanceMap = nanoBinance.data.tickers[1]
            const nanoBinanceMap2 = nanoBinanceMap.converted_last.btc
    
            const nanoKucoin = await get.exchanges.fetchTickers('kucoin', {coin_ids: 'nano'})
            const nanoKucoinMap = nanoKucoin.data.tickers[2]
            const nanoKucoinMap2 = nanoKucoinMap.converted_last.btc
    
            const nanoUSD = await get.coins.markets({vs_currency: 'usd', ids: 'nano'})
            const nanoUsdData = nanoUSD.data
            const nanoUsdPrice = nanoUsdData.map(x => x.current_price)
            const nanoMKC = nanoUsdData.map(x => x.market_cap)
            const nanoMKCFormat = nanoMKC.toLocaleString()
    
            //Banano
            const banano = await get.coins.markets({vs_currency: 'sats', ids: 'banano'})
            const bananoData = banano.data
            const bananoPrice = bananoData.map(x => x.current_price)
            const bananoRank = bananoData.map(x => x.market_cap_rank)
            client.user.setActivity(`${bananoPrice} sats = 1 Ban!`)

            const bananoUSD = await get.coins.markets({vs_currency: 'usd', ids: 'banano'})
            const bananoUsdData = bananoUSD.data
            const bananoUsdPrice = bananoUsdData.map(x => x.current_price)
            const bnnUsdString = bananoUsdPrice.toString()
            const bnnUSDFormat = bnnUsdString.slice(0, 8)
            const bananoMKC = bananoUsdData.map(x => x.market_cap)
            const bananoMKCForm = bananoMKC.toLocaleString()
    
            const bananoNanoPrice = bananoUsdPrice / nanoUsdPrice
            const bnnString = bananoNanoPrice.toString()
            const bnnFormat = bnnString.slice(0, 8)
            const bananoFormat = `**BANANO**\n\`\`\`diff\n-Rank: ${bananoRank}\n+Price (BTC): ${bananoPrice} sats\n+Price (USD): ${bnnUSDFormat}\n+Price (NANO): ${bnnFormat}\n+Market Volume: $${bananoMKCForm}\`\`\``;
            const nanoFormat = `**NANO**\n\`\`\`diff\n-Rank: ${nanoRank}\n+Price (Kucoin): ${nanoKucoinMap2}\n+Price (Binance): ${nanoBinanceMap2}\n+Price (USD): ${nanoUsdPrice}\n+Market Volume: $${nanoMKCFormat}\`\`\``
            const priceEmbed = new MessageEmbed()
                .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                .setColor("#ffdf00")
                .setDescription(`${bananoFormat}\n${nanoFormat}`)
            message.reply(priceEmbed)
        } else return message.reply("Something wrong happened, try again later.")
    }
}