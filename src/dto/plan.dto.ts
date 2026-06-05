import { IsString, IsNumber, IsOptional } from 'class-validator';


export class PlanCreateDTO {
    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    price: number;
    
    @IsString()
    type: string;
}

export class PlanListDTO {
    id: string
    name: string;
    description: string | null;
    price: number;
    type: string;
    createdAt: Date;
}

export class PlanUpdateDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string | null;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsString()
    type?: string;
}

export class PlanSearchByIdDTO {
    @IsString()
    id: string;
}

export class PlanSearchAllDTO {
    id: string
    name: string;
    description: string | null;
    price: number;
    type: string;
    createdAt: Date;
}

