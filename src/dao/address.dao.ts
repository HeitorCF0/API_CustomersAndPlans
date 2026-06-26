import { Address } from "../model/address";
import { connection } from "../util/connection";
import { AddressListDTO, AddressUpdateDTO } from "../dto/address.dto";
import { RowDataPacket } from "mysql2";
import { Customer } from "../model/customer";

export class AddressDAO {
    async create(address: Address): Promise<void> {
        try {
            const [result] = await connection.query(
                'INSERT INTO adresses (id, customerId, street, number, neighborhood, city, state, cep, complement) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                    address.id, 
                    address.customerId, 
                    address.street, 
                    address.number, 
                    address.neighborhood, 
                    address.city, 
                    address.state, 
                    address.cep, 
                    address.complement]
            );
        } catch (error) {
            console.error('Error creating address:', error);
            throw new Error('Failed to create address');
        }
    }

    async searchAll(): Promise<AddressListDTO[]> {
        try {
            const [adressListDTO] = await connection.query<AddressListDTO[] & RowDataPacket[]>(
                `SELECT a.*, c.name as customerName FROM adresses a JOIN customers c ON a.customerId = c.id`
                );
            return adressListDTO;
        } catch (error) {
            console.error('Error searching adresses:', error);
            throw new Error('Failed to search adresses');
        }
    }

    async searchById(id: string): Promise<Address | null> {
        try {
            const [rows] : any = await connection.query('SELECT * FROM adresses WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            return Address.reconstruct(rows[0]);
        } catch (error) {
            console.error('Error searching adress by ID:', error);
            throw new Error('Failed to search adress by ID');
        }
    }

    async searchByCustomerId(customerId: string) {
        try {
            const [rows] : any = await connection.query('SELECT id, street, number, neighborhood, city, state, cep, complement FROM adresses WHERE customerId = ?', [customerId]);
            return rows;
        } catch (error) {
            console.error('Error searching adresses by customer ID:', error);
            throw new Error('Failed to search adresses by customer ID');
        }
    }

    async update(id: string, newAddress: AddressUpdateDTO): Promise<void> {
        try{
            const [result] = await connection.query(
                'UPDATE adresses SET street = ?, number = ?, neighborhood = ?, city = ?, state = ?, cep = ?, complement = ? WHERE id = ?',
                [newAddress.street, newAddress.number, newAddress.neighborhood, newAddress.city, newAddress.state, newAddress.cep, newAddress.complement, id]
            );
        } catch (error) {
            console.error('Error updating adress:', error);
            throw new Error('Failed to update adress');
        }
    }

    async delete(id: string): Promise<void> {
        try{
            const [result] : any = await connection.query('DELETE FROM adresses WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                throw new Error('Adress not found');
            }
        } catch (error) {
            console.error('Error deleting adress:', error);
            throw new Error('Failed to delete adress');
        }
    }

    async deleteByCustomerId(customerId: string): Promise<void> {
        try{
            const [result] : any = await connection.query('DELETE FROM adresses WHERE customerId = ?', [customerId]);
            if (result.affectedRows === 0) {
                throw new Error('Adresses not found for the given customer ID');
            }
        } catch (error) {
            console.error('Error deleting adresses by customer ID:', error);
            throw new Error('Failed to delete adresses by customer ID');
        }
    }

    async updateSearchById(id: string): Promise<AddressUpdateDTO[] | null> {
        try {
            const [addressDTO]: any = await connection.query('SELECT street, number, neighborhood, city, state, cep, complement FROM adresses WHERE id = ?', [id]);
            if (addressDTO.length === 0) {
                return null;
            }
            return addressDTO;
        } catch (error) {
            console.error('Error searching address by ID:', error);
            throw new Error('Failed to search address by ID');
        }
    }


    private mapAdress(row: any) : Address {
        const phone = Address.reconstruct({
            id: row.id, 
            customerId: row.customerId, 
            street: row.street, 
            number: row.number, 
            neighborhood: row.neighborhood, 
            city: row.city, 
            state: row.state, 
            cep: row.cep, 
            complement: row.complement,
        });
        const customer = Customer.reconstruct({
            id: row.customerId,
            name: row.customerName,
            createdAt: row.customerCreatedAt,
            status: row.customerStatus
        });
        return Address.reconstruct({
            id: row.id, 
            customerId: row.customerId, 
            customer,
            street: row.street, 
            number: row.number, 
            neighborhood: row.neighborhood, 
            city: row.city, 
            state: row.state, 
            cep: row.cep, 
            complement: row.complement,
        });
    }
}