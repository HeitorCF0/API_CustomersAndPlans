import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RowDataPacket } from "mysql2";

export interface AddressAndId extends RowDataPacket {
    id: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
    complement: string;
}

export class AddressCreateDTO {
    @IsNotEmpty()
    @IsString()
    customerId: string;

    @IsOptional()
    @IsString()
    street?: string;

    @IsOptional()
    @IsString()
    number?: string;

    @IsOptional()
    @IsString()
    neighborhood?: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsOptional()
    @IsString()
    cep?: string;

    @IsOptional()
    @IsString()
    complement?: string;
}

export class AddressListDTO {
    id: string;
    customerId: string;
    customerName: string;
    street?: string;
    number?: string;
    neighborhood?: string;
    city: string;
    state: string;
    cep?: string;
    complement?: string;
}

export class AddressUpdateDTO {
    @IsOptional()
    @IsString()
    street?: string;

    @IsOptional()
    @IsString()
    number?: string;

    @IsOptional()
    @IsString()
    neighborhood?: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsOptional()
    @IsString()
    cep?: string;

    @IsOptional()
    @IsString()
    complement?: string;
}