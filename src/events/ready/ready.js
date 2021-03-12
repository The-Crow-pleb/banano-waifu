module.exports = async(client) => {

    const {loadLangs} = require('../../utils/languages/languages')
    const db = require('../../configs/dbs/dbLogin');
    
    db.then(() => console.log(`${client.user.username} bananoloaded into DB!`)).catch(err => console.log(err))
    console.log(`${client.user.username} Bananoloaded!`)
    const crypto = client.crypto
    const banano = await crypto.coins.markets({vs_currency: 'sats', ids: 'banano'})
    let price = Math.floor(banano.data.map(x => x.current_price))
    client.user.setActivity(`${price} Sats = 1 Ban!`, {type: "LISTENING"})

    loadLangs(client)
}