const axios = require('axios')
const cheerio = require('cheerio')

exports.getBcvRate = async (req, res, next) => {
    const url = `http://www.bcv.org.ve/`
    try {
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)
        const rate = $('div#dolar > div > div:last-child strong').text()
        const date = $('div.pull-right > span.date-display-single').text()
        res.json({
            rate, date
        })
    } catch (e) { 
        console.error(`Error al tratar de obtener tasa de cambio actualizada.`)
        next(e)
    }
}