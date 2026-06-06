import { SubscriptionCreateDTO } from "../dto/subscription.dto";
import { Customer } from "./customer";
import { Plan } from "./plan";

export enum subscriptionState {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export type propsSubscription = {
    id: string;
    customerId: string;
    customer?: Customer;
    planId: string;
    plan?: Plan;
    startDate: Date;
    state: subscriptionState;
}


export class Subscription {
    constructor(private props: propsSubscription) {}

    public static construct(subscriptionCreateDTO: SubscriptionCreateDTO) {
        if (!subscriptionCreateDTO.customerId || !subscriptionCreateDTO.planId) {
            throw new Error("All fields are required");
        }
        const props: propsSubscription = {
            id: crypto.randomUUID().toString(),
            customerId: subscriptionCreateDTO.customerId,
            planId: subscriptionCreateDTO.planId,
            startDate: new Date(),
            state: subscriptionState.ACTIVE,
        }
        return new Subscription(props);
    }

    public static reconstruct(props: propsSubscription) {
        return new Subscription(props);
    }

    public get id(){
        return this.props.id;
    }

    public get customerId(){
        return this.props.customerId;
    }

    public get planId(){
        return this.props.planId;
    }

    public get startDate(){
        return this.props.startDate;
    }

    public get state(){
        return this.props.state;
    }
}