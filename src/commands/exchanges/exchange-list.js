const {MessageEmbed} = require('discord.js'); const pages = require('discord.js-pagination'); const lang = require('../../utils/languages/languages')

module.exports = {
    description: '', aliases: ['el', 'exchange', 'exh'],
    run: async(client, messages, args) => {
        
        const {guild} = message

        const exFAQ = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setColor("RANDOM")
            .setDescription(lang(guild, "ex_faq"))
            .addField(lang(guild, "ex_faq_2"), lang(guild, "ex_faq_1"))
        const allEx = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setColor("RANDOM")
            .setDescription(lang(guild, "ex_h"))
            .addFields(
                {name: 'CoinEx', value: `[${lang(guild, "click")}](https://www.coinex.com/register?refer_code=74ceq&lang=en_US)`},
                {name: 'TxBit', value: `[${lang(guild, "click")}](https://txbit.io/?r=11428)`},
                {name: 'Mercatox', value: `[${lang(guild, "click")}](https://mercatox.com/?referrer=680802)`},
                {name: lang(guild, "ex_list"), value: `[${lang(guild, "click")}](https://howtobanano.info/all-current-banano-exchanges-an-updated-overview/)`}
            )
        pgs=[exFAQ, allEx]; pages(message, pgs)
    }
}