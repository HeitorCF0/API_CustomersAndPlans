import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { customerStatus } from '../modelo/customer';

export class custumersListDTO {
    id: string;
    name: string;
    createdAt: string;
    status: string;
}

export class createCustomerDTO {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @Type(() => Date)
    createdAt: Date;

    @IsNotEmpty()
    @IsEnum(customerStatus)
    status: customerStatus;
}