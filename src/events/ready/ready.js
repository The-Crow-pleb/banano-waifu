module.exports = async(client) => {

    const {loadLangs} = require('../../utils/languages/languages')
    const db = require('../../configs/dbs/dbLogin');
    
    db.then(() => console.log(`${client.user.username} bananoloaded into DB!`)).catch(err => console.log(err))
    console.log(`${client.user.username} Bananoloaded!`)
    const crypto = client.crypto
    const banano = await crypto.coins.markets({vs_currency: 'sats', ids: 'banano'})
    let price1 = Math.floor(banano.data.map(x => x.current_price)); let price2 = Math.floor(banano.data.map(x => x.current_price));

    client.user.setActivity(`${price1} Sats = 1 Ban!`, {type: "LISTENING"})
    let activNum = 0
    setInterval(() => {
        if(activNum === 0) {
            client.user.setActivity(`${price2} Sats = 1 Ban!`, {type: "LISTENING"})
            activNum = 1
        } else if (activNum === 1) {
            client.user.setActivity(`${price1} Sats = 1 Ban!`, {type: "LISTENING"})
            activNum = 0
        }
    }, 300000);
    
    loadLangs(client)
}