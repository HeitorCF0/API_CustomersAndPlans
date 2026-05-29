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
                userDTO.name, 
                userDTO.email, 
                userDTO.password,
                userDTO.role
            );
            await this.userDAO.create(user);
            res.status(201).json({ message: 'User created successfully'});
        } catch (error) {
            res.status(500).json({ error: 'Error creating user' });
        }
    }

    public async searchAll(req: Request, res: Response) {
        try {
            const users = await this.userDAO.searchAll();
            res.status(200).json({ data: users, message: 'Users retrieved successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving users' });
        }
    }

    public async searchById(req: Request, res: Response){
        try{
            const id = req.params.id.toString()
            const user = await this.userDAO.searchById(id);
            res.status(200).json({ data: user, message: 'Users retrieved successfully' });
        }catch (error) {
            res.status(500).json({ error: 'Error retrieving user'})
        }
    }
}