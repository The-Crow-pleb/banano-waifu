const guildSchema = require('../../configs/dbs/schemas/guildConfig')
const {MessageEmbed} = require('discord.js')
const lang = require('../../utils/languages/languages')

module.exports = {
    aliases: ['config'], description: '',
    run: async(client, message, args) => {

        try {
         
            const {guild} = message
            if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang(guild.id, "missing"))
            let def;
            if(args[0] === 'default') {def = 'defaults'}
            else if(args[0] === 'prefix') {def = 'prefixConfig'}
            else if(args[0] === 'language') {def = 'languageConfig'}
            else if(args[0] === 'help') {def = 'helpConfig'}
            else if(args[0] === 'show') {def = 'configConsult'}
            if (!args[0] || !def) {return message.react('<:Bad_Argument:853404667765850112>')}
            message.channel.startTyping()
            
            if(def === 'helpConfig') {
                const helpConfig = new MessageEmbed()
                    .setColor('#ffe135')
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setDescription('```diff\nThe current avaiable config options are:\n\n+language\n+prefix\n+help\n\nTo use them, please use the command: b!config <option> <argument>```')
                    .setFooter('Made by Tocka Waifu for the Banano Community.')
                message.reply(helpConfig); message.channel.stopTyping()
            } else if(def === 'defaults') {
                await guildSchema.findOneAndUpdate({_id: guild.id}, {_id: guild.id, language: 'english', prefix: process.env.PREFIX}, {upsert: true})
            } else if(def === 'prefixConfig') {
                if(!args[1]) {
                    const returnEmbed = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setColor('RANDOM')
                        .setDescription(`You forgot what I should use as a prefix.\n\n\`Ex: ${PREFIX}config prefix <Your-Prefix-Here>`)
                        .setFooter('Made by Tocka Waifu for the Banano Community.')
                    return message.reply(returnEmbed); message.channel.stopTyping()
                }
                await guildSchema.findOneAndUpdate({_id: guild.id}, {_id: guild.id, prefix: args[1]}, {upsert: true})
                const sucessEmbed = new MessageEmbed()
                    .setColor('#ffe135')
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setDescription(`✅ Success: Prefix set to \`${args[1]}\``)
                    .setFooter('Made by Tocka Waifu for the Banano Community.')
                return message.reply(sucessEmbed); message.channel.stopTyping()
            } else if(def === 'languageConfig') {

                const { languages } = require('../../utils/languages/languages.json')
                const { setLanguage } = require('../../utils/languages/languages');
                const targetLanguage = args[1]
                setLanguage(guild, targetLanguage)

                if(!targetLanguage) {
                    const noargs = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setColor("RED")
                        .setDescription(`❌Failed: Missing Args\n❌Falha: Faltando Argumentos`)
                        .addFields(
                            {name: 'You can choose between those languages:',value: '```b!config language "english" or "portugues"```'},
                            {name: 'Você pode escolher entre esses idiomas:',value: '```b!config language "portugues" ou "english"```'}
                        )
                        .setFooter('Made by Tocka Waifu for the Banano Community.')
                    return message.reply(noargs); message.channel.stopTyping()
                }
            
                if (!languages.includes(targetLanguage)) {
                    const nolang = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setColor("RED")
                        .setDescription(`The following language is not supported!:\nO idioma a seguir não é suportado!:`)
                        .addFields({name: 'Not Supported:\nNão suportado:',value: `\`\`\`${targetLanguage}\`\`\``})
                        .setFooter('Made by Tocka Waifu for the Banano Community.')
                    const langs = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setColor("RED")
                        .setDescription(`These are the supported languages:\nEsses são os idiomas suportados:`)
                        .addFields(
                            {name: 'You can choose between those languages:',value: '```b!config language "portugues" or "english"```'},
                            {name: 'Você pode escolher entre esses idiomas:',value: '```b!config language "portugues" ou "english"```'}
                        )
                        .setFooter('Made by Tocka Waifu for the Banano Community.')
                    pages = [nolang,langs]; message.channel.stopTyping()
                    return page(message, pages)
                }
    
                const success = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setDescription(`The language has been set!\nO idioma foi configurado!`)
                    .addFields({name: 'New language:\nNovo idioma:',value: `\`\`\`${targetLanguage}\`\`\``})
                    .setFooter('Made by Tocka Waifu for the Banano Community.')
                    .setColor("RANDOM")
                message.reply(success); message.channel.stopTyping()
                await guildSchema.findOneAndUpdate({_id: guild.id},{_id: guild.id,language: targetLanguage,},{upsert: true,})
            } else if (def === 'configConsult') {
                const consultEmbed = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setColor('RANDOM')
                    .setDescription(`\`\`\`json\n${JSON.stringify(configConsult, null, '\t')}\`\`\``)
                message.channel.stopTyping()
                return message.reply(consultEmbed)
            }
        } catch (error) {
            const errorEmbed = new MessageEmbed()
                .setColor('#ffe135')
                .setAuthor(message.author.username, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
                .setDescription(`Oops, Something went wrong!:\n\n\`\`\`diff\n +Error: ${error}\`\`\`\nIf this error persists, please, open an issue at my GitHub page.`)
                .setFooter('Made by Tocka Waifu for the Banano Community.')
            message.reply(errorEmbed)
            message.channel.stopTyping()
        }
    }
}