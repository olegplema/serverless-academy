const pool = require('../db/pool.js')
const bcrypt = require('bcryptjs')
const tokenService = require('./token-service.js')

class AuthService {
    async register(email,password){
        const foundUser = await pool.query('SELECT * FROM users WHERE email = $1',[email])

        if (foundUser.rows[0]){
            throw new Error('User with similar email already exists')
        }

        const hashedPassword = bcrypt.hashSync(password, 10)
        await pool.query('INSERT INTO users (email,password) VALUES ($1,$2)',[email, hashedPassword])
        const user = await pool.query('SELECT * from users WHERE email=$1',[email])
        const {refreshToken, accessToken} = tokenService.generateTokens(user.rows[0])
        await tokenService.saveToken(user.rows[0].id, refreshToken)
        return {id: user.rows[0].id, refreshToken, accessToken}
    }

    async login(email, password){
        const user = await pool.query('SELECT * FROM users WHERE email=$1',[email])
        if (!user.rows[0]){
            throw new Error('User is not found')
        }
        const isPassword = bcrypt.compareSync(password, user.rows[0].password)

        if (!isPassword){
            throw new Error('Password is not valid')
        }
        const {accessToken, refreshToken} = tokenService.generateTokens(user.rows[0])
        await tokenService.saveToken(user.rows[0].id, refreshToken)

        return {id:user.rows[0].id, refreshToken, accessToken}
    }
}

module.exports = new AuthService()