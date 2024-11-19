import { parse } from 'node:url';
import { routes } from './routes/poseRoute.js';
import { DEFAULT_HEADER } from './util/util.js';
import PosenetBodyTypeError from './util/posenetBodyTypeError.js';
import { generateInstanceAuthFireBase } from './factories/authFireBaseFactory.js';
import WorkerPool from './util/threads/threadsPool.js';
import os from 'os';
import path from 'path';

console.log(os.cpus());
const pool = new WorkerPool(os.cpus().length, path.resolve(__dirname, './util/threads/worker.js'));
const authFireBaseService = generateInstanceAuthFireBase();
const poseDetectionRoutes = routes({
   
    authFireBaseService,
    pool
})

const allRoutes = {

    ...poseDetectionRoutes,

    default: (request, response) => {
       
        response.writeHead(404, DEFAULT_HEADER)
        response.write('uuuuuups, not found')
        
        response.end()
    }
}

function handler (request, response) {
    const{
        url,
        method
    } = request
    
    const {
        pathname
    } = parse(url, true)
    
    const key = `${pathname}:${method.toLowerCase()}`
    const chosen = allRoutes[key] || allRoutes.default

    return Promise.resolve(chosen(request, response)).catch(handlerError(response))
}

function handlerError (response){
    return error => {
        let datetime = new Date();
        console.log(`\n\nLast Erro - ${datetime}`);

        if (error instanceof PosenetBodyTypeError){
            response.writeHead(error.status, DEFAULT_HEADER);
        
        } else {
            response.writeHead(404, DEFAULT_HEADER);
        
        }
  
        response.write(JSON.stringify({
            error: error.message,
            name: error.name,
        }))
        response.end();
    }
}

export default handler