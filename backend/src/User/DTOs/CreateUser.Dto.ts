import { IsEmail, IsString, IsStrongPassword } from "class-validator";
import { UserType } from "src/types";

export default class CreateUserDto implements Partial<UserType>{

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

    @IsString()
    address: string;
    
    @IsString()
    banner: string;
    
    @IsString()
    name: string;
    
    @IsString()
    photo: string;

}