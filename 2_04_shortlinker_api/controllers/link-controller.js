const linkService = require('../service/link-service.js')


class LinkController {
    async shortenLink(req, res){
        try {
            const {url} = req.body
            const short = await linkService.shortenLink(url)
            res.status(201).json({shortenLink: process.env.BASE_URL + '/' + short})
        }catch (e) {
            res.status(e.status || 500).json({message: e.message})
        }
    }

    async redirectLink(req, res){
        try {
            const short = req.params.id
            const link = await linkService.findLink(short)
            res.redirect(link)
        }catch (e) {
            res.status(e.status || 500).json({message: e.message})
        }
    }
}

module.exports = new LinkController()