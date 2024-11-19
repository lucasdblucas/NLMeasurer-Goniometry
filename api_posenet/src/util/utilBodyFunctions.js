import { 
    ARCHITECTURE_TYPES,
    OUTPUT_STRIDE_TYPES,
    MULTIPLIER_TYPES,
    QUANT_BYTES_TYPES,
    ERROR_MULTIPLIER_TYPES,
    ERROR_ARCHITECTURE_TYPES,
    ERROR_OUTPUT_STRIDE_TYPES,
    ERROR_QUANT_BYTES_TYPES,
    ERROR_OUTPUT_STRIDE_RESNET,
    ERROR_OUTPUT_STRIDE_MULT,
} from './util.js';
import PosenetBodyTypeError from './posenetBodyTypeError.js';

function fildsCheck(item){
    //Fields body verification.
    //if fields are corrects
    if (!ARCHITECTURE_TYPES.includes(item.poseNetArchitecture)){
        throw new PosenetBodyTypeError(ERROR_ARCHITECTURE_TYPES, 400);
    } else {
        if (item.poseNetArchitecture === ARCHITECTURE_TYPES[0]){//MobileNetV1
            if (!MULTIPLIER_TYPES.includes(item.mobileNetMultiplier)){
                throw new PosenetBodyTypeError(ERROR_MULTIPLIER_TYPES, 400);
            }
        }
        if (!OUTPUT_STRIDE_TYPES.includes(item.poseNetOutputStride)){
            throw new PosenetBodyTypeError(ERROR_OUTPUT_STRIDE_TYPES, 400);
        }
        if (!QUANT_BYTES_TYPES.includes(item.poseNetQuantBytes)){
            throw new PosenetBodyTypeError(ERROR_QUANT_BYTES_TYPES, 400);
        }
    }
}

function configurationCheck(item){
    if (item.poseNetArchitecture === ARCHITECTURE_TYPES[1]){//ResNet50
        if (item.poseNetOutputStride === 8){
            throw new PosenetBodyTypeError(ERROR_OUTPUT_STRIDE_RESNET, 400);
        }
    }else {//MobileNetV1
        if (item.poseNetOutputStride == 32 && item.mobileNetMultiplier !== 1.0){
            throw new PosenetBodyTypeError(ERROR_OUTPUT_STRIDE_MULT, 400);
        }
    }
}

export{
    fildsCheck,
    configurationCheck
}