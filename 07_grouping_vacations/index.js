const fs = require('fs')
const path = require('path')

const readFile = () => {
    const json = fs.readFileSync(path.join('.', 'data.json'),{encoding:'utf8'})
    return JSON.parse(json)
}

const createVacationObject = (obj) => ({startDay: obj.startDate, endDate: obj.endDate})

const createUserObject = (obj) => {
    return {
        userName: obj.user.name,
        userId: obj.user._id,
        vacations: [
            createVacationObject(obj)
        ]
    }
}

const addObject = (data, obj) => {
    const foundObj = data.find(o => o.userId === obj.user._id)

    if (foundObj)
        foundObj.vacations.push(createVacationObject(obj))
    else data.push(createUserObject(obj))
}

const start = () => {
    const vacations = readFile()
    const data = []

    vacations.forEach(vacation => {
        addObject(data, vacation)
    })

    console.log(data)
    fs.writeFile(path.join('.', 'out.json'), JSON.stringify(data,null,2),(err) => {
        if(err)
            console.log(err)
    })
}

start()