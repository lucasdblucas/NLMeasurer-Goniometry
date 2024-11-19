import PosenetService from "../services/posenetService.js"

const generateInstance = () => {
    return new PosenetService()
}

export {
    generateInstance
}