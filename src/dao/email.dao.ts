import { Email } from "../model/email";
import { connection } from "../util/connection";
import { EmailListDTO, EmailUpdateDTO } from "../dto/email.dto";
import { RowDataPacket } from "mysql2";
import { Customer } from "../model/customer";

export class EmailDAO {
    async create(email: Email): Promise<void> {
        try {
            const [result] = await connection.query(
                'INSERT INTO emails (id, customerId, email) VALUES (?, ?, ?)', 
                [email.id, email.customerId, email.email]
            );
        } catch (error) {
            console.error('Error creating email:', error);
            throw new Error('Failed to create email');
        }
    }

    async searchAll(): Promise<EmailListDTO[]> {
        try {
            const [emailListDTO] = await connection.query<EmailListDTO[] & RowDataPacket[]>(`
                SELECT 
                e.id, 
                e.email, 
                c.id as customerId,
                c.name as customerName
                FROM emails e
                JOIN customers c 
                ON e.customerId = c.id`);
            return emailListDTO;
        } catch (error) {
            console.error('Error searching emails:', error);
            throw new Error('Failed to search emails');
        }
    }

    async searchById(id: string): Promise<EmailListDTO[]> {
        try {
            const [EmailListDTO] = await connection.query<EmailListDTO[] & RowDataPacket[]>(`
                SELECT
                e.id, 
                e.email, 
                e.customer, 
                c.name, 
                c.createdAt, 
                c.status
                FROM emails 
                JOIN customers c 
                ON e.customerId = c.id 
                WHERE e.id = ?`, [id]);
            return EmailListDTO
        } catch (error) {
            console.error('Error searching email by ID:', error);
            throw new Error('Failed to search email by ID');
        }
    }

    async searchByCustomerId(customerId: string): Promise<Email | null> {
        try {
            const [rows] : any = await connection.query(`
                SELECT 
                e.id, 
                e.email
                FROM emails e
                WHERE e.customerId = ?`, [customerId]);
            return rows;
        }catch (error) {
            console.error('Error searching email by customer ID:', error);
            throw new Error('Failed to search email by customer ID');
        }
    }

    async update(id: string, newEmail: EmailUpdateDTO): Promise<void> {
        try{
            const [result] : any = await connection.query('UPDATE emails SET email = ? WHERE id = ?', [newEmail.email, id]);
            if (result.affectedRows === 0) {
                throw new Error('Email not found');
            }
        } catch (error) {
            console.error('Error updating email:', error);
            throw new Error('Failed to update email');
        }
    }

    async delete(id: string): Promise<void> {
        try{
            const [result] : any = await connection.query('DELETE FROM emails WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                throw new Error('Email not found');
            }
        } catch (error) {
            console.error('Error deleting email:', error);
            throw new Error('Failed to delete email');
        }
    }

    async deleteByCustomerId(customerId: string): Promise<void> {
        try{
            const [result] : any = await connection.query('DELETE FROM emails WHERE customerId = ?', [customerId]);
            if (result.affectedRows === 0) {
                throw new Error('Email not found');
            }
        } catch (error) {
            console.error('Error deleting email by customer ID:', error);
            throw new Error('Failed to delete email by customer ID');
        }
    }

    private mapEmail(row: any) : Email {
        const phone = Email.reconstruct({
            id: row.customerId,
            email: row.email,
            customerId: row.customerId
        });
        const customer = Customer.reconstruct({
            id: row.customerId,
            name: row.customerName,
            createdAt: row.customerCreatedAt,
            status: row.customerStatus
        });
        return Email.reconstruct({
            id: row.id,
            email: row.email,
            customerId: row.customerId,
            customer
        });
    }
}