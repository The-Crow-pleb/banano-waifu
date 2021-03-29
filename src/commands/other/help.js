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
                {name: lang(guild, "h_m2"), value: `[My Github](https://github.com/The-Crow-pleb/banano-calculator)\n[Banano Discord Server](https://chat.banano.cc/)\n[Banano Reddit](https://www.reddit.com/r/banano/)\n[Invite me!](https://discord.com/oauth2/authorize?client_id=819860981320253470&scope=bot&permissions=347200)`},
                {name: lang(guild, "h_d"), value: '```Nano: nano_1tocka3s4q3iaws7kjdt7tx87nzzjaqaiibiyxc3f9gcqjx4gwbwi1bedcth\nBanano: ban_1tocka3s4q3iaws7kjdt7tx87nzzjaqaiibiyxc3f9gcqjx4gwbwi1bedcth```'}
            )
        const commandPage = new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({dynamic: true}))
            .setColor("#ffdf00 ")
            .setTitle(`${lang(guild, "h")} ${lang(guild, "h3")}`)
            .addFields(
                {name: lang(guild, "h_c"), value: `\`\`\`${PREFIX}bananoc <PPD> <?${lang(guild, "currency")}>\`\`\``},
                {name: lang(guild, "h_c_1"), value: `\`\`\`${PREFIX}price <${lang(guild, "name")}> <${lang(guild, "currency")}> <${lang(guild, "quant")}>\`\`\``},
                {name: lang(guild, "h_c_2"), value: `\`\`\`${PREFIX}setl <english/portugues>\`\`\``},
                {name: lang(guild, "h_c_3"), value: `\`\`\`${PREFIX}banano-miner <${lang(guild, "h_c_3_1")}>\`\`\``},
                {name: lang(guild, "h_c_4"), value: `\`\`\`${PREFIX}bprice\`\`\``},
                {name: 'Ping & Uptime', value: `\`\`\`${PREFIX}ping\`\`\``},
            )
        pgs = [mainPage, commandPage]
        pages(message, pgs)
    }
}