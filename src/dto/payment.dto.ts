import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Installment } from "../modelo/installment";

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

export class CreatePaymentDTO {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    installmentId: string;

    @Type(() => Installment)
    installment?: Installment;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsEnum()
    status: string;
}

        // id: string;
        // installmentId: string;
        // installment?: Installment;
        // amount: number;
        // status: paymentStatus;
        // comment: string | null;
        // paidDate: Date;
        // paymentMethod: paymentMethod;

