export default class PosenetBodyTypeError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'PosenetBodyTypeError';
        this.status = status;
    }
}