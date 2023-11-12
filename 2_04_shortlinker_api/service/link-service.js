const pool = require('../db/pool.js')
const ShortUniqueId = require("short-unique-id");
const axios = require('axios')
const InvalidUrlError = require('../exceptions/invalid-url-error.js')
const UrlNotExistsError = require('../exceptions/url-not-exists-error.js')

class LinkService {
    async shortenLink(link){
        const {randomUUID} = new ShortUniqueId({length:10})
        const short = randomUUID()
        if (typeof link !== 'string'){
            throw new InvalidUrlError('URL is invalid')
        }
        await axios.get(link)

        await pool.query('INSERT INTO links (short, link) VALUES ($1, $2)', [short,link])

        return short
    }

    async findLink(short){
        const link = await pool.query('SELECT * FROM links WHERE short=$1', [short])
        if (!link.rows[0]){
            throw new UrlNotExistsError('This URL does not exist')
        }
        return link.rows[0].link
    }
}

module.exports = new LinkService()