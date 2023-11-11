

class CustomError extends Error{
    constructor(message, status) {
        super(message)
        this.status = status
    }

    static JsonNotFoundError(message){
        return new CustomError(message, 404)
    }

    static WayIsOccupied(message){
        return new CustomError(message, 409)
    }
}

module.exports = CustomError