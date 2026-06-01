import { Payment } from "../model/payment";
import { connection } from "../util/connection";
import { RowDataPacket } from "mysql2";
import { PaymentListByIdDTO, PaymentListDTO } from "../dto/payment.dto";

export class PaymentDAO {
    async create(payment: Payment): Promise<void> {
        try {
            const [result] = await connection.query(
                'INSERT INTO payments (id, installmentId, amount, paymentMethod, status, comment, paidDate) VALUES (?, ?, ?, ?, ?, ?)', 
                [payment.id, payment.installmentId, payment.amount, payment.paymentMethod, payment.status, payment.comment, payment.paidDate]
            );
        } catch (error) {
            console.error('Error creating payment:', error);
            throw new Error('Failed to create payment');
        }
    }

    async searchAll(): Promise<PaymentListDTO[]> {
        try {
            const [paymentListDTO] = await connection.query<PaymentListDTO[] & RowDataPacket[]>(`
            SELECT
            pay.id, 
            pay.installmentId, 
            pay.amount,
            i.amount as installmentAmount,
            pay.status,
            i.dueDate,
            p.planName,
            c.customerName
            FROM payments pay
            JOIN installmets i 
            ON pay.installmentId = i.id
            JOIN subscriptions s
            ON i.subscriptionId = s.id
            JOIN customers c
            ON s.customerId = c.id
            JOIN plans p
            ON s.planId = p.id
            `);
            return paymentListDTO;
        } catch (error) {
            console.error('Error searching payments:', error);
            throw new Error('Failed to search payments');
        }
    }

    async searchById(id: string): Promise<PaymentListByIdDTO> {
        try {
            const [PaymentListByIdDTO] = await connection.query<PaymentListByIdDTO[] & RowDataPacket[]>(`
            SELECT
            pay.id,
            pay.installmentId,
            pay.amount,
            pay.status,
            pay.comment,
            pay.paidDate,
            pay.paymentMethod,
            i.dueDate,
            p.planName,
            c.customerName
            FROM payments pay
            JOIN installmets i 
            ON pay.installmentId = i.id
            jOIN subscriptions s
            ON i.subscriptionId = s.id
            JOIN customers c
            ON s.customerId = c.id
            JOIN plans p
            ON s.planId = p.id
            WHERE id = ?`, [id]);
            return PaymentListByIdDTO;
        } catch (error) {
            console.error('Error searching payment by ID:', error);
            throw new Error('Failed to search payment by ID');
        }
    }

    async searchByPlanId(planId: string): Promise<PaymentListByIdDTO[]> {
        try{
            const [PaymentListByIdDTO] = await connection.query<PaymentListByIdDTO[] & RowDataPacket[]>(`
            SELECT
            pay.id, 
            pay.installmentId, 
            pay.amount,
            i.amount as installmentAmount,
            pay.status,
            i.dueDate,
            p.planName,
            c.customerName
            FROM payments pay
            JOIN installmets i 
            ON pay.installmentId = i.id
            JOIN subscriptions s
            ON i.subscriptionId = s.id
            JOIN customers c
            ON s.customerId = c.id
            JOIN plans p
            ON s.planId = p.id
            WHERE s.planId = ?
            `, [planId]);
            return PaymentListByIdDTO
        }catch (error) {
            console.error('Error searching payments by plan ID:', error);
            throw new Error('Failed to search payments by plan ID');
        }
    }

    async searchByCustomerId(customerId: string): Promise<PaymentListByIdDTO[]> {
        try{
            const [PaymentListByIdDTO] = await connection.query<PaymentListByIdDTO[] & RowDataPacket[]>(`
            SELECT
            pay.id, 
            pay.installmentId, 
            pay.amount,
            i.amount as installmentAmount,
            pay.status,
            i.dueDate,
            p.planName,
            c.customerName
            FROM payments pay
            JOIN installmets i 
            ON pay.installmentId = i.id
            JOIN subscriptions s
            ON i.subscriptionId = s.id
            JOIN customers c
            ON s.customerId = c.id
            JOIN plans p
            ON s.planId = p.id
            WHERE s.customerId = ?
            `, [customerId]);
            return PaymentListByIdDTO
        }catch (error) {
            console.error('Error searching payments by customer ID:', error);
            throw new Error('Failed to search payments by customer ID');
        }
    }

    async searchByInstallmentId(installmentId: string): Promise<PaymentListByIdDTO[]> {
        try{
            const [PaymentListByIdDTO] = await connection.query<PaymentListByIdDTO[] & RowDataPacket[]>(`
            SELECT
            pay.id, 
            pay.installmentId, 
            pay.amount,
            i.amount as installmentAmount,
            pay.status,
            i.dueDate,
            p.planName,
            c.customerName
            FROM payments pay
            JOIN installmets i 
            ON pay.installmentId = i.id
            JOIN subscriptions s
            ON i.subscriptionId = s.id
            JOIN customers c
            ON s.customerId = c.id
            JOIN plans p
            ON s.planId = p.id
            WHERE i.id = ?
            `, [installmentId]);
            return PaymentListByIdDTO
        }catch (error) {
            console.error('Error searching payments by installment ID:', error);
            throw new Error('Failed to search payments by installment ID');
        }
    }

    async update(payment: Payment): Promise<void> {
        try {
            const [result] = await connection.query(
                'UPDATE payments SET installmentId = ?, amount = ?, paymentMethod = ?, status = ?, comment = ?, paidDate = ? WHERE id = ?',
                [payment.installmentId, payment.amount, payment.paymentMethod, payment.status, payment.comment, payment.paidDate, payment.id]
            );
        } catch (error) {
            console.error('Error updating payment:', error);
            throw new Error('Failed to update payment');
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const [result] = await connection.query('DELETE FROM payments WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                throw new Error('Payment not found');
            }
        } catch (error) {
            console.error('Error deleting payment:', error);
            throw new Error('Failed to delete payment');
        }
    }

    async deleteByInstallmentId(installmentId: string): Promise<void> {
        try {
            const [result] = await connection.query('DELETE FROM payments WHERE installmentId = ?', [installmentId]);
            if (result.affectedRows === 0) {
                throw new Error('Payment not found');
            }
        } catch (error) {
            console.error('Error deleting payment by installment ID:', error);
            throw new Error('Failed to delete payment by installment ID');
        }
    }

    async deleteByCustomerId(customerId: string): Promise<void> {
        try {
            const [result] = await connection.query(
                'DELETE FROM payments WHERE installmentId IN (SELECT id FROM installments WHERE subscriptionId IN (SELECT id FROM subscriptions WHERE customerId = ?))',
                [customerId]
            );
        } catch (error) {
            console.error('Error deleting payments by customer ID:', error);
            throw new Error('Failed to delete payments by customer ID');
        }
    }

    async deleteByPlanId(planId: string): Promise<void> {
        try {
            const [result] = await connection.query(
                'DELETE FROM payments WHERE installmentId IN (SELECT id FROM installments WHERE subscriptionId IN (SELECT id FROM subscriptions WHERE planId = ?))',
                [planId]
            );
        } catch (error) {
            console.error('Error deleting payments by plan ID:', error);
            throw new Error('Failed to delete payments by plan ID');
        }
    }
}