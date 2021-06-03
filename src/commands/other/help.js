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
                {name: lang(guild, "h_m"),  value: lang(guild, "h_m_1")},
                {name: lang(guild, "h_m2"), value: `[My Github](https://github.com/The-Crow-pleb/banano-calculator)\n[Banano Discord Server](https://chat.banano.cc/)\n[Banano Reddit](https://www.reddit.com/r/banano/)\n[Invite me!]( https://discord.com/oauth2/authorize?client_id=819860981320253470&scope=bot&permissions=388160)`},
                {name: lang(guild, "h_d"),  value: '```Nano: nano_1tocka13zi1ab9zyu6a9e9e6ipg16anaxhqfsz9a3swfsux8id94zo3j3kej\nBanano: ban_1tocka13zi1ab9zyu6a9e9e6ipg16anaxhqfsz9a3swfsux8id94zo3j3kej```'},
                {name: lang(guild, "rep2"), value: '[ban_36pcrz51goremmjj1uwdxen67dxj9w6exnrj7bjafb7b1az8zkcbfmbe19gk](https://creeper.banano.cc/explorer/account/ban_36pcrz51goremmjj1uwdxen67dxj9w6exnrj7bjafb7b1az8zkcbfmbe19gk/history)'}
            )
        const commandPage = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setColor("#ffdf00 ")
            .setTitle(`${lang(guild, "h")} ${lang(guild, "h3")}`)
            .addFields(
                {name: lang(guild, "h_c"),   value: `\`\`\`${PREFIX}bananoc <PPD> <?${lang(guild, "currency")}>\`\`\``},
                {name: lang(guild, "h_c_1"), value: `\`\`\`${PREFIX}price <${lang(guild, "name")}> <${lang(guild, "currency")}> <${lang(guild, "quant")}>\`\`\``},
                {name: lang(guild, "h_c_2"), value: `\`\`\`${PREFIX}setl <english/portugues>\`\`\``},
                {name: lang(guild, "h_c_3"), value: `\`\`\`${PREFIX}banano-miner <${lang(guild, "h_c_3_1")}>\`\`\``},
                {name: lang(guild, "h_c_4"), value: `\`\`\`${PREFIX}bprice\`\`\``},
                {name: 'Exchanges',          value: `\`\`\`${PREFIX}exchange-list\`\`\``},
                {name: 'Ping & Uptime',      value: `\`\`\`${PREFIX}ping\`\`\``},
                {name: lang(guild, "h_c_5"), value: `\`\`\`${PREFIX}info\`\`\``},
            )
        const nodePage = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setColor("#ffdf00 ")
            .setTitle(lang(guild, "node"))
            .addFields(
                {name: lang(guild, "node_1"), value: `\`\`\`${PREFIX}blocks\`\`\``},
                {name: lang(guild, "node_2"), value: `\`\`\`${PREFIX}version\`\`\``},
                {name: lang(guild, "node_3"), value: `\`\`\`${PREFIX}peers\`\`\``},
                {name: 'Block Hash Info:',    value: `\`\`\`${PREFIX}blockinfo\`\`\``},
                {name: 'Banano Acc. Info:',   value: `\`\`\`${PREFIX}accinfo\`\`\``},
                {name: 'Rep Wallet:',         value: `\`\`\`${PREFIX}rep\`\`\``},
                {name: 'Node Online Check:',  value: `\`\`\`${PREFIX}node\`\`\``}
            )
        pgs = [mainPage, commandPage, nodePage]
        pages(message, pgs)
    }
}