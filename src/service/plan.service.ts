import { PlanDAO } from "../dao/plan.dao"; 
import { PlanCreateDTO, PlanSearchAllDTO, PlanSearchByIdDTO, PlanUpdateDTO } from "../dto/plan.dto";
import { Plan, planType } from "../model/plan";

export class PlanService {

    public constructor (private readonly planDAO: PlanDAO) {}

    public async create(planCreateDTO: PlanCreateDTO){
        try {
            return await this.planDAO.create(planCreateDTO as Plan);
        } catch (error) {
            throw error
        }
    }

    public async searchAll(): Promise<PlanSearchAllDTO[] | null> {
        try {
            const planDTO: PlanSearchAllDTO[] = await this.planDAO.searchAll()
            return planDTO;
        } catch (error) {
            console.error("Error searching all plans:", error);
            throw error;
        }
    }

    public async update(id: string, newPlan: PlanUpdateDTO) {
        try {
            const existingPlan = await this.planDAO.updateSearchById(id);
            if (!existingPlan) {
                throw new Error('Plan not found');
            }

                if (newPlan.name == null) {
                    newPlan.name = existingPlan[0].name
                }
                if (newPlan.description == null) {
                    newPlan.description = existingPlan[0].description
                }
                if (newPlan.price == null) {
                    newPlan.price = existingPlan[0].price
                }
                if (newPlan.type == null) {
                    newPlan.type = existingPlan[0].type
                }
               
            await this.planDAO.update(id, newPlan);
        } catch (error) {
            console.error("Error updating plan:", error)
            throw error
        }
    }

    public async delete(id: string, planDeleteDTO: PlanSearchByIdDTO) {
        try {
            await this.planDAO.delete(id);
        } catch (error) {
            throw error
        }
    }

}