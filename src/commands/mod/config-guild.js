const guildSchema = require('../../configs/dbs/schemas/guildConfig')
const {MessageEmbed} = require('discord.js')

module.exports = {
    aliases: ['config'], description: '',
    run: async(client, message, args) => {

        try {
         
            const {guild, author} = message
            if(args[0] === 'default') {def = 'defaults'}
            else if(args[0] === 'prefix') {def = 'prefixConfig'}
            // else if(args[0] === 'language') {def = 'languageConfig'}
            
            if(def === 'defaults') {
                await guildSchema.findOneAndUpdate({_id: guild.id}, {_id: guild.id, language: 'english', prefix: process.env.PREFIX}, {upsert: true})
            } else if(def === 'prefixConfig') {
                if(!args[1]) {
                    const returnEmbed = new MessageEmbed()
                        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                        .setColor('RANDOM')
                        .setDescription(`You forgot what I should use as a prefix.\n\n\`Ex: ${PREFIX}config prefix <Your-Prefix-Here>`)
                    return message.reply(returnEmbed)
                }
                await guildSchema.findOneAndUpdate({_id: guild.id}, {_id: guild.id, prefix: args[1]}, {upsert: true})
                const sucessEmbed = new MessageEmbed()
                    .setColor('#ffe135')
                    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
                    .setDescription(`✅ Sucess: Prefix set to \`${args[1]}\``)
                return message.reply(sucessEmbed)
            }

        } catch (error) {
            console.log(error)
        }
    }
}