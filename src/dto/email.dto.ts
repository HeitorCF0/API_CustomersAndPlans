import { IsNotEmpty, IsString } from 'class-validator';

export class EmailListDTO {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    customerId: string;

    @IsNotEmpty()
    @IsString()
    costumerName: string;
    
}