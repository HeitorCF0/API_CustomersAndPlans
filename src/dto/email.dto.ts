import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RowDataPacket } from "mysql2";

export class EmailListDTO {
    email: string;
    customerId: string;
    costumerName: string;
}

export class EmailCreateDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    customerId: string;
}

export class EmailUpdateDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export interface EmailAndId extends RowDataPacket {
    id: string;
    email:string
}