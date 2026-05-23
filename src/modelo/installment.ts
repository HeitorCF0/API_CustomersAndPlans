//parcela
type installmentState = 'paid' | 'pending' | 'overdue';

export type propsInstallment = {
    id: string;
    subscriptionId: string;
    amount: number;
    dueDate: Date; //vencimento
    state: installmentState;
    paidAt: Date|null;
    createdAt: Date;
}

export class Installment {
    constructor(private props: propsInstallment) {}

    public static construct(subscriptionId: string, amount: number, dueDate: Date, state: installmentState, createdAt: Date) {
        if (!subscriptionId || !amount || !dueDate || !state || !createdAt) {
            throw new Error("All fields are required");
        }
        const props: propsInstallment = {
            id: crypto.randomUUID().toString(),
            subscriptionId,
            amount,
            dueDate,
            state,
            paidAt: null,
            createdAt
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