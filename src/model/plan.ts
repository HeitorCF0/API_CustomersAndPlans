import { PlanCreateDTO } from "../dto/plan.dto";

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

    public static construct({
        name,
        description,
        price,
        type,
    }: PlanCreateDTO)

    {
        const id = crypto.randomUUID().toString();
        const props: propsPlan = {
            id,
            name,
            description: description ?? null,
            price,
            type: type as planType,
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