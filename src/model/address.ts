import { Customer } from "./customer";

import { AddressCreateDTO } from "../dto/address.dto";

export type propsAddress = {
    id: string;
    customerId: string;
    customer?: Customer;
    number: string | undefined;
    street: string | undefined;
    neighborhood: string | undefined;
    city: string;
    state: string;
    complement: string | undefined;
    cep: string | undefined;
}

export class Address{
    private constructor(
        private props: propsAddress
    ) {}

    public static construct({
        customerId, 
        street, 
        number, 
        neighborhood, 
        city, 
        state, 
        cep, 
        complement
    }: AddressCreateDTO) {
        if(!customerId){
            throw new Error("Invalid customerId");
        }
        if(!city || !state){
            throw new Error("City and state are required");
        }
        const id = crypto.randomUUID().toString();
        const props: propsAddress = {
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
        return new Address(props);
    }

    public static reconstruct(
        props: propsAddress
    ) {
        return new Address(props);
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