import { CustomerCreateDTO } from "../dto/customer.dto";

export enum customerStatus {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE'
}

export type propsCustomer = {
    id: string;
    name: string;
    createdAt: Date;
    status: customerStatus;
}

export class Customer {
    constructor(private props: propsCustomer) {}

    public static construct({name}: CustomerCreateDTO) {
        if (!name) {throw new Error("Name field is required");}
        const props: propsCustomer = {
            id: crypto.randomUUID().toString(),
            name,
            createdAt: new Date(),
            status: customerStatus.Active
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