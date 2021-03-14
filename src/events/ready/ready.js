module.exports = async(client) => {

    const {loadLangs} = require('../../utils/languages/languages')
    const db = require('../../configs/dbs/dbLogin'); const crypto = client.crypto
    
    db.then(() => console.log(`${client.user.username} bananoloaded into DB!`)).catch(err => console.log(err))
    console.log(`${client.user.username} Bananoloaded into ${client.guilds.cache.size} monke-servers!`)
    
    const banano = await crypto.coins.markets({vs_currency: 'sats', ids: 'banano'})
    let price1 = Math.floor(banano.data.map(x => x.current_price));

    client.user.setActivity(`${price1} Sats = 1 Ban!`, {type: "LISTENING"}); let activNum = 0
    setInterval(() => {
        if(activNum === 0) {
            let price2 = Math.floor(banano.data.map(x => x.current_price))
            client.user.setActivity(`${price2} Sats = 1 Ban!`, {type: "LISTENING"})
            activNum = 1
        } else if (activNum === 1) {
            let price3 = Math.floor(banano.data.map(x => x.current_price))
            client.user.setActivity(`${price3} Sats = 1 Ban!`, {type: "LISTENING"})
            activNum = 0
        }
    }, 300000);
    
    loadLangs(client)
}