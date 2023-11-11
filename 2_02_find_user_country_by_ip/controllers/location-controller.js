const ipService = require("../service/ip-service");
const fs = require("fs");
const readline = require("readline");
const fileService = require("../service/file-service");
const NotFoundError = require("../excptions/not-found-error");


class LocationController {
    findLocation(req, res){
        let isFound = false
        try {
            const {ip} = req.body
            const readStream = fs.createReadStream(process.env.FILE_PATH, 'utf8');
            const rl = readline.createInterface({
                input: readStream,
                crlfDelay: Infinity,
            })
            rl.on('line', (line) => {
                const lineObj = fileService.parseCSV(line)
                if(ipService.isInRange(ip, lineObj.from, lineObj.to)){
                    isFound = true
                    return res.json({country: lineObj.country,
                        addressRange:ipService.addressRange(lineObj.from, lineObj.to)})
                }
            })
            rl.on('close', () => {
                if (!isFound)
                    throw new NotFoundError('Country is not found')
            })
        }catch (e) {
            res.status(e.status || 500).json({message: e.message || 'Something went wrong'})
        }
    }
}


module.exports = new LocationController()