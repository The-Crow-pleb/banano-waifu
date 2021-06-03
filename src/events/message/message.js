module.exports = async(client, message) => {
    
    if(message.author.bot) return

    let PREFIX = process.env.PREFIX

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
            message.author.send("*English:**\n\nI am missing Permissions to speak, add reactions, manage messages (I need those to edit and delete my own messages) or send embed links, please, check my permissions or invite me again using the link below:\nhttps://discord.com/oauth2/authorize?client_id=819860981320253470&scope=bot&permissions=347200")
        } 
    } catch (error) {
        return console.log(`Maybe missing permissions somewhere, ignore this.`)
    }
}