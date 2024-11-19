import PosenetService from "../services/posenetService.js"

const generatePosenetInstance = () => {
    return new PosenetService()
}

export {
    generatePosenetInstance
}