type subscriptionState = 'active' | 'inactive';

export type propsSubscription = {
    id: string;
    customerId: string;
    planId: string;
    startDate: Date;
    endDate: Date|null;
    state: subscriptionState;
}


export class Subscription {
    constructor(private props: propsSubscription) {}

    public static construct(customerId: string, planId: string, startDate: Date, state: subscriptionState) {
        if (!customerId || !planId || !startDate || !state) {
            throw new Error("All fields are required");
        }
        const props: propsSubscription = {
            id: crypto.randomUUID().toString(),
            customerId,
            planId,
            startDate,
            endDate: null,
            state,
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

    public get endDate(){
        return this.props.endDate;
    }

    public get state(){
        return this.props.state;
    }
}