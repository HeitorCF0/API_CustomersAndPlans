import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { subscriptionState } from "../model/subscription";

export class SubscriptionCreateDTO {
    @IsNotEmpty()
    @IsString()
    customerId: string;

    @IsNotEmpty()
    @IsString()
    planId: string;
}

export class SubscriptionListDTO {
    id: string;
    customerId: string;
    customerName: string;
    planId: string;
    planName: string;
    price: number;
    state: subscriptionState;
}

export class subscriptionSearchByIdDTO {
    id: string;
    customerId: string;
    customerName: string;
    customerStatus: string;
    planId: string;
    planName: string;
    planDescription: string;
    planPrice: number;
    planType: string;
    startDate: Date;
    state: subscriptionState;
}

export class subscriptionStateUpdateDTO {
    @IsNotEmpty()
    @IsEnum(subscriptionState)
    state: subscriptionState;
}