import BlazeposeService from "../services/blazeposeService.js"

const generateBlazeposeInstance = () => {
    return new BlazeposeService();
}

export {
    generateBlazeposeInstance
}