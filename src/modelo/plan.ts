type planType = 'weekly' | 'monthly' | 'bimonthly' | 'quarterly' | 'semiannual' | 'yearly';

export type propsPlan = {
    id: string;
    name: string;
    description: string;
    price: number;
    type: planType;
    createdAt: Date;
}

export class Plan {
    constructor(private props: propsPlan) {}

    public static construct(name: string, description: string, price: number, type: planType, createdAt: Date) {
        if (!name || !description || !price || !type || !createdAt) {
            throw new Error("All fields are required");
        }
        const props: propsPlan = {
            id: crypto.randomUUID().toString(),
            name,
            description,
            price,
            type,
            createdAt
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