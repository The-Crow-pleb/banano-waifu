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
        } else if(message.guild.me.hasPermission("SEND_MESSAGES" && "EMBED_LINKS" && "ADD_REACTIONS" && "MANAGE_MESSAGES")) {
             if(message.content.startsWith(PREFIX)) {
                const [cmdName, ...cmdArgs] = message.content
                    .slice(PREFIX.length)
                    .trim()
                    .split(/\s+/);
                if(client.commands.get(cmdName)) {client.commands.get(cmdName)(client, message, cmdArgs)}
                else return
            }
        } else {
            message.react('<:Missing_Permissions:853267979735531531>')
            await message.react('<:Open_Your_Dms:853272230565380096>')
            message.author.send("*English:**\n\nI am missing Permissions to speak, add reactions, manage messages (I need those to edit and delete my own messages) or send embed links, please, check my permissions or invite me again using the link below:\nhttps://discord.com/oauth2/authorize?client_id=819860981320253470&scope=bot&permissions=347200").catch(err => console.log('Sorry, could not send the warning message to this user.'))
        } 
    } catch (error) {
        return console.log(`Maybe missing permissions somewhere, ignore this.`)
    }
}