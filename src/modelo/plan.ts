export enum planType {
    Weekly = 'WEEKLY',
    Monthly = 'MONTHLY',
    Bimonthly = 'BIMONTHLY',
    Quarterly = 'QUARTERLY',
    Semiannual = 'SEMIANNUAL',
    Yearly = 'YEARLY'
}

export type propsPlan = {
    id: string;
    name: string;
    description: string | null;
    price: number;
    type: planType;
    createdAt: Date;
}

export class Plan {
    constructor(private props: propsPlan) {}

    public static construct(name: string, description: string | null, price: number, type: planType) {
        if (!name) {throw new Error("Name fields is required");}
        if (!price) {throw new Error("Price fields is required");}
        if (!type) {throw new Error("Type fields is required");}

        const props: propsPlan = {
            id: crypto.randomUUID().toString(),
            name,
            description,
            price,
            type,
            createdAt: new Date()
        }
        return new Plan(props);
    }

    public static reconstruct(props: propsPlan) {
        return new Plan(props);
    }

    public get id(){
        return this.props.id;
    }

    public get name(){
        return this.props.name;
    }

    public get description(){
        return this.props.description;
    }

    public get price(){
        return this.props.price;
    }

    public get type(){
        return this.props.type;
    }

    public get createdAt(){
        return this.props.createdAt;
    }
}