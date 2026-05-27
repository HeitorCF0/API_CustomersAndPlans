import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AdressListDTO {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    customerId: number;

    @IsString()
    street: string;

    @IsString()
    number: string;

    @IsString()
    neighborhood: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsString()
    cep: string;

    @IsString()
    complement: string;

    customerName: string;
}