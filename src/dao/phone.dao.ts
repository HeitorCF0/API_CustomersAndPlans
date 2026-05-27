import { Phone } from '../modelo/phone';
import { connection } from '../util/connection';
import { PhoneListDTO } from '../dto/phone.dto';
import { RowDataPacket } from 'mysql2';
import { Customer } from '../modelo/customer';

export class PhoneDAO {
    async create(phone: Phone): Promise<void> {
        try {
            const [result] = await connection.query(
                'INSERT INTO phones (id, customerId, phone) VALUES (?, ?, ?)', 
                [phone.id, phone.customerId, phone.phone]
            );
        } catch (error) {
            console.error('Error creating phone:', error);
            throw new Error('Failed to create phone');
        }
    }

    async searchAll(): Promise<PhoneListDTO[]> {
        try {
            const [phoneListDTO] = await connection.query<PhoneListDTO[] & RowDataPacket[]>(`
                SELECT 
                p.id, 
                p.phone, 
                c.name as customerName 
                FROM phones p 
                JOIN customers c 
                ON p.customerId = c.id`);
            return phoneListDTO;
        } catch (error) {
            console.error('Error searching phones:', error);
            throw new Error('Failed to search phones');
        }
    }

    async searchById(id: string): Promise<Phone | null> {
        try {
            const [rows] = await connection.query(`
                SELECT 
                p.id, 
                p.phone, 
                p.customerId, 
                c.name as customerName,
                c.status as customerStatus,
                c.createdAt as customerCreatedAt
                FROM phones p 
                JOIN customers c 
                ON p.customerId = c.id 
                WHERE p.id = ?`, [id]);
            return rows.length > 0 ? this.mapPhone(rows[0]) : null;
        } catch (error) {
            console.error('Error searching phone by ID:', error);
            throw new Error('Failed to search phone by ID');
        }
    }

    async searchByClientId(clientId: string): Promise<Phone[]> {
        try {
            const [rows] = await connection.query('SELECT id, phone FROM phones WHERE customerId = ?', [clientId]);
            return rows.map((row: any) => {return Phone.reconstruct({id: row.id, customerId: clientId, phone: row.phone})});
        } catch (error) {
            console.error('Error searching phone by client ID:', error);
            throw new Error('Failed to search phone by client ID');
        }
    }

    async update(phone: Phone): Promise<void> {
        try{
            const [result] = await connection.query('UPDATE phones SET phone = ? WHERE id = ?', [phone.phone, phone.id]);
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
            const [result] = await connection.query('DELETE FROM phones WHERE customerId = ?', [clientId]);
            if (result.affectedRows === 0) {
                throw new Error('Phones not found for the client');
            }
        } catch (error) {
            console.error('Error deleting phones by client ID:', error);
            throw new Error('Failed to delete phones by client ID');
        }
    }

    private mapPhone(row: any) : Phone {
        const phone = Phone.reconstruct({
            id: row.customerId,
            phone: row.phone,
            customerId: row.customerId
        });
        const customer = Customer.reconstruct({
            id: row.customerId,
            name: row.customerName,
            createdAt: row.customerCreatedAt,
            status: row.customerStatus
        });
        return Phone.reconstruct({
            id: row.id,
            phone: row.phone,
            customerId: row.customerId,
            customer
        });
    }
}