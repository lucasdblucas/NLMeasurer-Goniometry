import AdminSDK from './firebaseSDK/adminSDK.js';

export default class FireBaseRepository {
    constructor() {
        this.adminSDK = new AdminSDK();
        this.adminApp = this.#connectionFireBase();
    }

    #connectionFireBase(){
        const adminApp = this.adminSDK.initializeAppAdmin();
        return adminApp;
    }

    async authIdToken(token){    
        const ret = await this.adminSDK.authIdTokenAdmin(token, this.adminApp);
        return ret;
    }

    async getCustomToken(uid){
        const customToken = await this.adminSDK.getCustomToken(uid, this.adminApp);
        return customToken;
    }
}