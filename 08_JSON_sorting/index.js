const endpoints = require('./endpoints.js')

const fetchEndpoint = async (url,counter = 0) => {
    if (counter >= 3)
        return null
    try {
        const response = await fetch(url)
        if (!response.ok)
            throw new Error()
        else
            return await response.json()
    }catch {
        return await fetchEndpoint(url, counter + 1)
    }

}

const logFail = (url) => {
    console.log('[Fail] ' + url + ': The endpoint is unavailable')
}

const logSuccess = (url, isDone) => {
    console.log('[Success] ' + url + ': isDone - ' + isDone ? 'True' : 'False')
}

const findIsDone = (obj) => {
    for (const key in obj){
        if (key === 'isDone'){
            return obj[key]
        }else {
            if (typeof obj[key] === 'object'){
                const next = findIsDone(obj[key])
                if (next)
                    return next
            }
        }
    }
    return null
}

const start = async () => {
    let trueIsDone = 0, falseIsDone = 0
    for (const endpoint of endpoints){
        const res = await fetchEndpoint(endpoints[0])
        if (!res)
            logFail(endpoint)
        else {
            const isDone = findIsDone(res)
            if (isDone)
                trueIsDone++
            else
                falseIsDone++
            logSuccess(endpoint, isDone)
        }
    }
    console.log('Found True values: ' + trueIsDone)
    console.log('Found False values: ' + falseIsDone)
}

start()