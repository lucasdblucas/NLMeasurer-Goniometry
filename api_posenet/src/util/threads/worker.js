import { parentPort, threadId } from 'worker_threads';
import { generateInstance } from '../../factories/poseDetectionFactory.js';
import { ERROR_POOL_THREAD_TODO } from '../util.js'

parentPort.on('message', async (task) => {
    const posenetService = generateInstance();
    
    // console.log("trying"); printing strings woeks fine
    // console.log(task); printing objects inside worker doesn't work
    // console.log(data);
    // console.log(todo);
    
    switch (task.todo) {
        case 'posedetection':
            parentPort.postMessage(await posenetService.poseDetection(task.poseDetectionRequest));    
            break;
        case 'adj_points':
            parentPort.postMessage(await posenetService.getAdjacentKeyPoints(task.keypoints));
            break;
        default:
            throw new Error(ERROR_POOL_THREAD_TODO);
            break;
    }
    
});