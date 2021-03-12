const langSchema = require('../../configs/dbs/schemas/language-schema')
const prefixSchema = require('../../configs/dbs/schemas/prefix-schema')
const { loadLangs } = require('../../utils/languages/languages')

module.exports = async(client, guild) => {
    const guildId = guild.id
    await langSchema.findOneAndUpdate({_id: guildId,},{_id: guildId, language: 'english',},{upsert: true,})
    await prefixSchema.findOneAndUpdate({_id: guild.id}, {_id: guildId, prefix: process.env.PREFIX}, {upsert:true})
    loadLangs(client)
}