import { Request, Response } from 'express';
import { User } from '../modelo/user';
import { UserDAO } from '../dao/user.dao';
import { UserDTO } from '../dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class UserControle {
    private userDAO: UserDAO;

    constructor() {
        this.userDAO = new UserDAO();
    }

    public async create(req: Request, res: Response) {
        try {
            const userDTO = plainToInstance(UserDTO, req.body);

            const errors = await validate(userDTO);

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            const user = User.construct(
                userDTO.id,
                userDTO.name, 
                userDTO.email, 
                userDTO.password,
                userDTO.rol
            );
            await this.userDAO.create(user);
            res.status(201).json({ message: 'User created successfully'});
        } catch (error) {
            res.status(500).json({ error: 'Error creating user' });
        }
    }

    public async searchAlL(res: Response) {
        try {
            const users = await this.userDAO.searchAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching users' });
        }
    }

    public async searchById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await this.userDAO.searchById(id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user' });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const userDTO = plainToInstance(UserDTO, req.body);
            const errors = await validate(userDTO);

            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map(e => e.constraints) });
            }

            const user = User.reconstruct({
                id: 
                name: 
                email: 
                password:
                role: 
                createdAt:
            });
            await this.userDAO.update(user);
            res.json({ message: 'User updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error updating user' });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await this.userDAO.delete(id);
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting user' });
        }
    }
}