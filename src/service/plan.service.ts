import { PlanDAO } from "../dao/plan.dao"; 
import { SubscriptionDAO } from "../dao/subscription.dao";
import { PlanCreateDTO, PlanSearchAllDTO, PlanUpdateDTO } from "../dto/plan.dto";
import { Plan } from "../model/plan";

export class PlanService {

    public constructor (private readonly planDAO: PlanDAO) {}

    public async create(planCreateDTO: PlanCreateDTO){
        try {
            const plan = Plan.construct(planCreateDTO);
            return await this.planDAO.create(plan);
        } catch (error) {
            throw error
        }
    }

    public async searchAll(): Promise<PlanSearchAllDTO[] | null> {
        try {
            const planDTO: PlanSearchAllDTO[] = await this.planDAO.searchAll()
            if (planDTO) {
                return planDTO
            }
            return null
        } catch (error) {
            console.error("Error searching all plans:", error);
            throw error;
        }
    }

    public async searchById(id: string) {
        try {
            const plan = await this.planDAO.searchById(id);
            if (plan) {
                return plan;
            }
            throw new Error("Plan not found");
        } catch (error) {
            console.error("Error searching plan by ID:", error);
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

    public async delete(id: string) {
        try {
            if (await this.haveActiveSubscriptions(id)){
                throw new Error("Plan has active subscriptions");
            }
            await this.planDAO.delete(id);
        } catch (error) {
            throw new Error("Error deleting plan: " + (error instanceof Error ? error.message : 'Unknown error'));
        }
    }

    public async haveActiveSubscriptions(id: string) : Promise <boolean> {
        const subscriptionDAO = new SubscriptionDAO();
        const result = await subscriptionDAO.searchActivesByPlanId(id);
        return result.length > 0;
    }
}