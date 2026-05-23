import { Subscription } from "./subscription";

//parcela
export enum installmentState {
    Paid = 'PAID',
    Pending = 'PENDING',
    Overdue = 'OVERDUE'
}

export type propsInstallment = {
    id: string;
    subscriptionId: string;
    subscription?: Subscription;
    amount: number;
    dueDate: Date; //vencimento
    state: installmentState;
    paidAt?: Date|null;
    createdAt: Date;
}

export class Installment {
    constructor(private props: propsInstallment) {}

    public static construct(subscriptionId: string, amount: number, dueDate: Date) {
        if (!subscriptionId) {throw new Error("SubscriptionId field is required")}
        if (!amount) {throw new Error("Amount field is required")}
        if (!dueDate) {throw new Error("DueDate field is required")}

        const props: propsInstallment = {
            id: crypto.randomUUID().toString(),
            subscriptionId,
            amount,
            dueDate,
            state: installmentState.Pending,
            paidAt: null,
            createdAt: new Date()
        }
        return new Installment(props);
    }

    public static reconstruct(props: propsInstallment) {
        return new Installment(props);
    }

    public get id(){
        return this.props.id;
    }

    public get subscriptionId(){
        return this.props.subscriptionId;
    }

    public get amount(){
        return this.props.amount;
    }

    public get dueDate(){
        return this.props.dueDate;
    }

    public get state(){
        return this.props.state;
    }

    public get paidAt(){
        return this.props.paidAt;
    }

    public get createdAt(){
        return this.props.createdAt;
    }
}