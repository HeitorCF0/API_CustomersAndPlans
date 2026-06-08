import { Installment } from "./installment";

export enum paymentStatus {
    Paid = 'PAID',
    Pending = 'PENDING',
    Canceled = 'CANCELED'
}

export enum paymentMethod {
    CreditCard = 'CREDIT_CARD',
    DebitCard = 'DEBIT_CARD',
    BankTransfer = 'BANK_TRANSFER',
    Cash = 'CASH',
    Pix = 'PIX',
    Other = 'OTHER'
}

export type propsPayment = {
    id: string;
    installmentId: string;
    installment?: Installment;
    amount: number;
    status: paymentStatus;
    comment: string | null;
    paidDate: Date;
    paymentMethod: paymentMethod;
}

export class Payment {
    constructor(private props: propsPayment) {}

    public static construct(
        installmentId: string, 
        amount: number, 
        paymentMethod: paymentMethod,
        status: paymentStatus, 
        comment: string | null
    ) 
        {
        if (!installmentId || !amount || !status) {
            throw new Error("All fields are required");
        }
        const props: propsPayment = {
            id: crypto.randomUUID().toString(),
            installmentId,
            amount,
            paymentMethod,
            status,
            comment,
            paidDate: new Date()
        }
        return new Payment(props);
    }

    public static reconstruct(props: propsPayment) {
        return new Payment(props);
    }

    public get id(){
        return this.props.id;
    }

    public get installmentId(){
        return this.props.installmentId;
    }

    public get amount(){
        return this.props.amount;
    }

    public get paymentMethod(){
        return this.props.paymentMethod;
    }

    public get status(){
        return this.props.status;
    }

    public get paidDate(){
        return this.props.paidDate;
    }

    public get comment(){
        return this.props.comment;
    }
}