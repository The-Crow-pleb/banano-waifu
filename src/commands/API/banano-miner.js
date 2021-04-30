const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const moment = require('moment')
module.exports = {
    aliases: [],
    description: 'Retrieves data from the BananoMiner API',
    run: async(client, message, args) => {

        try {
            const {guild} = message
            const username = args[0]
            if(!username) {
                return message.reply("Correct usage: b!banano-miner <userID>")
            }
            message.channel.startTyping()
            //-----------------------------------------------------------GET REQUEST---------------------------------------------------------------------//
    
            const miner = `https://bananominer.com/user_name/${username}`; const fah = `https://api.foldingathome.org/user/${username}`;
            const options = {
                method: "GET",
                headers: {
                  "Accept-Encoding": "gzip, deflate",
                  Accept: "application/json",
                }   
            }
            
            //----------------------------------------------------------------Banano Miner Report---------------------------------------------------------//
            const fetchedMiner = await fetch(miner, options)
            const bridge = await fetchedMiner
            const resMiner = await bridge.json()

            if(resMiner.error) {
                const embedError = new MessageEmbed()
                    .setColor("#ac0404")
                    .setTitle(`Error!`)
                    .setDescription(`\`\`\`diff\n-${resMiner.error}\`\`\``)
                message.reply(embedError); message.channel.stopTyping(); return 
            } 
            // Reading the API map
            let payment = resMiner.payments.map(x => x.amount); let wus = resMiner.payments.map(x => x.work_units); let scoreMiner = resMiner.payments.map(x => x.score)

            //Retrieving the User Info
            const user = resMiner.user.name; const userId = resMiner.user.id; const createdAt = moment(resMiner.user.created_at).locale('pt-br').format('L')

            //Formatting the payments, wus and score
            let totalPayment; let totalWusMiner; let totalScoreMiner;
            if (payment.length > 1) {
                let sum = 0
                for(let payments in payment) {
                    sum += payment[payments]
                }
                totalPayment = sum
            } else totalPayment = payment[0]
            if(wus.length > 1) {
                let sum = 0
                for(let work_units in wus) {
                    sum += wus[work_units]
                }
                totalWusMiner = sum
            } else totalWusMiner = wus[0]
            if(scoreMiner.length > 1) {
                let sum = 0
                for(let scoreTotal in scoreMiner) {
                    sum += scoreMiner[scoreTotal]
                }
                totalScoreMiner = sum
            } else totalScoreMiner = scoreMiner[0]
            if(totalPayment===undefined) totalPayment = 0; if(totalWusMiner===undefined) totalWusMiner = 0; if(totalScoreMiner===undefined) totalScoreMiner = 0 
            
            //------------------------------------------------------------Folding @ Home Report ---------------------------------------------------------------//
            //Retrieving info from the Map and others
            const fetchedFAH = await fetch(fah)
            const bridge2 = await fetchedFAH
            const resFAH = await bridge2.json()
            let fahWus = resFAH.teams.map(x => x.wus); if(fahWus === undefined) fahWus = 'Error'
            let fahPoints = resFAH.teams.map(x => x.score); if(fahPoints === undefined) fahPoints = 'Error'
            let team = resFAH.teams.map(x => x.team); if(team === undefined) team = 'Error'
            let teamName = resFAH.teams.map(x => x.name); if(teamName === undefined) teamName = 'Error'
            let lastWu = resFAH.teams.map(x => x.last); if(lastWu === undefined) lastWu = 'Error'
            
            //------------------------------------------------------ Report Message -----------------------------------------------------------------------//

            let BananoMinerReport = `+Account: ${user}\n\n+User ID: ${userId}\n\n+Created at: ${createdAt}\n\n+Total Payment in Bananos: ${totalPayment} Bananos\n\n+Total WUS: ${totalWusMiner} Wus\n\n+Total Score: ${totalScoreMiner} Points`
            let fahReport = `-Total WUS: ${fahWus}\n\n-Last Work Unit: ${lastWu}\n\n-Total Points: ${fahPoints}\n\n-At Team: ${teamName} - ${team}`

            const report = new MessageEmbed()
                .setColor('#ffe135')
                .setAuthor(guild.name, 'https://cdn.discordapp.com/emojis/821190159995371521.gif?v=1')
                .addFields(
                    {name: 'Banano Miner Report', value: `\`\`\`diff\n${BananoMinerReport}\`\`\``},
                    {name: 'F@H Report', value: `\`\`\`diff\n${fahReport}\`\`\``}
                )
                .setFooter('Made by Tocka Waifu for the Banano Community.')
            message.reply(report).then(message.channel.stopTyping()) //aaaaaaand, send!
        } catch (error) {
            message.channel.stopTyping()
            return message.reply(`Something went wrong! Please, rerun this command. If this continue, please, open an issue at my github.\n\`\`\`diff\n-Error:\n+${error}\`\`\``)
        }
    }   
}