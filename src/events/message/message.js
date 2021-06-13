const guildConfig = require('../../configs/dbs/schemas/guildConfig')

module.exports = async(client, message) => {
    
    if(message.author.bot) return

    let dbPrefix = await guildConfig.findOne({_id: message.guild.id})
    let PREFIX;
    if(!dbPrefix.prefix) {
        PREFIX = process.env.PREFIX
    } else {PREFIX = dbPrefix.prefix}
    if(!dbPrefix.name) {
        await guildConfig.findOneAndUpdate({_id: message.guild.id}, {_id: message.guild.id, name: message.guild.name, language: 'english', prefix: process.env.PREFIX}, {upsert: true})
    }

    try {
        if(message.channel.type === 'dm') {
            return message.reply("I am not able to execute commands in DMs!")
        } else if(message.content.startsWith(PREFIX)) {
            const [cmdName, ...cmdArgs] = message.content
                .slice(PREFIX.length)
                .trim()
                .split(/\s+/);
            if(client.commands.get(cmdName)) {client.commands.get(cmdName)(client, message, cmdArgs)}
            else return message.react('<:Command_Not_Found:853407507682295849>')
        }
    } catch (error) {
        return console.log(`Maybe missing permissions somewhere, ignore this.\nAnyways, if you want to see what error caused this, here it is:\n${error}`)
    }
}