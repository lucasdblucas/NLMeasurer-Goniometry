export default class MovenetConfig {
    constructor (
        movenetType,
        deviceResolution,
        enableSmoothing, 
        modelUrl, 
        minPoseScore, 
        multiPoseMaxDimension,
        enableTracking,
        trackerType,
        trackerConfig
        ){            
            this.movenetType = movenetType;
            this.deviceResolution = deviceResolution;
            this.enableSmoothing = enableSmoothing;
            this.modelUrl = modelUrl;
            this.minPoseScore = minPoseScore;
            this.multiPoseMaxDimension = multiPoseMaxDimension;
            this.enableTracking = enableTracking;
            this.trackerType = trackerType;
            this.trackerConfig = trackerConfig
    }

    getModelType(){
        return this.movenetType;
    }
    getDeviceResolution(){
        return this.deviceResolution;
    }
    getEnableSmoothing(){
        return this.enableSmoothing;
    }
    getModelUrl(){
        return this.modelUrl;
    }
    getMinPoseScore(){
        return this.minPoseScore;
    }
    getMultiPoseMaxDimension(){
        return this.multiPoseMaxDimension;
    }
    getEnableTracking(){
        return this.enableTracking;
    }
    getTrackerType(){
        return this.trackerType;
    }
    getTrackerConfig(){
        return this.trackerConfig;
    }
}