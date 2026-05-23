import { Email } from "../modelo/email";
import { connection } from "../util/connection";

export class EmailDAO {
    async create(email: Email): Promise<void> {
        try {
            const [result] = await connection.query(
                'INSERT INTO emails (id, clienteId, email) VALUES (?, ?, ?)', 
                [email.getId(), email.getClientId(), email.getEmail()]
            );
        } catch (error) {
            console.error('Error creating email:', error);
            throw new Error('Failed to create email');
        }
    }

    async searchAll(): Promise<Email[]> {
        try {
            const [rows] = await connection.query('SELECT * FROM emails');
            return rows.map((row: any) => {return Email.reconstruct(row.id, row.clienteId, row.email)});
        } catch (error) {
            console.error('Error searching emails:', error);
            throw new Error('Failed to search emails');
        }
    }

    async searchById(id: string): Promise<Email | null> {
        try {
            const [rows] = await connection.query('SELECT * FROM emails WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            return Email.reconstruct(rows[0].id, rows[0].clienteId, rows[0].email);
        } catch (error) {
            console.error('Error searching email by ID:', error);
            throw new Error('Failed to search email by ID');
        }
    }

    async searchByClientId(clientId: string): Promise<Email[]> {
        try {
            const [rows] = await connection.query('SELECT * FROM emails WHERE clienteId = ?', [clientId]);
            return rows.map((row: any) => {return {id: row.id, email: row.email}});
        } catch (error) {
            console.error('Error searching email by client ID:', error);
            throw new Error('Failed to search email by client ID');
        }
    }

    async update(email: Email): Promise<void> {
        try{
            const [result] = await connection.query('UPDATE emails SET email = ? WHERE id = ?', [email.getEmail(), email.getId()]);
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
            const [result] = await connection.query('DELETE FROM emails WHERE clienteId = ?', [clientId]);
            if (result.affectedRows === 0) {
                throw new Error('Email not found');
            }
        } catch (error) {
            console.error('Error deleting email by client ID:', error);
            throw new Error('Failed to delete email by client ID');
        }
    }
}