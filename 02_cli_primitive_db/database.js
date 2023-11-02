const fs = require('fs')

const filepath = './db.txt'

const addUser = (user) => {
    fs.appendFile(filepath,  JSON.stringify(user) + '\n',(err) => {
        if (err)
            console.log('Something went wrong')
    })
}

const readFile = () => {
    return fs.readFileSync(filepath).toString().split('\n').filter(el => el !== '')
}

const findUser = (username) => {
    let users
    if (fs.existsSync(filepath)){
        users = readFile()
        return users.find(user => JSON.parse(user).name.toLowerCase() === username.toLowerCase())
    }else return null
}

module.exports = {addUser, findUser}