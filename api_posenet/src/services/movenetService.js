import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
//webgl não irá funiconar para node
//import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import * as jpeg from 'jpeg-js';
import JSONPrettyPrinter from '../util/json/jsonPrettyPrinter';

/*
Dev
import JSONPrettyPrinter from '../util/json/jsonPrettyPrinter.js';
*/
export default class MovenetService{
    
    async poseDetection(poseDetectionRequest){
        //await tf.setBackend('cpu');
        await tf.ready();
        tf.engine().startScope();//início do escopo

        const buffImage = new Buffer.from(poseDetectionRequest.base64string, 'base64');
        /*Segunda opção de conversão base64-buffer
        const image_00 = tf.util.encodeString(poseDetectionRequest.base64string, 'base64');
        e o pacote 'base64-to-tensor
        */

        //Abordagem sem o tfjs-node. Conversão para imagem utilizando o offset
        const imageDecoded = jpeg.decode(buffImage, {useTArray: true});
        //console.log(`Shape imageDecode: width: ${imageDecoded.width}, height: ${imageDecoded.height}`)
        //retirar o canal alpha
        let buffer = new Uint8Array(imageDecoded.width * imageDecoded.height * 3);
        let offset = 0;  // offset into original data. Percorrer o dado original.
        for (let i = 0; i < buffer.length; i += 3) {
            buffer[i] = imageDecoded.data[offset];
            buffer[i + 1] = imageDecoded.data[offset + 1];
            buffer[i + 2] = imageDecoded.data[offset + 2];
            offset += 4;
        }
        //converter buffer para tensor3d
        let tensor_original = tf.tensor3d(
            buffer, 
            [imageDecoded.height, imageDecoded.width, 3],
            "int32"
        );
        //console.log(`Shape tensor_00: ${tensor_original.shape}`)
        
        // [newHeight, newWidth]
        const tensor_entry = tf.image.resizeBilinear(
            tensor_original,
            [
                poseDetectionRequest.getDeviceResolution().height,
                poseDetectionRequest.getDeviceResolution().width
            ]
        );
        //console.log(`Shape de entrada: ${tensor_entry.shape}`);
        
        /*A configuração do tipo do modelo movenet também não é obrigatória. Mas para efeitos da API
        essa configuração será exigida*/
        let moveNetType = null;
        switch (poseDetectionRequest.movenetConfig.getModelType()) {
            case "singlepose_lightning":
                moveNetType = poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING;
            case "singlepose_thunder":
                moveNetType = poseDetection.movenet.modelType.SINGLEPOSE_THUNDER;
            case "multipose_lightning":
                moveNetType = poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING;
        }

        let detectorConfig = {
            modelType: moveNetType
        }

        if(poseDetectionRequest.movenetConfig.getEnableSmoothing() != null){
            detectorConfig.enableSmoothing = poseDetectionRequest.movenetConfig.getEnableSmoothing();
        }

        if(poseDetectionRequest.movenetConfig.getModelUrl() != null){
            detectorConfig.modelUrl = poseDetectionRequest.movenetConfig.getModelUrl();
        }

        if(poseDetectionRequest.movenetConfig.getMinPoseScore() != null){
            detectorConfig.minPoseScore = poseDetectionRequest.movenetConfig.getMinPoseScore();
        }

        if(poseDetectionRequest.movenetConfig.getMultiPoseMaxDimension() != null){
            detectorConfig.multiPoseMaxDimension = poseDetectionRequest.movenetConfig.getMultiPoseMaxDimension();
        }

        if(poseDetectionRequest.movenetConfig.getEnableTracking() != null){
            detectorConfig.enableTracking = poseDetectionRequest.movenetConfig.getEnableTracking();
        }

        if(poseDetectionRequest.movenetConfig.getTrackerType() != null){
            detectorConfig.trackerType = poseDetectionRequest.movenetConfig.getTrackerType();
        }

        if(poseDetectionRequest.movenetConfig.getTrackerConfig() != null){
            detectorConfig.trackerConfig = poseDetectionRequest.movenetConfig.getTrackerConfig();
        }

        //instanciar detector/rede
        const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
        
        //Fazer predição
        const pose = await detector.estimatePoses(tensor_entry);

        detector.dispose();
        tf.engine().endScope();//fim do escopo
        
        return this.formatResponse(pose[0]);
    }

    async getAdjacentKeyPoints(keypoints){
        
    }

    formatResponse(pose){
        let formated_keypoints = [];
        Object.keys(pose['keypoints']).forEach(key =>{
            console.log(key);
            formated_keypoints.push({
                'position':{
                    'y': pose['keypoints'][key].y,
                    'x': pose['keypoints'][key].x
                },
                'part': pose['keypoints'][key].name,
                'score': pose['keypoints'][key].score
            })
        })

        const formated_pose = {'score': pose['score'],'keypoints': formated_keypoints}
        
        return formated_pose;
    }
}