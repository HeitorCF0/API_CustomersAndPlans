import { Phone } from '../modelo/phone';
import { connection } from '../util/connection';

export class PhoneDAO {
    async create(phone: Phone): Promise<void> {
        try {
            const [result] = await connection.query(
                'INSERT INTO phones (id, clienteId, phone) VALUES (?, ?, ?)', 
                [phone.getId(), phone.getClientId(), phone.getPhone()]
            );
        } catch (error) {
            console.error('Error creating phone:', error);
            throw new Error('Failed to create phone');
        }
    }

    async searchAll(): Promise<Phone[]> {
        try {
            const [rows] = await connection.query('SELECT * FROM phones');
            return rows.map((row: any) => {return Phone.reconstruct(row.id, row.clienteId, row.phone)});
        } catch (error) {
            console.error('Error searching phones:', error);
            throw new Error('Failed to search phones');
        }
    }

    async searchById(id: string): Promise<Phone | null> {
        try {
            const [rows] = await connection.query('SELECT * FROM phones WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            return Phone.reconstruct(rows[0].id, rows[0].clienteId, rows[0].phone);
        } catch (error) {
            console.error('Error searching phone by ID:', error);
            throw new Error('Failed to search phone by ID');
        }
    }

    async searchByClientId(clientId: string): Promise<Phone[]> {
        try {
            const [rows] = await connection.query('SELECT * FROM phones WHERE clienteId = ?', [clientId]);
            return rows.map((row: any) => {return {id: row.id, phone: row.phone}});
        } catch (error) {
            console.error('Error searching phone by client ID:', error);
            throw new Error('Failed to search phone by client ID');
        }
    }

    async update(phone: Phone): Promise<void> {
        try{
            const [result] = await connection.query('UPDATE phones SET phone = ? WHERE id = ?', [phone.getPhone(), phone.getId()]);
            if (result.affectedRows === 0) {
                throw new Error('Phone not found');
            }
        } catch (error) {
            console.error('Error updating phone:', error);
            throw new Error('Failed to update phone');
        }
    }

    async delete(id: string): Promise<void> {
        try{
            const [result] = await connection.query('DELETE FROM phones WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                throw new Error('Phone not found');
            }
        } catch (error) {
            console.error('Error deleting phone:', error);
            throw new Error('Failed to delete phone');
        }
    }

    async deleteByClientId(clientId: string): Promise<void> {
        try{
            const [result] = await connection.query('DELETE FROM phones WHERE clienteId = ?', [clientId]);
            if (result.affectedRows === 0) {
                throw new Error('Phones not found for the client');
            }
        } catch (error) {
            console.error('Error deleting phones by client ID:', error);
            throw new Error('Failed to delete phones by client ID');
        }
    }
}