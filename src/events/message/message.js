module.exports = async(client, message) => {
    
    if(message.author.bot) return
    const {guild, author} = message

    let PREFIX = process.env.PREFIX

    if(message.channel.type === 'dm') {
        return message.reply("I am not able to execute commands in DMs!")
    }else if(message.content.startsWith(PREFIX)) {
        const [cmdName, ...cmdArgs] = message.content
            .slice(PREFIX.length)
            .trim()
            .split(/\s+/);
        if(client.commands.get(cmdName)) {client.commands.get(cmdName)(client, message, cmdArgs)}
        else return
    }
}