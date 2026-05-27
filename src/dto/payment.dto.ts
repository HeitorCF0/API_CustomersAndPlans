import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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

