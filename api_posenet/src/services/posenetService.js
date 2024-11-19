import * as posenet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs-node';
import '@tensorflow/tfjs-node';
import * as fs from 'fs';

export default class PosenetService{
    
    async poseDetection(poseDetectionRequest){

        // console.log(poseDetectionRequest);

        tf.backend;
        await tf.ready();
        tf.engine().startScope();//início do escopo
        
        // const widthDevice = poseDetectionRequest.posenetConfig.getPoseNetDeviceResolution().width;
        // const heightDevice = poseDetectionRequest.posenetConfig.getPoseNetDeviceResolution().height; 

        //tensor
        const entry_tensor = tf.node.decodeImage(poseDetectionRequest.base64string, 3, "int32", false);
            
        // save image from tensor test
        // this.saveImageFromTensor(entry_tensor);

        const inputResolution = {
            width: poseDetectionRequest.posenetConfig.poseNetInputResolution.width, 
            height: poseDetectionRequest.posenetConfig.poseNetInputResolution.height
        }

        //instanciar detector/rede
        let net;
        if (poseDetectionRequest.posenetConfig.poseNetArchitecture === "MobileNetV1"){
            net = await posenet.load({
                architecture: poseDetectionRequest.posenetConfig.poseNetArchitecture,
                outputStride: poseDetectionRequest.posenetConfig.poseNetOutputStride,
                inputResolution: inputResolution,
                quantBytes: poseDetectionRequest.posenetConfig.poseNetQuantBytes,
                multiplier: poseDetectionRequest.posenetConfig.mobileNetMultiplier
            });
        }
        if (poseDetectionRequest.posenetConfig.poseNetArchitecture === "ResNet50"){
            net = await posenet.load({
                architecture: poseDetectionRequest.posenetConfig.poseNetArchitecture,
                outputStride: poseDetectionRequest.posenetConfig.poseNetOutputStride,
                inputResolution: inputResolution,
                quantBytes: poseDetectionRequest.posenetConfig.poseNetQuantBytes
            });
        }

        //make prediction
        const pose = await net.estimateSinglePose(entry_tensor, {
            flipHorizontal: false
        });

        //dispose tensors
        tf.dispose(entry_tensor);
        // tf.dispose(tensor_original);
        tf.dispose(net)
        // tf.engine().tidy tentar depois caso não dê certo posedetection-01
        
        console.log(`Memory use: ${JSON.stringify(tf.memory())}`);
        tf.engine().endScope();//fim do escopo
        
        return pose;
    }

    async getAdjacentKeyPoints(keypoints){
        const adj_points = posenet.getAdjacentKeyPoints(keypoints, 0.01);
        return adj_points;
    }

    saveImageFromTensor(tensor){
        tf.node.encodeJpeg(tensor).then((f) => {
            fs.writeFileSync("image-from-tensor.jpg", f);
        });
    }
    
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
}