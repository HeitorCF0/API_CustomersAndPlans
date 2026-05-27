import { Customer } from "./customer";

export type propsAdress = {
    id: string;
    customerId: string;
    customer?: Customer;
    number: string | null;
    street: string | null;
    neighborhood: string | null;
    city: string;
    state: string;
    complement: string | null;
    cep: string | null;
}

export class Adress{
    private constructor(
        private props: propsAdress
    ) {}

    public static construct(
        customerId: string, 
        street: string | null, 
        number: string | null, 
        neighborhood: string | null, 
        city: string, 
        state: string, 
        cep: string | null, 
        complement: string | null
    ) {
        if(!customerId){
            throw new Error("Invalid customerId");
        }
        if(!city || !state){
            throw new Error("City and state are required");
        }
        const id = crypto.randomUUID().toString();
        const props: propsAdress = {
            id,
            customerId,
            street,
            number,
            neighborhood,
            city,
            state,
            complement,
            cep
        };
        return new Adress(props);
    }

    public static reconstruct(
        props: propsAdress
    ) {
        return new Adress(props);
    }

    public get id(){
        return this.props.id;
    }

    public get customerId(){
        return this.props.customerId;
    }

    public get number(){
        return this.props.number;
    }

    public get street(){
        return this.props.street;
    }

    public get neighborhood(){
        return this.props.neighborhood;
    }

    public get city(){
        return this.props.city;
    }

    public get state(){
        return this.props.state;
    }

    public get cep(){
        return this.props.cep;
    }

    public get complement(){
        return this.props.complement;
    }
}