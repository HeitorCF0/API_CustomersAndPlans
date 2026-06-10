import { RowDataPacket } from "mysql2";
import { connection } from '../util/connection';
import { User } from '../model/user';
import { UserSearchAllDTO, UserSearchByIdDTO, UserAllAtributes } from '../dto/user.dto';

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

    async searchAll(): Promise<UserSearchAllDTO[] | null> {
        try {
            const [userDTO] = await connection.query<UserSearchAllDTO[] & RowDataPacket[]>(
                'SELECT id, name, email, role FROM users');
            if (userDTO.length === 0){
                return null
            } 
            return userDTO
        } catch (error) {
            console.error('Error searching users:', error);
            throw new Error('Failed to search users');
        }
    }

    async searchById(id: string): Promise<UserSearchByIdDTO[] | null> {
        try {
            const [userDTO]: any = await connection.query('SELECT id, name, email, role, createdAt FROM users WHERE id = ?', [id]);
            if (userDTO.length === 0) {
                return null;
            }
            return userDTO;
        } catch (error) {
            console.error('Error searching user by ID:', error);
            throw new Error('Failed to search user by ID');
        }
    }

    async updateSearchById(id: string): Promise<UserAllAtributes[] | null> {
        try {
            const [userDTO]: any = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
            if (userDTO.length === 0) {
                return null;
            }
            return userDTO;
        } catch (error) {
            console.error('Error searching user by ID:', error);
            throw new Error('Failed to search user by ID');
        }
    }

    async searchByEmail(email: string): Promise<User | null> {
        try {
            const [user]: any = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
            if (user.length === 0) {
                return null;
            }
            return user[0];
        } catch (error) {
            console.error('Error searching user by email:', error);
            throw new Error('Failed to search user by email');
        }
    }

    async update(user: User): Promise<void> {
        try{
            const [result]: any = await connection.query(
                `UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?`, [user.name, user.email, user.password, user.role, user.id]
            );
            if (result.affectedRows === 0) {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Failed to update user');
        }
    }

    async delete(id: string): Promise<void> {
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