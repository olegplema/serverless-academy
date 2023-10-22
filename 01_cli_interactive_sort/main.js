const readline = require('readline')
const handlers = require("./handlers");

const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    }
)

let line

function handleOption(answer){
    switch (answer.trim()) {
        case "1":
            console.log(handlers.sortStrings(line))
            break
        case "2":
            console.log(handlers.sortNumbers(line))
            break
        case "3":
            console.log(handlers.sortNumbers(line, false))
            break
        case "4":
            console.log(handlers.sortByLength(line))
            break
        case "5":
            console.log(handlers.uniqueWords(line))
            break
        case "6":
            console.log(handlers.uniqueValues(line))
            break
        case "exit":
            console.log('Good bye!')
            process.exit()
    }
}

async function getOption(){
    const query = '1 - Sort words alphabetically\n' +
        '2 - Show numbers from lesser to greater\n' +
        '3 - Show numbers from bigger to smaller\n' +
        '4 - Display words in ascending order by number of letters in the word\n' +
        '5 - Show only unique words\n' +
        '6 - Display only unique values from the set of words and numbers entered by the user\n' +
        'exit - Exit program\n' + 'Select number (1 - 6): '
    return new Promise(resolve =>
        rl.question(query,  answer => {
            resolve(answer)
        })
    )
}

(async () => {
    while (true){
        await new Promise(resolve => {
            rl.question('Enter words or digits: ', answer => {
                resolve(answer.split(' '))
            })
        }).then(a => line = a)
        const option = await getOption()
        handleOption(option)
    }
})()