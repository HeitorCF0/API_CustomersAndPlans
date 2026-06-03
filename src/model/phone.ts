import { PhoneCreateDTO } from "../dto/phone.dto";
import { Customer } from "./customer";

export type propsPhone = {
    id: string;
    customerId: string;
    customer?: Customer;
    phone: string;
}

export class Phone{

    constructor(private props: propsPhone) {}

    public static construct({customerId, phone}: PhoneCreateDTO) {
        if(!customerId){throw new Error("Invalid customer")}
        if(!phone){throw new Error("Phone field is required");}

        const props: propsPhone = {
            id: crypto.randomUUID().toString(),
            customerId,
            phone
        };
        return new Phone(props);
    }

    public static reconstruct(props: propsPhone){
        return new Phone(props);
    }

    public get id(){
        return this.props.id;
    }

    public get customerId(){
        return this.props.customerId;
    }

    public get phone(){
        return this.props.phone;
    }
}