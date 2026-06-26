import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { installmentState } from '../model/installment';

export class InstallmentListDTO {
    id: string;
    state: installmentState;
    amount: number;
    customerName: string;
    planName: string;
}

export class InstallmentSearchtByIdDTO{
    id: string;
    state: installmentState;
    amount: number;
    dueDate: Date;
    subscriptionId: string
    createdAt: Date;
    paidAt: Date | null;
    customerId: string;
    customerName: string;
    planId: string;
    planName: string;
}

export class InstallmentCreateDTO {
    @IsNotEmpty()
    @IsString()
    subscriptionId: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @Type(() => Date)
    dueDate: Date;
}

export class InstallmentUpdateDTO {
    @IsOptional()
    @IsNumber()
    amount?: number;

    @IsOptional()
    @Type(() => Date)
    dueDate?: Date;

    @IsOptional()
    @IsEnum(installmentState)
    state?: installmentState;

    @IsOptional()
    @Type(() => Date)
    paidAt?: Date | null;
}