import { IsEmail, IsStrongPassword } from "class-validator";

export default class LoginUserDto {
    @IsEmail()
    email: string;
        
    @IsStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 1
    })
    password: string;
}