import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../modelo/user';

export class UserDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;
}