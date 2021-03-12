const langSchema = require('../../configs/dbs/schemas/language-schema')
const prefixSchema = require('../../configs/dbs/schemas/prefix-schema')

module.exports = async(client, guild) => {

    const guildId = guild.id
    await langSchema.findOneAndRemove({_id: guildId,},{_id: guildId})
    await prefixSchema.findOneAndRemove({_id: guildId,},{_id: guildId})

}