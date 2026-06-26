import { Subscription } from "../model/subscription";
import { connection } from "../util/connection";
import { SubscriptionListDTO, subscriptionSearchByIdDTO } from "../dto/subscription.dto";
import { RowDataPacket } from "mysql2";

export class SubscriptionDAO {
    async create(subscription: Subscription): Promise<void> {
        try {
            const [result] = await connection.query(
                'INSERT INTO subscriptions (id, customerId, planId, startDate, state) VALUES (?, ?, ?, ?, ?)', 
                [subscription.id, subscription.customerId, subscription.planId, subscription.startDate, subscription.state]
            );
        } catch (error) {
            console.error('Error creating subscription:', error);
            throw new Error('Failed to create subscription');
        }
    }

    async searchAll(): Promise<SubscriptionListDTO[]> {
        try {
            const [subscriptionListDTO] = await connection.query<SubscriptionListDTO[] & RowDataPacket[]>(
                `SELECT 
                sub.id,
                sub.planId,
                p.name as plan_Name,
                sub.customerId,
                c.name as customer_Name,
                p.price,
                sub.state
                FROM subscriptions sub 
                JOIN customers c ON sub.customerId = c.id 
                JOIN plans p ON sub.planId = p.id`
            );
            return subscriptionListDTO;
        } catch (error) {
            console.error('Error searching subscriptions:', error);
            throw new Error('Failed to search subscriptions');
        }
    }

    async searchById(id: string): Promise<subscriptionSearchByIdDTO | null> {
        try {
            const [rows] = await connection.query<subscriptionSearchByIdDTO[] & RowDataPacket[]>(
                `SELECT 
                s.id as Subscription_Id, 
                s.customerId as Customer_Id,
                c.name as Customer_Name,
                c.status as Customer_Status,
                s.planId as Plan_Id,
                p.name as Plan_Name,
                p.description as Plan_Description,
                p.price as Plan_Price,
                p.type as Plan_Type,
                s.startDate as Start_Date,
                s.state as State
                FROM subscriptions s
                JOIN customers c ON s.customerId = c.id
                JOIN plans p ON s.planId = p.id
                WHERE s.id = ?`,
                [id]);
            if (rows.length === 0) {
                return null;
            }
            return rows[0] as subscriptionSearchByIdDTO;
        } catch (error) {
            console.error('Error searching subscription by ID:', error);
            throw new Error('Failed to search subscription by ID');
        }
    }

    async searchByCustomerId(customerId: string): Promise<SubscriptionListDTO[] | null> {
        try {
            const [subscriptionListDTO] = await connection.query<SubscriptionListDTO[] & RowDataPacket[]>(
                `SELECT
                sub.id,
                sub.customerId,
                sub.planId,
                sub.state,
                c.name as customer_Name,
                p.name as plan_Name
                FROM subscriptions sub 
                JOIN customers c ON sub.customerId = c.id 
                JOIN plans p ON sub.planId = p.id
                WHERE sub.customerId = ?`, [customerId]);
            if (subscriptionListDTO.length === 0) {
                return null;
            }
            return subscriptionListDTO;
        } catch (error) {
            console.error('Error searching subscriptions by customer ID:', error);
            throw new Error('Failed to search subscriptions by customer ID');
        }
    }

    async searchByPlanId(planId: string): Promise<SubscriptionListDTO[]> {
        try {
            const [subscriptionListDTO] = await connection.query<SubscriptionListDTO[] & RowDataPacket[]>(
                `SELECT
                sub.id,
                sub.customerId,
                sub.planId,
                sub.state,
                c.name as customer_Name,
                p.name as plan_Name
                FROM subscriptions sub 
                JOIN customers c ON sub.customerId = c.id 
                JOIN plans p ON sub.planId = p.id
                WHERE sub.planId = ?`, [planId]);
            return subscriptionListDTO;
        } catch (error) {
            console.error('Error searching subscriptions by plan ID:', error);
            throw new Error('Failed to search subscriptions by plan ID');
        }
    }

    async searchActivesByPlanId(planId: string): Promise<SubscriptionListDTO[]> {
        try {
            const [subscriptionListDTO] = await connection.query<SubscriptionListDTO[] & RowDataPacket[]>(
                `SELECT
                sub.id,
                sub.planId,
                sub.state
                FROM subscriptions sub 
                WHERE sub.planId = ? AND sub.state = ?`, [planId, "active"]);
            return subscriptionListDTO;
        } catch (error) {
            console.error('Error searching subscriptions by plan ID:', error);
            throw new Error('Failed to search subscriptions by plan ID');
        }
    }

    async updateState(id: string, newState: string): Promise<void> {
        try {
            await connection.query(
                'UPDATE subscriptions SET state = ? WHERE id = ?',
                [newState, id]
            );
        } catch (error) {
            console.error('Error updating subscription:', error);
            throw new Error('Failed to update subscription');
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await connection.query('DELETE FROM subscriptions WHERE id = ?', [id]);
        } catch (error) {
            console.error('Error deleting subscription:', error);
            throw new Error('Failed to delete subscription');
        }
    }

    async deleteByPlanId(planId: string): Promise<void> {
        try {
            await connection.query('DELETE FROM subscriptions WHERE planId = ?', [planId]);
        } catch (error) {
            console.error('Error deleting subscriptions by plan ID:', error);
            throw new Error('Failed to delete subscriptions by plan ID');
        }
    }

    // private mapSubscription(row: any) : Subscription {
    //     const customer = Customer.reconstruct({
    //         id: row.customerId,
    //         name: row.customer_Name,
    //         createdAt: row.Customer_CreatedAt,
    //         status: row.Customer_Status
    //     });
    //     const plan = Plan.reconstruct({
    //         id: row.planId,
    //         name: row.plan_Name,
    //         description: row.Plan_Description,
    //         price: row.Plan_Price,
    //         type: row.Plan_Type,
    //         createdAt: row.Plan_CreatedAt
    //     });
    //     return Subscription.reconstruct({
    //         id: row.id,
    //         customerId: row.customerId,
    //         customer,
    //         planId: row.planId,
    //         plan,
    //         startDate: row.startDate,
    //         state: row.state
    //     });
    // }
}