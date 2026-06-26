import { IsNotEmpty, IsString } from 'class-validator';
import { RowDataPacket } from "mysql2";

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

export interface PhoneAndId extends RowDataPacket {
    id: string;
    email:string
}