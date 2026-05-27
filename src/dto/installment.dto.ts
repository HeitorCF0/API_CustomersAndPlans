import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InstallmentListDTO {
    id: string;
    state: string;
    amount: number;
    customerName: string;
    planName: string;
}

export class InstallmentListByIdDTO{
    id: string;
    state: string;
    amount: number;
    dueDate: Date;
    subscriptionId: string
    createdAt: Date;
    paidAt: Date | null;
    customerName: string;
    planName: string;
}

@IsNotEmpty()
export class CreateInstallmentDTO {
    @IsString()
    subscriptionId: string;
    @IsNumber()
    amount: number;
    @IsString()
    dueDate: string;
}