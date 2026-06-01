import { EmailCreateDTO } from "../dto/email.dto";
import { Customer } from "./customer";

export type propsEmail = {
    id: string;
    customerId: string;
    customer?: Customer;
    email: string;
}
export class Email{
    constructor(private props: propsEmail) {}

    public static construct({ customerId, email }: EmailCreateDTO
    ) {
        if(!customerId){throw new Error("Invalid customer")}
        if(!email){throw new Error("Email field is required");}

        const props: propsEmail = {
            id: crypto.randomUUID().toString(),
            customerId,
            email
        };
        return new Email(props);
    }

    public static reconstruct(props: propsEmail) {
        return new Email(props);
    }

    public get id(){
        return this.props.id;
    }

    public get customerId(){
        return this.props.customerId;
    }

    public get email(){
        return this.props.email;
    }
}