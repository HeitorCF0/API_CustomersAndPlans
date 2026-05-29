import { connection  } from '../util/connection';
import { User } from '../modelo/user';

export class UserDAO {
    async create(user: User): Promise<void> {
        try {
            const [result]: any = await connection.query(
                `INSERT INTO users (id, name, email, password, role, createdAt) VALUES (?, ?, ?, ?, ?, ?)`,
                [user.id, user.name, user.email, user.password, user.role, user.createdAt]
            );
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    }

    async searchAll(): Promise<User[]> {
        try {
            const [rows]: any = await connection.query(
                'SELECT id, name, email, role FROM users');
            return (rows as any[]).map((row: any) => User.reconstruct(row));
        } catch (error) {
            console.error('Error searching users:', error);
            throw new Error('Failed to search users');
        }
    }

    async searchById(id: string): Promise<User | null> {
        try {
            const [rows]: any = await connection.query('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
            if ((rows as any[]).length === 0) {
                return null;
            }
            const user = User.reconstruct((rows as any[])[0]);
            return user;
        } catch (error) {
            console.error('Error searching user by ID:', error);
            throw new Error('Failed to search user by ID');
        }
    }

    async update(user: User): Promise<void> {
        try{
            const [result]: any = await connection.query(
                `UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?`, [user.name, user.email, user.password, user.role, user.id]
            );
            if ((result as any).affectedRows === 0) {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Failed to update user');
        }
    }

    async delete(id: number): Promise<void> {
        try{
            const [result]: any = await connection.query('DELETE FROM users WHERE id = ?', [id]);
            if ((result as any).affectedRows === 0) {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Failed to delete user');
        }
    }
}