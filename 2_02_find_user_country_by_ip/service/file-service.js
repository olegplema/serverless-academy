const ipService = require('./ip-service')


class FileService{
    parseCSV(line){
        const lineSplit = line.split(',')
        return {
            from: Number(this.removeFirstAndLast(lineSplit[0])),
            to: Number(this.removeFirstAndLast(lineSplit[1])),
            country:this.removeFirstAndLast(lineSplit[3])
        }
    }

    removeFirstAndLast(str) {
        return str.substring(1, str.length - 1);
    }
}

module.exports = new FileService()