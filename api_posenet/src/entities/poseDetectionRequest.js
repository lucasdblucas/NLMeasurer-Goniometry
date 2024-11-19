import { randomUUID } from "crypto"
import PosenetConfig from "./posenetConfig.js"

export default class PoseDetectionRequest {
    constructor ({
        base64string, 
        mobileNetMultiplier, 
        poseNetArchitecture, 
        poseNetOutputStride, 
        poseNetQuantBytes, 
        poseNetInputResolution,
        poseNetDeviceResolution
    }){
        this.id = randomUUID()
        this.base64string = base64string
        this.posenetConfig = new PosenetConfig(
            mobileNetMultiplier,
            poseNetArchitecture,
            poseNetOutputStride,
            poseNetQuantBytes, 
            poseNetInputResolution,
            poseNetDeviceResolution
        )
    }
}