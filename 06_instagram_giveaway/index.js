const fs = require('fs')
const readline = require('readline')
const path = require("path");

//1

const files = []

const readFiles = async () => {
    for (let i = 0; i < 20; i++){
        const fileData = await getUniqueUsernames(path.join('files',`out${i}.txt`))
        files.push(fileData)
    }
}

const getUniqueUsernames = async (filename) => {
    const usernames = new Set()
    const stream = fs.createReadStream(filename)
    const rl = readline.createInterface({
            input: stream
    })

    for await (const username of rl){
        usernames.add(username)
    }

    return usernames
}

const uniqueValues = async () => {
    const usernames = new Set()

    files.forEach(file => {
        for (const el of file)
            usernames.add(el)
    })

    return usernames.size
}

const existInAtLeastTen = async () => {
    const map = new Map()

    files.forEach(file => {
        for (const el of file){
            if (map.has(el)){
                map.set(el, map.get(el) + 1)
            }else map.set(el, 1)
        }
    })

    let count = 0

    for (const [_,value] of map.entries()){
        if (value >= 10)
            count++
    }

    return count
}

const existInAllFiles = async () => {
    let set = new Set()
    const first = files[0]
    for (const username of first) {
        set.add(username)
    }
    for (let i = 1; i < files.length; i++){
        const usernames = files[i]
        set = new Set([...set].filter(username => usernames.has(username)))
    }

    return set.size
}


const start = async () => {
    const start = new Date()
    await readFiles()
    const unique = await uniqueValues()
    const ex10 = await existInAtLeastTen()
    const exAll = await existInAllFiles()
    const finish = new Date()
    console.log('Unique usernames: ' + unique)
    console.log('Exist at least in 10 files: ' + ex10)
    console.log('Exist in all files: ' + exAll)
    console.log('Time(s): ' + (finish - start)/1000)
}

start()