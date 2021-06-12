const { loadLangs } = require('../../utils/languages/languages')
const guildSchema = require('../../configs/dbs/schemas/guildConfig')

module.exports = async(client, guild) => {
    const guildId = guild.id
    await guildSchema.findOneAndUpdate({_id: guildId}, {_id: guildId, name: guild.name, language: 'english', prefix: process.env.PREFIX}, {upsert: true})
    loadLangs(client)
}