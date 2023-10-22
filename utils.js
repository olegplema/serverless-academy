
module.exports = {
    getNumbers(array){
        return array.filter(e => e.toLowerCase() === e.toUpperCase())
    },

    getStrings(array){
        return array.filter(e => e.toLowerCase() !== e.toUpperCase())
    }
}