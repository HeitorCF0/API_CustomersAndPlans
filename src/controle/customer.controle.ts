import { Request, Response } from 'express';
import { CustomerService } from "../service/customer.service";
import { CustomerCreateDTO, CustomerUpdateDTO } from '../dto/customer.dto'
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class CustomerControle {
    private customerService: CustomerService;

    constructor(customerService: CustomerService) {
        this.customerService = customerService;
    }

    public async create(req: Request, res: Response) {
        try {
            const customerCreateDTO = plainToInstance(CustomerCreateDTO, req.body);
            const errors = await validate(customerCreateDTO);

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            await this.customerService.create(customerCreateDTO);
            res.status(201).json({ message: 'User created successfully'});
        } catch (error: any) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: error.message || 'Error creating user' });
        }
    }

    public async searchAll(req: Request, res:Response){
        const customerDTO = await this.customerService.searchAll()
        res.status(200).json(customerDTO).send()
    }

    public async searchById(req: Request, res:Response){
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const customer = await this.customerService.searchById(id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(customer);
    }

    public async update(req: Request, res: Response) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const customerUpdateDTO = plainToInstance(CustomerUpdateDTO, req.body);
            const errors = await validate(customerUpdateDTO);

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            await this.customerService.update(id, customerUpdateDTO);
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
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            await this.customerService.delete(id);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error: any) {
            console.error('Error deleting user:', error);
            if (error.message === 'User not found') {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(500).json({ error: error.message || 'Error deleting user' });
        }
    }
}