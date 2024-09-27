import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export default class AuthService {

    constructor (
        private readonly jwtService: JwtService,
    ) {}

    public async encrypt (text: string) {
        
        const salt = await bcrypt.genSalt();

        return await bcrypt.hash(text, salt)

    }

    public async compare (data: string, encrypted: string) {

        if(!await bcrypt.compare(data, encrypted)) {

            throw new UnauthorizedException("Email ou senha inválidos")

        }

        return true;

    }

    public createToken (payload: any, options: JwtSignOptions = {}) {

        return this.jwtService.sign(payload, {
            ...options,
        })

    }

    public verifyToken<T> (token: string, ): T {

        try {
            
            return this.jwtService.verify(token) as T;

        } catch (err) {

            throw new UnauthorizedException("Token inválido");

        }

    }

};