const addUserPrompt = require('./addUserPrompt.js')
const findUserPrompt = require('./findUserPrompt.js')
const database = require('./database.js')

async function start (){

    while (addUserPrompt.flag){
        const user = await addUserPrompt.addUser()
        if (user.name){
            if (user.age === '')
                delete user.age
            database.addUser(user)
        }
    }

    const userToFind = await findUserPrompt()

    if (typeof userToFind.name === 'undefined')
        process.exit()

    const foundUser = database.findUser(userToFind.name);

    if (foundUser) {
        console.log("User found:");
        console.log(foundUser);
    } else {
        console.log("No user with that name found.");
    }

    process.exit()
}

start()

