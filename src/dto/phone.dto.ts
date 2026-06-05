import { IsNotEmpty, IsString } from 'class-validator';

export class PhoneCreateDTO {
    @IsNotEmpty()
    @IsString()
    customerId: string;

    @IsNotEmpty()
    @IsString()
    phone: string;
}

export class PhoneListDTO{
    id: string;
    phone: string;
    customerId: string;
    customerName: string;
}

export class PhoneUpdateDTO {
    @IsNotEmpty()
    @IsString()
    phone: string;
}