


class IpService{
    ipToNumber(ip){
        return ip.split('.').reduce((accum, value) => accum * 256 + Number(value) , 0)
    }

    isInRange(ip, from, to){
        const ipNum = this.ipToNumber(ip)
        return ipNum >= from && ipNum <= to
    }

    numberToIp(num){
        const octets = num.toString(2).padStart(32, '0').match(/.{8}/g)
        return octets.map(octet => parseInt(octet, 2)).join('.')
    }

    addressRange(from, to){
        return `${this.numberToIp(from)} - ${this.numberToIp(to)}`
    }
}

module.exports = new IpService()