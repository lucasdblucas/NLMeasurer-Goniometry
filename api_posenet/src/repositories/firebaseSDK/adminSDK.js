import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export default class AdminSDK {

    initializeAppAdmin() {
        //console.log(process.env.FIRE_PRIVATE_KEY.replace(/\\n/g, '\n'));
        const adminApp = initializeApp({
            credential: cert({
                type: process.env.FIRE_TYPE,
                project_id: process.env.FIRE_PROJECT_ID,
                private_key_id: process.env.FIRE_PRIVATE_KEY_ID,
                private_key: process.env.FIRE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                client_email: process.env.FIRE_CLIENT_EMAIL,
                client_id: process.env.FIRE_CLIENT_ID,
                auth_uri: process.env.FIRE_AUTH_URI,
                token_uri: process.env.FIRE_TOKEN_URI,
                auth_provider_x509_cert_url: process.env.FIRE_AUTH_PROVIDER_X509_CERT_ERL,
                client_x509_cert_url: process.env.FIRE_CLIENT_X509_CERT_URL
            })
        }); 
        return adminApp;
    }

    async getCustomToken(uid, app){
        const adminAuth = getAuth(app);

        const customToken = await adminAuth.createCustomToken(uid)
            .then(token =>{
                return token;
            });
        return customToken;
    }

    async authIdTokenAdmin(token, app){
        const adminAuth = getAuth(app);

        const ret = await adminAuth.verifyIdToken(token)
            .then(decodedIdToken => {
                return adminAuth.getUser(decodedIdToken.uid)
                    .then(userRecord => {
                        const ret = {
                            userRecord: userRecord,
                            auth: true
                        }
                        return ret;
                    })
            });
        return ret;
    }
}
