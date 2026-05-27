import { IsNotEmpty, IsString } from "class-validator";

export class SubscriptionListDTO {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    customerId: string;

    @IsNotEmpty()
    @IsString()
    planId: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    customer_Name: string;

    @IsNotEmpty()
    @IsString()
    plan_Name: string;
}
