import { Payment } from "../modelo/payment";
import { connection } from "../util/connection";

export class PaymentDAO {
    async create(payment: Payment): Promise<void> {
        try {
            const [result] = await connection.query(
                'INSERT INTO payments (id, installmentId, amount, status, comment, paidDate) VALUES (?, ?, ?, ?, ?, ?)', 
                [payment.id, payment.installmentId, payment.amount, payment.status, payment.comment, payment.paidDate]
            );
        } catch (error) {
            console.error('Error creating payment:', error);
            throw new Error('Failed to create payment');
        }
    }

    async searchAll(): Promise<Payment[]> {
        try {
            const [rows] = await connection.query('SELECT * FROM payments');
            return rows.map((row: any) => Payment.reconstruct(row));
        } catch (error) {
            console.error('Error searching payments:', error);
            throw new Error('Failed to search payments');
        }
    }

    async searchById(id: string): Promise<Payment | null> {
        try {
            const [rows] = await connection.query('SELECT * FROM payments WHERE id = ?', [id]);
            return rows.length > 0 ? Payment.reconstruct(rows[0]) : null;
        } catch (error) {
            console.error('Error searching payment by ID:', error);
            throw new Error('Failed to search payment by ID');
        }
    }

    async update(payment: Payment): Promise<void> {
        try {
            const [result] = await connection.query(
                'UPDATE payments SET installmentId = ?, amount = ?, status = ?, comment = ?, paidDate = ? WHERE id = ?',
                [payment.installmentId, payment.amount, payment.status, payment.comment, payment.paidDate, payment.id]
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
}