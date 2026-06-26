import { SubscriptionDAO } from "../dao/subscription.dao";
import { SubscriptionCreateDTO } from "../dto/subscription.dto";
import { CustomerDAO } from "../dao/customer.dao";
import { PlanDAO } from "../dao/plan.dao";
import { Subscription } from "../model/subscription";
import { customerStatus } from "../model/customer";

export class SubscriptionService {
    public constructor (private readonly subscriptionDAO: SubscriptionDAO) {}

    public async create(subscriptionCreateDTO: SubscriptionCreateDTO){
        try{
            if(!await this.customerExists(subscriptionCreateDTO.customerId)){
                throw new Error("Customer not found");
            }
            if (!await this.customerActive(subscriptionCreateDTO.customerId)){
                throw new Error("Inactive user")
            }
            if(!await this.planExists(subscriptionCreateDTO.planId)){
                throw new Error("Plan not found");
            }
            if(await this.customerHasActiveSubscription(subscriptionCreateDTO.customerId)){
                throw new Error("Customer already has a subscription in this plan");
            }

            const subscription = Subscription.construct(subscriptionCreateDTO);
            await this.subscriptionDAO.create(subscription)
        }catch (error){
            throw new Error("Error creating subscription: " + (error instanceof Error ? error.message : 'Unknown error'));
        }
    }

    public async searchAll() {
        try {
            const subscriptionDTO = await this.subscriptionDAO.searchAll();
            return subscriptionDTO;
        } catch (error) {
            throw new Error("Error searching subscriptions: " + (error instanceof Error ? error.message : 'Unknown error'));
        }
    }

    public async searchById(id: string) {
        try {
            const subscription = await this.subscriptionDAO.searchById(id);
            return subscription;
        } catch (error) {
            throw new Error("Error searching subscription: " + (error instanceof Error ? error.message : 'Unknown error'));
        }
    }

    public async updateState(id: string, newState: string) {
        try {
            const subscription = await this.subscriptionDAO.searchById(id);
            if (!subscription) {
                throw new Error("Subscription not found");
            }
            await this.subscriptionDAO.updateState(id, newState);
        } catch (error) {
            throw new Error("Error updating subscription state: " + (error instanceof Error ? error.message : 'Unknown error'));
        }
    }

    public async delete(id: string) {
        try {
            const subscription = await this.subscriptionDAO.searchById(id);
            if (!subscription) {
                throw new Error("Subscription not found");
            }
            await this.subscriptionDAO.delete(id);
        } catch (error) {
            throw new Error("Error deleting subscription: " + (error instanceof Error ? error.message : 'Unknown error'));
        }
    }

    public async customerExists(customerId: string): Promise<boolean> {
        const customerDAO = new CustomerDAO();
        const result = await customerDAO.searchById(customerId);
        return result !== null;
    }

    public async customerActive(customerId: string): Promise<boolean> {
        const customerDAO = new CustomerDAO();
        const result = await customerDAO.searchById(customerId);
        return result?.customer[0].status !== customerStatus.Inactive;
    }

    public async planExists(planId: string): Promise<boolean> {
        const planDAO = new PlanDAO();
        const result = await planDAO.searchById(planId);
        return result !== null;
    }

    public async customerHasActiveSubscription(customerId: string): Promise<boolean> {
        const activeSubscription = await this.subscriptionDAO.searchByCustomerId(customerId);
        return activeSubscription !== null;
    }
}