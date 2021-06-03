const { MessageEmbed } = require('discord.js'); const lang = require('../../../utils/languages/languages')

module.exports = {
    description: '', aliases: ['rep'],
    run: async(client, message, args) => {

        const rep_adress = new MessageEmbed()
            .setColor('#ffe135')
            .setAuthor(message.guild.name, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
            .setFooter('Made by Tocka Waifu for the Banano Community.')
            .setDescription(lang(message.guild, "rep"))
        return message.reply(rep_adress)
       
    }
}