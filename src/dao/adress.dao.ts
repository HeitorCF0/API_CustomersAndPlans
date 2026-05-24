import { Adress } from "../modelo/adress";
import { connection } from "../util/connection";

export class AdressDAO {
    async create(adress: Adress): Promise<void> {
        try {
            const [result] = await connection.query(
                'INSERT INTO adresses (id, clientId, street, number, neighborhood, city, state, cep, complement) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                    adress.id, 
                    adress.customerId, 
                    adress.street, 
                    adress.number, 
                    adress.neighborhood, 
                    adress.city, 
                    adress.state, 
                    adress.cep, 
                    adress.complement]
            );
        } catch (error) {
            console.error('Error creating adress:', error);
            throw new Error('Failed to create adress');
        }
    }

    async searchAll(customerId: string): Promise<Adress[]> {
        try {
            const [rows] = await connection.query('SELECT * FROM adresses WHERE customerId = ?', [customerId]);
            return rows.map((row: any) => Adress.reconstruct({
                id: row.id, 
                customerId: row.customerId, 
                street: row.street, 
                number: row.number, 
                neighborhood: row.neighborhood, 
                city: row.city, 
                state: row.state, 
                cep: row.cep, 
                complement: row.complement}));
        } catch (error) {
            console.error('Error searching adresses by customer ID:', error);
            throw new Error('Failed to search adresses by customer ID');
        }
    }

    async searchById(id: string): Promise<Adress | null> {
        try {
            const [rows] = await connection.query('SELECT * FROM adresses WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            return Adress.reconstruct(rows[0]);
        } catch (error) {
            console.error('Error searching adress by ID:', error);
            throw new Error('Failed to search adress by ID');
        }
    }

    async searchByClientId(clientId: string): Promise<Adress[]> {
        try {
            const [rows] = await connection.query('SELECT * FROM adresses WHERE clientId = ?', [clientId]);
            return rows.map((row: any) => Adress.reconstruct({
                id: row.id, 
                customerId: row.customerId, 
                street: row.street, 
                number: row.number, 
                neighborhood: row.neighborhood, 
                city: row.city, 
                state: row.state, 
                cep: row.cep, 
                complement: row.complement
            }));
        } catch (error) {
            console.error('Error searching adresses by client ID:', error);
            throw new Error('Failed to search adresses by client ID');
        }
    }

    async update(adress: Adress): Promise<void> {
        try{
            const [result] = await connection.query(
                'UPDATE adresses SET street = ?, number = ?, neighborhood = ?, city = ?, state = ?, cep = ?, complement = ? WHERE id = ?',
                [adress.street, adress.number, adress.neighborhood, adress.city, adress.state, adress.cep, adress.complement, adress.id]
            );
        } catch (error) {
            console.error('Error updating adress:', error);
            throw new Error('Failed to update adress');
        }
    }

    async delete(id: string): Promise<void> {
        try{
            const [result] = await connection.query('DELETE FROM adresses WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                throw new Error('Adress not found');
            }
        } catch (error) {
            console.error('Error deleting adress:', error);
            throw new Error('Failed to delete adress');
        }
    }

    async deleteByClientId(clientId: string): Promise<void> {
        try{
            const [result] = await connection.query('DELETE FROM adresses WHERE clientId = ?', [clientId]);
            if (result.affectedRows === 0) {
                throw new Error('Adresses not found for the given client ID');
            }
        } catch (error) {
            console.error('Error deleting adresses by client ID:', error);
            throw new Error('Failed to delete adresses by client ID');
        }
    }
}