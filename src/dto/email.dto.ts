import { IsNotEmpty, IsString } from 'class-validator';

export class EmailListDTO {
    email: string;
    customerId: string;
    costumerName: string;
}

export class CreateEmailDTO {
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