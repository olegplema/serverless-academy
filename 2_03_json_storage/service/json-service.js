const pool = require("../db/pool.js");
const CustomError = require('../exceptions/custom-error.js')

class JsonService {
    async putJson(path, json){
        const foundJson = await pool.query('SELECT * FROM JSONs WHERE json_path=$1',[path])

        if (foundJson.rows[0]){
            throw CustomError.WayIsOccupied('This path is already occupied')
        }

        await pool.query('INSERT INTO JSONs (json_path, json) VALUES ($1, $2)', [path, json])
    }

    async getJson(path){
        const json = await pool.query('SELECT * FROM JSONs WHERE json_path=$1',[path])

        if (!json.rows[0]){
            throw CustomError.JsonNotFoundError('Json is not found')
        }

        return json.rows[0].json
    }
}

module.exports = new JsonService()