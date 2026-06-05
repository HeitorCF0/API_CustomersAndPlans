import { Request, Response } from 'express';
import { EmailCreateDTO, EmailUpdateDTO } from '../dto/email.dto';
import { EmailService } from '../service/email.service'
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class EmailControle {
    private emailService: EmailService;

    constructor(emailService: EmailService) {
        this.emailService = emailService;
    }

    public async create(req: Request, res: Response) {
        try {
            const emailCreateDTO = plainToInstance(EmailCreateDTO, req.body);
            const errors = await validate(emailCreateDTO);

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            await this.emailService.create(emailCreateDTO);
            res.status(201).json({ message: 'Email created successfully'});
        } catch (error: any) {
            console.error('Error creating email:', error);
            res.status(500).json({ error: error.message || 'Error creating email' });
        }
    }

    public async searchAll(req: Request, res: Response) {
        try {
            const emailDTO = await this.emailService.searchAll();
            res.status(200).json(emailDTO);
        } catch (error: any) {
            console.error('Error searching emails:', error);
            res.status(500).json({ error: error.message || 'Error searching emails' });
        }
    }

    public async searchByCustomerId(req: Request, res: Response) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const emailDTO = await this.emailService.searchByCustomerId(id);
            res.status(200).json(emailDTO);
        } catch (error: any) {
            console.error('Error searching email by customer ID:', error);
            res.status(500).json({ error: error.message || 'Error searching email by customer ID' });
        }
    }

    public async update (req: Request, res: Response) {
        try{
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const newEmail = plainToInstance(EmailUpdateDTO, req.body);
            await this.emailService.update(id, newEmail);
            res.status(200).json({ message: 'Email updated successfully' });
        } catch (error: any) {
            console.error('Error updating email:', error);
            res.status(500).json({ error: error.message || 'Error updating email' });
        }
    }

    public async delete (req: Request, res: Response) {
        try{
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            await this.emailService.delete(id);
            res.status(200).json({ message: 'Email deleted successfully' });
        } catch (error: any) {
            console.error('Error deleting email:', error);
            res.status(500).json({ error: error.message || 'Error deleting email' });
        }
    }
}