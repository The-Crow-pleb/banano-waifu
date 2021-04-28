module.exports = async(client) => {

    const {loadLangs} = require('../../utils/languages/languages')
    const db = require('../../configs/dbs/dbLogin'); const crypto = client.crypto
    
    db.then(() => console.log(`${client.user.username} bananoloaded into DB!`))
    console.log(`${client.user.username} Bananoloaded into ${client.guilds.cache.size} monke-servers!`)
    
    loadLangs(client)
}