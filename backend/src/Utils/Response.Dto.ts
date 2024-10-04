export default class ResponseDto {

    constructor( 
        public message: string,
        public ok: boolean,
        public result: any,
    ) {}

}