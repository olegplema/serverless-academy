const inquirer = require("inquirer");

const validationCallback = (answer) => {
    if (answer.trim() === ''){
        addUserPrompt.flag = false
    }
    return true
}


const addUserPrompt = {
    flag:true,
    addUser: function () {
            return new Promise((resolve) => {
            const prompt = inquirer.prompt([
                {
                    type:'input',
                    name: 'name',
                    message: "Enter the user's name. To cancel press ENTER: ",
                    validate: validationCallback
                },
                {
                    type:'rawlist',
                    name: 'gender',
                    message: "Choose your gender:",
                    choices:['male', 'female'],
                    when:() => this.flag
                },
                {
                    type:'input',
                    name: 'age',
                    message: "Enter your age. To cancel press ENTER:",
                    validate:validationCallback,
                    when:() => this.flag
                },
            ])
            resolve(prompt)
        })
    }
}

module.exports = addUserPrompt