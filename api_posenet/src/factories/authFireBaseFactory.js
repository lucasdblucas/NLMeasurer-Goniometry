import AuthFireBaseService from "../services/authFireBaseService.js"
import FireBaseRepository from "../repositories/fireBaseRepository.js"

const generateInstanceAuthFireBase = () => {
    const fireBaseRepository = new FireBaseRepository();
    const authFireBaseService = new AuthFireBaseService({
        fireBaseRepository
    })

    return authFireBaseService;
}

export {
    generateInstanceAuthFireBase
}