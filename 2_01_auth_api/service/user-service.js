const pool = require("../db/pool");


class UserService{

    async getUser(user_id){
        const user = await pool.query('SELECT * FROM users WHERE id=$1',[user_id])
        return user.rows[0]
    }

}

module.exports = new UserService()