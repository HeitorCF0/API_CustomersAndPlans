import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional } from "class-validator";
import { paymentStatus, paymentMethod } from "../model/payment"

export class PaymentListDTO {
    id: string;
    installmentId: string
    amount: number;
    installmentAmount: number;
    status: string;
    dueDate: Date;
    planName: string
    customerName: string;
}

export class PaymentListByIdDTO {
    id: string;
    installmentId: string;
    amount: number;
    status: string;
    comment: string | null;
    paidDate: Date;
    paymentMethod: string;
    dueDate: Date;
    planName: string;
    customerName: string;
}

export class PaymentCreateDTO {
    @IsNotEmpty()
    @IsString()
    installmentId: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    @IsEnum(paymentStatus)
    status: paymentStatus;

    @IsNotEmpty()
    @IsString()
    @IsEnum(paymentMethod)
    paymentMethod: paymentMethod;

    @IsOptional()
    @IsString()
    comment?: string | null;
}

export class PaymentUpdateDTO {
    @IsOptional()
    @IsNumber()
    amount?: number;

    @IsOptional()
    @IsString()
    @IsEnum(paymentStatus)
    status?: paymentStatus;

    @IsOptional()
    @IsString()
    @IsEnum(paymentMethod)
    paymentMethod?: paymentMethod;

    @IsOptional()
    @IsString()
    comment?: string | null;
}

