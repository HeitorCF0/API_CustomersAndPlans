import { Subscription } from "../modelo/subscription";
import { connection } from "../util/connection";

export class SubscriptionDAO {
    async create(subscription: Subscription): Promise<void> {
        try {
            const [result] = await connection.query(
                'INSERT INTO subscriptions (id, customerId, planId, startDate, state, endDate) VALUES (?, ?, ?, ?, ?, ?)', 
                [subscription.id, subscription.customerId, subscription.planId, subscription.startDate, subscription.state, subscription.endDate]
            );
        } catch (error) {
            console.error('Error creating subscription:', error);
            throw new Error('Failed to create subscription');
        }
    }

    async searchAll(): Promise<Subscription[]> {
        try {
            const [rows] = await connection.query('SELECT * FROM subscriptions');
            return rows.map((row: any) => {return {id: row.id, customerId: row.customerId, planId: row.planId, state: row.state, endDate: row.endDate}});
        } catch (error) {
            console.error('Error searching subscriptions:', error);
            throw new Error('Failed to search subscriptions');
        }
    }

    async searchById(id: number): Promise<Subscription | null> {
        try {
            const [rows] = await connection.query('SELECT * FROM subscriptions WHERE id = ?', [id]);
            return rows.length > 0 ? Subscription.reconstruct(rows[0]) : null;
        } catch (error) {
            console.error('Error searching subscription by ID:', error);
            throw new Error('Failed to search subscription by ID');
        }
    }

    async searchByCustomerId(customerId: string): Promise<Subscription[]> {
        try {
            const [rows] = await connection.query('SELECT * FROM subscriptions WHERE customerId = ?', [customerId]);
            return rows.map((row: any) => Subscription.reconstruct(row));
        } catch (error) {
            console.error('Error searching subscriptions by customer ID:', error);
            throw new Error('Failed to search subscriptions by customer ID');
        }
    }

    async searchByPlanId(planId: string): Promise<Subscription[]> {
        try {
            const [rows] = await connection.query('SELECT * FROM subscriptions WHERE planId = ?', [planId]);
            return rows.map((row: any) => Subscription.reconstruct(row));
        } catch (error) {
            console.error('Error searching subscriptions by plan ID:', error);
            throw new Error('Failed to search subscriptions by plan ID');
        }
    }

    async update(subscription: Subscription): Promise<void> {
        try {
            await connection.query(
                'UPDATE subscriptions SET customerId = ?, planId = ?, startDate = ?, endDate = ?, state = ? WHERE id = ?',
                [subscription.customerId, subscription.planId, subscription.startDate, subscription.endDate, subscription.state, subscription.id]
            );
        } catch (error) {
            console.error('Error updating subscription:', error);
            throw new Error('Failed to update subscription');
        }
    }

    async delete(id: number): Promise<void> {
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
}