import { Email } from "../modelo/email";
import { connection } from "../util/connection";
import { EmailListDTO } from "../dto/email.dto";
import { RowDataPacket } from "mysql2";
import { Customer } from "../modelo/customer";

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
                c.name as customerName, 
                e.email 
                FROM emails e
                JOIN costumers c 
                ON e.customersID = c.id`);
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

    async searchByClientId(clientId: string): Promise<Email | null> {
        try {
            const [rows] = await connection.query(`
                SELECT 
                e.id, 
                e.email, 
                e.customerId, 
                c.name as customerName,
                c.status as customerStatus,
                c.createdAt as customerCreatedAt
                FROM email e 
                JOIN customers c 
                ON e.customerId = c.id 
                WHERE .id = ?`, [clientId]);
            return rows.length > 0 ? this.mapEmail(rows[0]) : null;
        }catch (error) {
            console.error('Error searching email by client ID:', error);
            throw new Error('Failed to search email by client ID');
        }
    }

    async update(email: Email): Promise<void> {
        try{
            const [result] = await connection.query('UPDATE emails SET email = ? WHERE id = ?', [email.email, email.id]);
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
            const [result] = await connection.query('DELETE FROM emails WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                throw new Error('Email not found');
            }
        } catch (error) {
            console.error('Error deleting email:', error);
            throw new Error('Failed to delete email');
        }
    }

    async deleteByClientId(clientId: string): Promise<void> {
        try{
            const [result] = await connection.query('DELETE FROM emails WHERE customerId = ?', [clientId]);
            if (result.affectedRows === 0) {
                throw new Error('Email not found');
            }
        } catch (error) {
            console.error('Error deleting email by client ID:', error);
            throw new Error('Failed to delete email by client ID');
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