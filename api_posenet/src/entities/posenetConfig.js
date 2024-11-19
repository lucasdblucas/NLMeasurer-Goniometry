export default class PosenetConfig {
    constructor (
        mobileNetMultiplier, 
        poseNetArchitecture, 
        poseNetOutputStride, 
        poseNetQuantBytes, 
        poseNetInputResolution,
        poseNetDeviceResolution
    ){
        this.mobileNetMultiplier = mobileNetMultiplier;
        this.poseNetArchitecture = poseNetArchitecture;
        this.poseNetOutputStride = poseNetOutputStride;
        this.poseNetQuantBytes = poseNetQuantBytes;
        this.poseNetInputResolution = poseNetInputResolution;
        this.poseNetDeviceResolution = poseNetDeviceResolution
    }

    getMobileNetMultiplier(){
        return this.mobileNetMultiplier
    }

    getPoseNetArchitecture(){
        return this.poseNetArchitecture
    }

    getPoseNetOutputStride(){
        return this.poseNetOutputStride
    }

    getPoseNetQuantBytes(){
        return this.poseNetQuantBytes
    }

    getPoseNetInputResolution(){
        return this.poseNetInputResolution;
    }

    getPoseNetDeviceResolution(){
        return this.poseNetDeviceResolution;
    }
}