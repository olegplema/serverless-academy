const jsonService = require('../service/json-service.js')


class JsonController {
    async getJson(req, res){
        try {
            const path = req.params.json_path

            const json = await jsonService.getJson(path)

            return res.send(json)
        }catch (e) {
            return res.status(e.status || 500).send({message:e.message || 'Internal server error'})
        }
    }

    async putJson(req, res){
        try {
            const path = req.params.json_path
            const json = req.body

            await jsonService.putJson(path, json)

            return res.send({message:"success"})
        }catch (e) {
            return res.status(e.status || 500).send({message:e.message || 'Internal server error'})
        }
    }
}

module.exports = new JsonController()