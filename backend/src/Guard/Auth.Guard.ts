import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import AuthService from "../Auth/Auth.Service";

@Injectable()
export default class AuthGuard implements CanActivate{

    constructor (

        private readonly AuthService: AuthService,

    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        try {

            const request = context.switchToHttp().getRequest();

            const {authorization} = request.headers;

            const data = this.AuthService.verifyToken(authorization);

            request.token = data

            return true;

        }   catch {
            
            return false;

        }


    }

}