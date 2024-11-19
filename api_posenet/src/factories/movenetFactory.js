import MovenetService from "../services/movenetService.js"

const generateMovenetInstance = () => {
    return new MovenetService()
}

export {
    generateMovenetInstance
}