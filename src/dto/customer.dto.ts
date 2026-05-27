import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class custumersListDTO {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    createdAt: string;
    
    @IsNotEmpty()
    @IsString()
    status: string;
}