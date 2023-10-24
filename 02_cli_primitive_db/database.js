const fs = require('fs')

const addUser = (user) => {
    fs.appendFile(process.env.FILE_PATH,  JSON.stringify(user) + '\n',(err) => {
        if (err)
            console.log('Something went wrong')
    })
}

const readFile = () => {
    return fs.readFileSync(process.env.FILE_PATH).toString().split('\n').filter(el => el !== '')
}

const findUser = (username) => {
    let users
    if (fs.existsSync(process.env.FILE_PATH)){
        users = readFile()
        return users.find(user => JSON.parse(user).name.toLowerCase() === username.toLowerCase())
    }else return null
}

module.exports = {addUser, findUser}