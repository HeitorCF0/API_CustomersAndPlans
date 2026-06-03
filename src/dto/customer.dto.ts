import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { customerStatus } from '../model/customer';


export class CustomersListDTO {
    id: string;
    name: string;
    status: string;
}

export class CustomerSearchByIdDTO {
    id: string;
    name: string;
    createdAt: Date;
    status: string;
}

export class CustomerCreateDTO {
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class CustomerUpdateDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEnum(customerStatus)
    status?: string;
}