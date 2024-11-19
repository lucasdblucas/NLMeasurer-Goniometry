//Default Header
const DEFAULT_HEADER = {
    'content-type': 'application/json',
}
//Other headers type
/*    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH',
    'Access-Control-Max-Age': 2592000, //30 dias
    'Access-Control-Allow-Headers': '*',
}*/
//Hard Key
const HARD_KEY = "d237347086966cd2b08fb04705c9ab5ea123e45e57872dd9d952ce72edd41cec" //SHA256 - UFDPAR-UniversidadeFederaldoDeltadoParnaíba.MEZZI-TheBestAPP
//Possible Values
const ARCHITECTURE_TYPES = ["MobileNetV1", "ResNet50"];
const OUTPUT_STRIDE_TYPES = [8, 16, 32];
const MULTIPLIER_TYPES = [1.0, 0.75, 0.50];
const QUANT_BYTES_TYPES = [1, 2, 4];
//Errors
//401
const ERROR_NO_ACCESS = "You Don't Have Access!! Check your permitions.";
//400
const ERROR_MULTIPLIER_TYPES = "There is no such multiplier. Valide multipliers: [1.0, 0.75, 0.50]";
const ERROR_ARCHITECTURE_TYPES = "There is no such architecture. Valide architectures: [MobileNetV1, ResNet50]";
const ERROR_OUTPUT_STRIDE_TYPES = "There is no such output stride. Valide output strides: [8, 16, 32]";
const ERROR_QUANT_BYTES_TYPES = "There is no such quantity of bytes. Valide quantity of bytes: [1, 2, 4]";
//400
const ERROR_OUTPUT_STRIDE_RESNET = "Stride 16, 32 are supported for the ResNet architecture and stride 8, 16, 32 are supported for the MobileNetV1 architecture";
const ERROR_OUTPUT_STRIDE_MULT = " If you are using stride 32 you must set the multiplier to 1.0";
//400
const ERROR_UNHANDLEABLE_TYPE = 'Unhandleable Type';
//threads
const ERROR_POOL_THREAD_TODO = 'Internal Pool Threads Error - ToDo Type not found!!';
//Status
const STATUS_ERROR_NO_ACCESS = 401;

export {
    DEFAULT_HEADER,
    HARD_KEY, 
    ARCHITECTURE_TYPES,
    OUTPUT_STRIDE_TYPES,
    MULTIPLIER_TYPES,
    QUANT_BYTES_TYPES,
    ERROR_NO_ACCESS,
    ERROR_MULTIPLIER_TYPES,
    ERROR_ARCHITECTURE_TYPES,
    ERROR_OUTPUT_STRIDE_TYPES,
    ERROR_QUANT_BYTES_TYPES,
    ERROR_OUTPUT_STRIDE_MULT,
    STATUS_ERROR_NO_ACCESS,
    ERROR_OUTPUT_STRIDE_RESNET,
    ERROR_UNHANDLEABLE_TYPE,
    ERROR_POOL_THREAD_TODO
}