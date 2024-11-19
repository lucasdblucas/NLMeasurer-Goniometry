export default class AuthFireBaseService{

    constructor({fireBaseRepository}){
        this.fireBaseRepository = fireBaseRepository;
    }
    
    async authIdToken(token){
        const userRecord = await this.fireBaseRepository.authIdToken(token); 
        return userRecord;
    }

    async loginUser(email, password){
        const token = await this.fireBaseRepository.loginUser(email, password);
        return token;
    }

    async getCustomToken(uid){
        const customToken = await this.fireBaseRepository.getCustomToken(uid);
        return customToken;
    }
}