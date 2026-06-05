import { Request, Response } from 'express';
import { PlanService } from '../service/plan.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PlanCreateDTO, PlanUpdateDTO } from '../dto/plan.dto';

export class PlanController {
    private planService: PlanService
    public constructor(planService: PlanService) {
        this.planService = planService
    }

    public async create(req: Request, res: Response) {
        try {
            const planCreateedDTO = plainToInstance(PlanCreateDTO, req.body);
            const errors = await validate(planCreateedDTO);

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            await this.planService.create(planCreateedDTO);
            res.status(201).json({ message: 'Plan created successfully' });
        } catch (error: any) {
            console.error("Error creating plan:", error)
            res.status(500).json({ error: error?.message || 'Error creating plan' })
        }
    }

    public async searchAll(req: Request, res: Response) {
        try {
            const plans = await this.planService.searchAll();
            res.status(200).json(plans);
        } catch (error: any) {
            console.error("Error searching plans:", error)
            res.status(500).json({ error: error?.message || 'Error searching plans' })
        }
    }
    
    public async update(req: Request, res: Response) {
        const id = Array.isArray(req.params.id)? req.params.id[0] : req.params.id
        const planUpdateDTO = plainToInstance(PlanUpdateDTO, req.body);
        const errors = await validate(planUpdateDTO);

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        try {
            await this.planService.update(id, planUpdateDTO);
            res.status(200).json({ message: 'Plan updated successfully' });
        } catch (error: any) {
            console.error("Error updating plan:", error)
            res.status(500).json({ error: error?.message || 'Error updating plan' })
        }
    }
    
    public async delete(req: Request, res: Response) {
        const id = Array.isArray(req.params.id)? req.params.id[0] : req.params.id
        try {
            await this.planService.delete(id, {id});
            res.status(200).json({ message: 'Plan deleted successfully' });
        } catch (error: any) {
            console.error("Error deleting plan:", error)
            res.status(500).json({ error: error?.message || 'Error deleting plan' })
        }
    }



}