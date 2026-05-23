type paymentStatus = 'paid' | 'pending' | 'failed';

export type propsPayment = {
    id: string;
    installmentId: string;
    amount: number;
    status: paymentStatus;
    comment: string|null;
    paidDate: Date;
}

export class Payment {
    constructor(private props: propsPayment) {}

    public static construct(installmentId: string, amount: number, status: paymentStatus, comment: string|null) {
        if (!installmentId || !amount || !status) {
            throw new Error("All fields are required");
        }
        const props: propsPayment = {
            id: crypto.randomUUID().toString(),
            installmentId,
            amount,
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