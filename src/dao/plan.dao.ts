import { Plan } from "../modelo/plan";
import { connection } from "../util/connection";

export class PlanDAO {
    async create(plan: Plan): Promise<void> {
        try {
            const [result] = await connection.query(
                'INSERT INTO plans (id, name, description, price, type, createdAt) VALUES (?, ?, ?, ?, ?, ?)', 
                [plan.id, plan.name, plan.description, plan.price, plan.type, plan.createdAt]
            );
        } catch (error) {
            console.error('Error creating plan:', error);
            throw new Error('Failed to create plan');
        }
    }

    async searchAll(): Promise<Plan[]> {
        try {
            const [rows] = await connection.query('SELECT * FROM plans');
            return rows.map((row: any) => {return {id: row.id, name: row.name, price: row.price, type: row.type}});
        } catch (error) {
            console.error('Error searching plans:', error);
            throw new Error('Failed to search plans');
        }
    }

    async searchById(id: number): Promise<Plan | null> {
        try {
            const [rows] = await connection.query('SELECT * FROM plans WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            return Plan.reconstruct(rows[0]);
        } catch (error) {
            console.error('Error searching plan by ID:', error);
            throw new Error('Failed to search plan by ID');
        }
    }

    async update(plan: Plan): Promise<void> {
        try{
            const [result] = await connection.query(
                'UPDATE plans SET name = ?, description = ?, price = ?, type = ? WHERE id = ?',
                [plan.name, plan.description, plan.price, plan.type, plan.id]
            );
        } catch (error) {
            console.error('Error updating plan:', error);
            throw new Error('Failed to update plan');
        }
    }

    async delete(id: number): Promise<void> {
        try{
            const [result] = await connection.query('DELETE FROM plans WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                throw new Error('Plan not found');
            }
        } catch (error) {
            console.error('Error deleting plan:', error);
            throw new Error('Failed to delete plan');
        }
    }
}