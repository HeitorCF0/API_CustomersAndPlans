import { IsString, IsNumber, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { planType } from '../model/plan';


export class PlanCreateDTO {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    description?: string | undefined

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    @IsEnum(planType)
    type: planType
}

export class PlanSearchAllDTO {
    id: string
    name: string
    price: number
    type: planType
}


export class PlanUpdateDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string | undefined;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsEnum(planType)
    type?: planType;
}
