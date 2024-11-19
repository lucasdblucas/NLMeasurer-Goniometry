import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
//webgl não irá funiconar para node
//import '@tensorflow/tfjs-backend-webgl';
//import '@tensorflow/tfjs-backend-cpu';
//import '@tensorflow/tfjs-backend-wasm';
import '@mediapipe/pose';
import * as jpeg from 'jpeg-js';
/*
Dev
import JSONPrettyPrinter from '../util/json/jsonPrettyPrinter.js';
*/
export default class BlazeposeService{

    // constructor(){
    //     this.navigator = new Navigator();
    // }

    async poseDetection(poseDetectionRequest){
        //await tf.setBackend('cpu');
        await tf.ready();
        const navigator = new Navigator();
        tf.engine().startScope();//início do escopo

        const buffImage = new Buffer.from(poseDetectionRequest.getBase64String(), 'base64');
        /*Segunda opção de conversão base64-buffer
        const image_00 = tf.util.encodeString(poseDetectionRequest.base64string, 'base64');
        e o pacote 'base64-to-tensor
        */

        //Abordagem sem o tfjs-node. Conversão para imagem utilizando o offset
        const imageDecoded = jpeg.decode(buffImage, {useTArray: true});
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
        
        //definir configuração e instanciar detector
        let detectorConfig = {
            runtime: 'mediapipe',
            solutionPath: '../../node_modules/@mediapipe/pose',
            enableSmoothing: false,
            modelType: poseDetectionRequest.blazeposeConfig.getBlazeposeType() //-->'lite', 'full', 'heavy'
        }

        if(poseDetectionRequest.blazeposeConfig.getEnableSmoothing() != null){
            detectorConfig.enableSmoothing = poseDetectionRequest.blazeposeConfig.getEnableSmoothing();
        }

        const detector = await poseDetection.createDetector(poseDetection.SupportedModels.BlazePose, detectorConfig);
        
        //Definir configuração da estimativa da pose
        const estimationConfig = {
            flipHorizontal: false
        };

        //Fazer predição utilizando a configuraçaõ setada anteriormente
        const pose =  await detector.estimatePoses(tensor_entry, estimationConfig);
        
        //liberar detector
        detector.dispose();
        tf.engine().endScope();//fim do escopo

        //formatar respostar e enviar ao cliente
        return pose[0];
    }

    async getAdjacentKeyPoints(keypoints){
        
        const pairs_adj = poseDetection.util.getAdjacentPairs(poseDetection.SupportedModels.PoseNet);

        let adj_points = []
        pairs_adj.forEach(pair => {
            adj_points.push([keypoints[pair[0]], keypoints[pair[1]]]);
        });

        return adj_points;
    }

    //Salvar as informações de confiança
    saveInfoPred(pred){

        let writeStream = fs.createWriteStream("predResults.csv", {encoding: "utf8", flags: "a+"});

        writeStream.write(`Grau de confianca Geral;\n`);
        writeStream.write(`${pred.score};\n`);
        
        let partsString = [];
        let confs = [];
        pred.keypoints.forEach(point => {
            partsString.push(`${point.part}`);
            confs.push(`${point.score}`);
        });

        writeStream.write(partsString.join(';') + '\n');
        writeStream.write(confs.join(';') + '\n');

        writeStream.end();
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
        
        /*desenvolviemento
        const printer = new JSONPrettyPrint();
        printer.printJSON(formated_pose);
        */

        return formated_pose;
    }
}