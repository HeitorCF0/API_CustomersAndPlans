import { Customer } from "../modelo/customer";
import { connection } from "../util/connection";

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

    async searchAll(): Promise<Customer[]> {
        try {
            const [rows] = await connection.query('SELECT id, name, createdAt FROM customers');
            return rows.map((row: any) => {return {id: row.id, name: row.name, createdAt: row.createdAt}});
        } catch (error) {
            console.error('Error searching customers:', error);
            throw new Error('Failed to search customers');
        }
    }

    async searchById(id: number): Promise<Customer | null> {
        try {
            const [rows] = await connection.query('SELECT * FROM customers WHERE id = ?', [id]);
            if (rows.length === 0) {
                return null;
            }
            const customer = Customer.reconstruct(rows[0]);
            return customer;
        } catch (error) {
            console.error('Error searching customer by ID:', error);
            throw new Error('Failed to search customer by ID');
        }
    }

    async update(customer: Customer): Promise<void> {
        try{
            const [result] = await connection.query(
                'UPDATE customers SET name = ?, status = ? WHERE id = ?', [customer.name, customer.status, customer.id]);
            if (result.affectedRows === 0) {
                throw new Error('Customer not found');
            }
        } catch (error) {
            console.error('Error updating customer:', error);
            throw new Error('Failed to update customer');
        }
    }

    async delete(id: number): Promise<void> {
        try{
            const [result] = await connection.query('DELETE FROM customers WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                throw new Error('Customer not found');
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
            throw new Error('Failed to delete customer');
        }
    }
}