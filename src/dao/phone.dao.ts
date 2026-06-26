import { Phone } from '../model/phone';
import { connection } from '../util/connection';
import { PhoneListDTO, PhoneUpdateDTO } from '../dto/phone.dto';
import { RowDataPacket } from 'mysql2';

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
                c.id as customerId, 
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

    // async searchById(id: string): Promise<Phone | null> {
    //     try {
    //         const [rows] : any = await connection.query(`
    //             SELECT 
    //             p.id, 
    //             p.phone, 
    //             p.customerId, 
    //             c.name as customerName,
    //             c.status as customerStatus,
    //             c.createdAt as customerCreatedAt
    //             FROM phones p 
    //             JOIN customers c 
    //             ON p.customerId = c.id 
    //             WHERE p.id = ?`, [id]);
    //         return rows.length > 0 ? this.mapPhone(rows[0]) : null;
    //     } catch (error) {
    //         console.error('Error searching phone by ID:', error);
    //         throw new Error('Failed to search phone by ID');
    //     }
    // }

    async searchByCustomerId(customerId: string): Promise<PhoneListDTO[] | null> {
        try {
            const [rows] = await connection.query<PhoneListDTO[] & RowDataPacket[]>(`
                SELECT 
                p.id, 
                p.phone
                FROM phones p 
                WHERE p.customerId = ?`, [customerId]);
            return rows;
        } catch (error) {
            console.error('Error searching phone by customer ID:', error);
            throw new Error('Failed to search phone by customer ID');
        }
    }

    async update(id:string, newPhone: PhoneUpdateDTO): Promise<void> {
        try{
            const [result] : any = await connection.query('UPDATE phones SET phone = ? WHERE id = ?', [newPhone.phone, id]);
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
            const [result] : any = await connection.query('DELETE FROM phones WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                throw new Error('Phone not found');
            }
        } catch (error) {
            console.error('Error deleting phone:', error);
            throw new Error('Failed to delete phone');
        }
    }

    async deleteByCustomerId(customerId: string): Promise<void> {
        try{
            const [result] : any = await connection.query('DELETE FROM phones WHERE customerId = ?', [customerId]);
            if (result.affectedRows === 0) {
                throw new Error('Phones not found for the customer ID');
            }
        } catch (error) {
            console.error('Error deleting phones by customer ID:', error);
            throw new Error('Failed to delete phones by customer ID');
        }
    }
}