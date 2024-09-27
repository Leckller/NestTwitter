import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator((data: string, context: ExecutionContext) => {

    const request = context.switchToHttp().getRequest();

    if(!request.user) {

        throw new BadRequestException("Você precisa estar logado para realizar esta operação");

    }

    if(data) {

        return request.user[data];

    }

    return request.user;

})