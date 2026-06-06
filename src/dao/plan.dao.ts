import { RowDataPacket } from "mysql2";
import { PlanSearchAllDTO, PlanUpdateDTO } from "../dto/plan.dto";
import { Plan } from "../model/plan";
import { connection } from "../util/connection";

export class PlanDAO {
    async create(plan: Plan): Promise<void> {
        try {
            const [result] = await connection.query(
                `INSERT INTO plans (id, name, description, price, type, createdAt) VALUES (?, ?, ?, ?, ?, ?)`,
                [plan.id, plan.name, plan.description, plan.price, plan.type, plan.createdAt]
            );
        } catch (error) {
            console.error('Error creating plan:', error);
            throw new Error('Failed to create plan');
        }
    }

    async searchAll(): Promise<PlanSearchAllDTO[]> {
        try {
            const [plans] = await connection.query<PlanSearchAllDTO[] & RowDataPacket[]>(
                `SELECT 
                plans.id, 
                plans.name, 
                plans.price, 
                plans.type 
                FROM plans`
            );
            return plans ;
        } catch (error) {
            console.error('Error searching plans:', error);
            throw new Error('Failed to search plans');
        }
    }

    async searchById(id: string): Promise<Plan | null> {
        try {
            const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM plans WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            return Plan.reconstruct(rows[0] as any);
        } catch (error) {
            console.error('Error searching plan by ID:', error);
            throw new Error('Failed to search plan by ID');
        }
    }

    async searchByType(type: string): Promise<Plan[]> {
        try {
            const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM plans WHERE type = ?', [type]);
            return rows.map((row: any) => Plan.reconstruct(row));
        } catch (error) {
            console.error('Error searching plan by type:', error);
            throw new Error('Failed to search plan by type');
        }
    }

    async updateSearchById(id: string): Promise<PlanUpdateDTO[] | null> {
        try {
            const [planDTO] = await connection.query<PlanUpdateDTO[] & RowDataPacket[]>('SELECT name, description, price, type FROM plans WHERE id = ?', [id])
            if (planDTO.length === 0) {
                return null;
            }
            return planDTO;
        } catch (error) {
            console.error('Error searching plan by ID for update:', error);
            throw new Error('Failed to search plan by ID for update');
        }
    }


    async update(id: string, newPlan: PlanUpdateDTO): Promise<void> {
        try{
            const [result] = await connection.query(
                'UPDATE plans SET name = ?, description = ?, price = ?, type = ? WHERE id = ?',
                [newPlan.name, newPlan.description, newPlan.price, newPlan.type, id]
            );
        } catch (error) {
            console.error('Error updating plan:', error);
            throw new Error('Failed to update plan');
        }
    }


    async delete(id: string): Promise<void> {
        try{
            const [result] = await connection.query('DELETE FROM plans WHERE id = ?', [id]) as any[];
            if ((result as any).affectedRows === 0) {
                throw new Error('Plan not found');
            }
        } catch (error) {
            console.error('Error deleting plan:', error);
            throw new Error('Failed to delete plan');
        }
    }
}