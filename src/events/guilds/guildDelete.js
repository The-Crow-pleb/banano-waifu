const guildSchema = require('../../configs/dbs/schemas/guildConfig')

module.exports = async(client, guild) => {
    const guildId = guild.id
    await guildSchema.findOneAndRemove({_id: guildId},{_id: guildId})
}