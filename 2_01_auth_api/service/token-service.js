const jwt = require('jsonwebtoken')
const pool = require('../db/pool.js')

class TokenService {
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN,{expiresIn: '60m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN,{})
        return {accessToken,refreshToken}
    }

    validateAccessToken(accessToken){
        try{
            const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN)
            return decoded
        }catch (e) {
            return null
        }
    }

    validateRefreshToken(refreshToken){
        try{
            const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN)
            return decoded
        }catch (e) {
            return null
        }
    }

    async saveToken(user_id, refreshToken){
        const token = await pool.query('SELECT * FROM tokens WHERE user_id=$1',[user_id])

        if (token.rows[0]){
            return await pool.query('UPDATE tokens SET token_value=$1 WHERE user_id=$2',[refreshToken,user_id])
        }
        return await pool.query('INSERT INTO tokens (user_id,token_value) VALUES ($2,$1)',[refreshToken,user_id])
    }

    async refresh(refreshToken){
        const tokenInfo = this.validateRefreshToken(refreshToken)
        if (!tokenInfo){
            throw new Error('User is unauthorized')
        }
        const token = await pool.query('SELECT * FROM tokens WHERE user_id=$1',[tokenInfo.id])
        const user = await pool.query('SELECT * FROM users WHERE id=$1',[tokenInfo.id])

        if (!token.rows[0]){
            throw new Error('User is unauthorized')
        }

        const {accessToken, newRefreshToken} = this.generateTokens(user.rows[0])
        await this.saveToken(user.rows[0].id, newRefreshToken)
        return {id: user.rows[0].id, refreshToken:newRefreshToken, accessToken}
    }

}

module.exports = new TokenService()