export default class BlazeposeConfig {
    constructor (
        runtime,
        enableSmoothing,
        enableSegmentation,
        smoothSegmentation,
        blazeposeType,
        solutionPath
        ){            
            this.runtime = runtime;
            this.enableSmoothing = enableSmoothing;
            this.enableSegmentation = enableSegmentation;
            this.smoothSegmentation = smoothSegmentation;
            this.blazeposeType = blazeposeType;
            this.solutionPath = solutionPath;
    }


    getRuntime(){
        return this.runtime;
    }
    getEnableSmoothing(){
        return this.enableSmoothing;
    }
    getEnableSegmentation(){
        return this.enableSegmentation;
    }
    getSmoothSegmentation(){
        return this.smoothSegmentation;
    }
    getBlazeposeType(){
        return this.blazeposeType;
    }
    getSolutionPath(){
        return this.solutionPath;
    }
}