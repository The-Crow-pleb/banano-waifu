const userSchema = require("../../../../configs/dbs/schemas/userSchema")
const {MessageEmbed} = require('discord.js')
const {default: fetch} = require('node-fetch')

module.exports = {
    description: "", aliases: [],
    run: async(client, message, args) => {
     
        return message.reply('Niet, Don\'t have enough banano to continue to test the tipbot.')
        
    }
}