import { IsNotEmpty, IsString } from 'class-validator';

export class PhoneListDTO {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    customerName: string;
}