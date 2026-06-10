import { IsEnum, IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
import { UserRole } from '../model/user';

export class UserAllAtributes{
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
}

export class UserCreateDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;
}

export class UserUpdateDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}

export class UserSearchAllDTO {
    id: string
    name: string
    email: string
    role: string
}

export class UserSearchByIdDTO {
    id: string
    name: string
    email: string
    role: string
    createdAt: Date
}

export class UserLoginDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}