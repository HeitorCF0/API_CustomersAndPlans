import { RowDataPacket } from "mysql2";
import { Customer } from "../model/customer";
import { connection } from "../util/connection";
import { CustomersListDTO, CustomerUpdateDTO } from '../dto/customer.dto'

export class CustomerDAO {
    async create(customer: Customer): Promise<void> {
        try {
            const [result] = await connection.query(
                'INSERT INTO customers (id, name, createdAt, status) VALUES (?, ?, ?, ?)', 
                [customer.id, customer.name, customer.createdAt, customer.status]
            );
        } catch (error) {
            console.error('Error creating customer:', error);
            throw new Error('Failed to create customer');
        }
    }

    async searchAll(): Promise<CustomersListDTO[] | null> {
        try {
            const [customerDTO] = await connection.query<CustomersListDTO[] & RowDataPacket[]>('SELECT id, name, status FROM customers');
            if (customerDTO.length === 0) {
                return null
            }
            return customerDTO
        } catch (error) {
            console.error('Error searching customers:', error);
            throw new Error('Failed to search customers');
        }
    }

    // async searchById(id: string) {//implementar quando fizer o crud de email, phone e adress
    //     try {
    //         const [rows] = await connection.query(`
    //             SELECT 
    //             c.*, 
    //             e.id as emailId, 
    //             e.email, 
    //             p.id as phoneId,
    //             p.phone,
    //             a.id as addressId,
    //             a.street,
    //             a.number,
    //             a.neighborhood,
    //             a.city,
    //             a.state,
    //             a.cep,
    //             a.complement
    //             FROM customers c
    //             JOIN emails e 
    //             ON c.id = e.customerId 
    //             LEFT JOIN phones p 
    //             ON c.id = p.customerId 
    //             LEFT JOIN adresses a 
    //             ON c.id = a.customerId 
    //             WHERE c.id = ? Group BY c.id`, [id]);
    //         if (rows.length === 0) {
    //             return null;
    //         }
    //         return rows;
    //     } catch (error) {
    //         console.error('Error searching customer by ID:', error);
    //         throw new Error('Failed to search customer by ID');
    //     }
    // }

    async searchById(id: string) {//implementar quando fizer o crud de email, phone e adress
        try {
            const [customer] : any = await connection.query(`
                SELECT 
                c.*
                FROM customers c
                WHERE c.id = ?`, [id]);
            const email = await connection.query('SELECT id, email FROM emails WHERE customerId = ?', [id]);
            const phone = await connection.query('SELECT id, phone FROM phones WHERE customerId = ?', [id]);
            const address = await connection.query('SELECT id, street, number, neighborhood, city, state, cep, complement FROM adresses WHERE customerId = ?', [id]);
            if (customer.length === 0) {
                return null;
            }
            const rows = {
                customer,
                email,
                phone,
                address
            }
            return rows;
        } catch (error) {
            console.error('Error searching customer by ID:', error);
            throw new Error('Failed to search customer by ID');
        }
    }

    async update(id:string, customerUpdateDTO: CustomerUpdateDTO): Promise<void> {
        try{
            const [result]: any = await connection.query(
                'UPDATE customers SET name = ?, status = ? WHERE id = ?', [customerUpdateDTO.name, customerUpdateDTO.status, id]);
            if (result.affectedRows === 0) {
                throw new Error('Customer not found');
            }
        } catch (error) {
            console.error('Error updating customer:', error);
            throw new Error('Failed to update customer');
        }
    }

    async updateSearchById(id: string): Promise<CustomerUpdateDTO[] | null> {
        try {
            const [userDTO]: any = await connection.query('SELECT name, status FROM customers WHERE id = ?', [id]);
            if (userDTO.length === 0) {
                return null;
            }
            return userDTO;
        } catch (error) {
            console.error('Error searching user by ID:', error);
            throw new Error('Failed to search user by ID');
        }
    }

    async delete(id: number): Promise<void> {//unfinished
        try{
            const [result] : any = await connection.query('DELETE FROM customers WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                throw new Error('Customer not found');
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
            throw new Error('Failed to delete customer');
        }
    }
}