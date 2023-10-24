const inquirer = require("inquirer");

module.exports = () => {
    return inquirer.prompt([
        {
            type: "confirm",
            name: "search",
            message: "Do you want to search user by name?:",
        },
        {
            type: "input",
            name: "name",
            message: "Enter the name to search for:",
            when: (answer) => answer.search
        }
    ])
}