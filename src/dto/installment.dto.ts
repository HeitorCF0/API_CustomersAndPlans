import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { Customer } from '../model/customer';
import { installmentState } from '../model/installment';

export class InstallmentListDTO {
    id: string;
    state: installmentState;
    amount: number;
    customerName: string;
    planName: string;
}

export class InstallmentListByIdDTO{
    id: string;
    state: installmentState;
    amount: number;
    dueDate: Date;
    subscriptionId: string
    createdAt: Date;
    paidAt: Date | null;
    customerName: string;
    planName: string;
}

export class CreateInstallmentDTO {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    subscriptionId: string;

    @Type(() => Customer)
    subscription?: Customer;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @Type(() => Date)
    dueDate: Date;

    @IsNotEmpty()
    @IsEnum(installmentState)
    state: installmentState;

    @Type(() => Date)
    paidAt?: Date | null;

    @IsNotEmpty()
    @Type(() => Date)
    createdAt: Date;
}