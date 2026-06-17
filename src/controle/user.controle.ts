import { Request, Response } from 'express';
import { UserCreateDTO, UserUpdateDTO, UserLoginDTO } from '../dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UserService } from '../service/user.service';
import { PasswordCrypto } from '../service/passwordCrypto';
import { User } from '../model/user';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export class UserControle {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async create(req: Request, res: Response) {
        try {
            const userCreateDTO = plainToInstance(UserCreateDTO, req.body);
            const errors = await validate(userCreateDTO);

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            await this.userService.create(userCreateDTO);
            res.status(201).json({ message: 'User created successfully'});
        } catch (error: any) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: error.message || 'Error creating user' });
        }
    }

    public async searchAll(req: Request, res:Response){
        const userDTO = await this.userService.searchAll()
        res.status(200).json(userDTO);
    }

    public async searchById(req: Request, res:Response){
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        const userDTO = await this.userService.searchById(id);
        res.status(200).json(userDTO);
    }

    public async searchByEmail(email: string){

        const user = await this.userService.searchByEmail(email);
        return user;
    }

    public async update(req: Request, res: Response) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const userUpdateDTO = plainToInstance(UserUpdateDTO, req.body);
            const errors = await validate(userUpdateDTO);

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            await this.userService.update(id, userUpdateDTO);
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error: any) {
            console.error('Error updating user:', error);
            if (error.message === 'User not found') {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(500).json({ error: error.message || 'Error updating user' });
        }
    }

    public async delete(req: Request, res: Response) {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        await this.userService.delete(id);
        res.status(200).json({ message:'User deleted successfully' });
    }

    public async login(req: Request, res: Response) {
        try {
            const userLoginDTO = plainToInstance(UserLoginDTO, req.body);
            const errors = await validate(userLoginDTO);

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            const user = await this.searchByEmail(userLoginDTO.email);

            if (user == null || !(await PasswordCrypto.verifyPassword(userLoginDTO.password, user.password))) {
                return res.status(401).json({ message: 'Incorrect email or password' });
            }

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token, userId: user.id });
        } catch (error: any) {
            console.error('Error during login:', error);
            res.status(500).json({ error: error.message || 'Error during login' });
        }
    }
}