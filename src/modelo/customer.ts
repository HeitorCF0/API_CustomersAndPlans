type customerStatus = 'active' | 'inactive';

export type propsCustomer = {
    id: string;
    name: string;
    createdAt: Date;
    status: customerStatus;
}

export class Customer {
    constructor(private props: propsCustomer) {}

    public static construct(name: string, createdAt: Date, status: customerStatus) {
        if (!name || !createdAt || !status) {
            throw new Error("All fields are required");
        }
        const props: propsCustomer = {
            id: crypto.randomUUID().toString(),
            name,
            createdAt,
            status
        }
        return new Customer(props);
    }

    public static reconstruct(props: propsCustomer) {
        return new Customer(props);
    }

    public get id(){
        return this.props.id;
    }

    public get name(){
        return this.props.name;
    }

    public get createdAt(){
        return this.props.createdAt;
    }

    public get status(){
        return this.props.status;
    }
}