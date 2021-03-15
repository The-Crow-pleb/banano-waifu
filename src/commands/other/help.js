const { MessageEmbed } = require("discord.js")
const pages = require('discord.js-pagination')
const lang = require('../../utils/languages/languages')
const PREFIX = process.env.PREFIX

module.exports = {
    aliases: ['h'],
    description: "Comando de Help",
    run: async(client, message, args) => {

        const {guild} = message
        const mainPage = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setColor("#ffdf00 ")
            .setTitle(`${lang(guild, "h")} ${lang(guild, "h2")}`)
            .addFields(
                {name: lang(guild, "h_m"), value: lang(guild, "h_m_1")},
                {name: lang(guild, "h_m2"), value: `[My Github](https://github.com/The-Crow-pleb/banano-calculator)\n[Banano Discord Server](https://chat.banano.cc/)\n[Banano Reddit](https://www.reddit.com/r/banano/)\n[Support Server](https://discord.gg/NWAs6v4AdX)`},
                {name: lang(guild, "h_d"), value: 'Nano: nano_1t6tj3zqwjxsxda7o6wb6gzc65y6h1qifoysn9if9x8nj4bh7igbpao46szm\nBanano: ban_1t6tj3zqwjxsxda7o6wb6gzc65y6h1qifoysn9if9x8nj4bh7igbpao46szm'}
            )
        const commandPage = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setColor("#ffdf00 ")
            .setTitle(`${lang(guild, "h")} ${lang(guild, "h3")}`)
            .addFields(
                {name: lang(guild, "h_c"), value: `\`\`\`${PREFIX}bananominer <PPD>\`\`\``},
                {name: lang(guild, "h_c_1"), value: `\`\`\`${PREFIX}price <${lang(guild, "name")}> <${lang(guild, "currency")}> <${lang(guild, "quant")}>\`\`\``},
                {name: lang(guild, "h_c_2"), value: `\`\`\`${PREFIX}setl <english/portugues>\`\`\``}
            )
        pgs = [mainPage, commandPage]
        pages(message, pgs)
    }
}