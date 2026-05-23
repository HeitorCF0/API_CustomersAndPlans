import { Installment } from "../modelo/installment";
import { connection } from "../util/connection";

export class InstallmentDAO {
    async create(installment: Installment): Promise<void> {
        try {
            const [result] = await connection.query(
                'INSERT INTO installments (id, subscriptionId, dueDate, amount, state, createdAt) VALUES (?, ?, ?, ?, ?, ?)', 
                [installment.id, installment.subscriptionId, installment.dueDate, installment.amount, installment.state, installment.createdAt]
            );
        } catch (error) {
            console.error('Error creating installment:', error);
            throw new Error('Failed to create installment');
        }
    }

    async searchAll(): Promise<Installment[]> {
        try {
            const [rows] = await connection.query('SELECT * FROM installments');
            return rows.map((row: any) => { return {id: row.id, subscriptionId: row.subscriptionId, dueDate: row.dueDate, amount: row.amount, state: row.state}});
        } catch (error) {
            console.error('Error searching all installments:', error);
            throw new Error('Failed to search all installments');
        }
    }

    async searchById(id: number): Promise<Installment | null> {
        try {
            const [rows] = await connection.query('SELECT * FROM installments WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            const installment = Installment.reconstruct(rows[0]);
            return installment;
        } catch (error) {
            console.error('Error searching installment by ID:', error);
            throw new Error('Failed to search installment by ID');
        }
    }

    async seartchBySubscriptionId(subscriptionId: string): Promise<Installment[]> {
        try {
            const [rows] = await connection.query('SELECT * FROM installments WHERE subscriptionId = ?', [subscriptionId]);
            return rows.map((row: any) => { return {id: row.id, subscriptionId: row.subscriptionId, dueDate: row.dueDate, amount: row.amount, state: row.state}});
        } catch (error) {
            console.error('Error searching installments by subscription ID:', error);
            throw new Error('Failed to search installments by subscription ID');
        }
    }

    async searchByPlanId(planId: string): Promise<Installment[]> {
        try {
            const [rows] = await connection.query(
                'SELECT i.* FROM installments i JOIN subscriptions s ON i.subscriptionId = s.id WHERE s.planId = ?', 
                [planId]
            );
            return rows.map((row: any) => { return {id: row.id, subscriptionId: row.subscriptionId, dueDate: row.dueDate, amount: row.amount, state: row.state}});
        } catch (error) {
            console.error('Error searching installments by plan ID:', error);
            throw new Error('Failed to search installments by plan ID');
        }
    }

    async searchByCustomerId(customerId: string): Promise<Installment[]> {
        try {
            const [rows] = await connection.query(
                'SELECT i.* FROM installments i JOIN subscriptions s ON i.subscriptionId = s.id WHERE s.customerId = ?', 
                [customerId]
            );
            return rows.map((row: any) => { return {id: row.id, subscriptionId: row.subscriptionId, dueDate: row.dueDate, amount: row.amount, state: row.state}});
        } catch (error) {
            console.error('Error searching installments by customer ID:', error);
            throw new Error('Failed to search installments by customer ID');
        }
    }

    async update(installment: Installment): Promise<void> {
        try{
            const [result] = await connection.query(
                'UPDATE installments SET subscriptionId = ?, dueDate = ?, amount = ?, state = ?, paidAt = ?, createdAt = ? WHERE id = ?',
                [installment.subscriptionId, installment.dueDate, installment.amount, installment.state, installment.paidAt, installment.createdAt, installment.id]
            );
        } catch (error) {
            console.error('Error updating installment:', error);
            throw new Error('Failed to update installment');
        }
    }

    async delete(id: number): Promise<void> {
        try{
            const [result] = await connection.query('DELETE FROM installments WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                throw new Error('Installment not found');
            }
        } catch (error) {
            console.error('Error deleting installment:', error);
            throw new Error('Failed to delete installment');
        }
    }

    async deleteByCustomerId(customerId: string): Promise<void> {
        try{
            const [result] = await connection.query(
                'DELETE FROM installments WHERE subscriptionId IN (SELECT id FROM subscriptions WHERE customerId = ?)',
                [customerId]
            );
        } catch (error) {
            console.error('Error deleting installments by customer ID:', error);
            throw new Error('Failed to delete installments by customer ID');
        }
    }

    async deleteByPlanId(planId: string): Promise<void> {
        try{
            const [result] = await connection.query(
                'DELETE FROM installments WHERE subscriptionId IN (SELECT id FROM subscriptions WHERE planId = ?)',
                [planId]
            );
        } catch (error) {
            console.error('Error deleting installments by plan ID:', error);
            throw new Error('Failed to delete installments by plan ID');
        }
    }
}