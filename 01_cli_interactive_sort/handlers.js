
const utils = require('./utils')

module.exports = {
    sortStrings(array){
        const strings = utils.getStrings(array)
        return strings.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    },

    sortNumbers(array, ascending = true){
        const strings = utils.getNumbers(array)
        return strings.map(s => Number(s)).sort((a, b) => {
            if (ascending)
                return a - b
            else return b - a
        });
    },

    uniqueWords(array){
        const strings = utils.getStrings(array)
        // return [...new Set(strings)]
        return this.uniqueValues(strings)
    },

    uniqueValues(strings){
        const newArr = []
        for (let i = 0; i < strings.length; i++) {
            if (!newArr.some(el => el.toLowerCase() === strings[i].toLowerCase())) {
                newArr.push(strings[i])
            }
        }

        return newArr
    },

    sortByLength(array){
        const strings = utils.getStrings(array)
        return strings.sort((a, b) => a.length - b.length)
    }
}