import { InstallmentSearchtByIdDTO, InstallmentListDTO, InstallmentUpdateDTO } from "../dto/installment.dto";
import { Installment } from "../model/installment";
import { connection } from "../util/connection";
import { RowDataPacket } from "mysql2";

export class InstallmentDAO {
    async create(installment: Installment): Promise<void> {
        try {
            const [result] = await connection.query(
                'INSERT INTO installment (id, subscriptionId, dueDate, amount, state, createdAt) VALUES (?, ?, ?, ?, ?, ?)', 
                [installment.id, installment.subscriptionId, installment.dueDate, installment.amount, installment.state, installment.createdAt]
            );
        } catch (error) {
            console.error('Error creating installment:', error);
            throw new Error('Failed to create installment');
        }
    }

    async searchAll(): Promise<InstallmentListDTO[]> {
        try {
            const [installmentListDTO] = await connection.query<InstallmentListDTO[] & RowDataPacket[]>(`
                SELECT 
                i.id, 
                i.state, 
                i.amount, 
                c.name,
                p.name
                FROM installment i 
                JOIN subscriptions s 
                ON i.subscriptionId = s.id
                JOIN customers c 
                ON s.customerId = c.id 
                JOIN plans p ON s.planId = p.id`);
            return installmentListDTO;
        } catch (error) {
            console.error('Error searching all installments:', error);
            throw new Error('Failed to search all installments');
        }
    }

    async searchById(id: string): Promise<InstallmentSearchtByIdDTO | null> {
        try {
            const [installmentListByIdDTO] = await connection.query<InstallmentSearchtByIdDTO[] & RowDataPacket[]>(`
                SELECT
                i.id as installment_Id,
                i.state,
                i.amount,
                i.dueDate,
                i.subscriptionId,
                i.createdAt,
                i.paidAt,
                s.customerId as customer_Id,
                c.name as customer_Name,
                s.planId as plan_Id,
                p.name as  plan_Name
                FROM installment i
                JOIN subscriptions s
                ON i.subscriptionId = s.id
                JOIN customers c
                ON s.customerId = c.id
                JOIN plans p ON s.planId = p.id WHERE i.id = ?`, [id]);
            if (installmentListByIdDTO.length === 0) {
                return null;
            }
            return installmentListByIdDTO[0];
        } catch (error) {
            console.error('Error searching installment by ID:', error);
            throw new Error('Failed to search installment by ID');
        }
    }

    async searchBySubscriptionId(subscriptionId: string): Promise<InstallmentListDTO[]> {
        try {
            const [installmentListDTO] = await connection.query<InstallmentListDTO[] & RowDataPacket[]>(`
                SELECT 
                i.id, 
                i.state, 
                i.amount, 
                c.name,
                p.name
                FROM installment i 
                JOIN subscriptions s 
                ON i.subscriptionId = s.id
                JOIN customers c 
                ON s.customerId = c.id 
                JOIN plans p ON s.planId = p.id
                WHERE s.id = ?`, [subscriptionId]);
            return installmentListDTO;
        } catch (error) {
            console.error('Error searching installments by subscription ID:', error);
            throw new Error('Failed to search installments by subscription ID');
        }
    }

    async searchByPlanId(planId: string): Promise<InstallmentListDTO[]> {
        try {
            const [installmentListDTO] = await connection.query<InstallmentListDTO[] & RowDataPacket[]>(`
                SELECT 
                i.id, 
                i.state, 
                i.amount, 
                c.name,
                p.name
                FROM installment i 
                JOIN subscriptions s 
                ON i.subscriptionId = s.id
                JOIN customers c 
                ON s.customerId = c.id 
                JOIN plans p ON s.planId = p.id
                WHERE s.planId = ?`, 
                [planId]
            );
            return installmentListDTO;
        } catch (error) {
            console.error('Error searching installments by plan ID:', error);
            throw new Error('Failed to search installments by plan ID');
        }
    }

    async searchByCustomerId(customerId: string): Promise<InstallmentListDTO[]> {
        try {
            const [installmentListDTO] = await connection.query<InstallmentListDTO[] & RowDataPacket[]>(`
                SELECT 
                i.id, 
                i.state, 
                i.amount, 
                c.name,
                p.name
                FROM installment i 
                JOIN subscriptions s 
                ON i.subscriptionId = s.id
                JOIN customers c 
                ON s.customerId = c.id 
                JOIN plans p ON s.planId = p.id
                WHERE s.customerId = ?`, 
                [customerId]
            );
            return installmentListDTO;
        } catch (error) {
            console.error('Error searching installments by customer ID:', error);
            throw new Error('Failed to search installments by customer ID');
        }
    }



    async update(id: string, installmentUpdateDTO: InstallmentUpdateDTO): Promise<void> {
        try{
            const [result] = await connection.query(
                'UPDATE installment SET dueDate = ?, amount = ?, state = ?, paidAt = ? WHERE id = ?',
                [installmentUpdateDTO.dueDate, installmentUpdateDTO.amount, installmentUpdateDTO.state, installmentUpdateDTO.paidAt, id]
            );
        } catch (error) {
            console.error('Error updating installment:', error);
            throw new Error('Failed to update installment');
        }
    }

    async delete(id: string): Promise<void> {
        try{
            const [result] : any = await connection.query('DELETE FROM installment WHERE id = ?', [id]);
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
                'DELETE FROM installment WHERE subscriptionId IN (SELECT id FROM subscriptions WHERE planId = ?)',
                [planId]
            );
        } catch (error) {
            console.error('Error deleting installments by plan ID:', error);
            throw new Error('Failed to delete installments by plan ID');
        }
    }
}