import { Request, Response } from 'express';
import { PhoneService } from "../service/phone.service";
import { PhoneCreateDTO, PhoneUpdateDTO } from "../dto/phone.dto";
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class PhoneControle{
    private phoneService: PhoneService;

    constructor(phoneService: PhoneService) {
        this.phoneService = phoneService;
    }

    public async create(req: Request, res: Response) {
        try {
            const phoneCreateDTO = plainToInstance(PhoneCreateDTO, req.body);
            const errors = await validate(phoneCreateDTO);

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            await this.phoneService.create(phoneCreateDTO);
            res.status(201).json({ message: 'Phone created successfully'});
        } catch (error: any) {
            console.error('Error creating phone:', error);
            res.status(500).json({ error: error.message || 'Error creating phone' });
        }
    }

    public async searchAll(req: Request, res: Response) {
        try {
            const phoneDTO = await this.phoneService.searchAll();
            res.status(200).json(phoneDTO);
        } catch (error: any) {
            console.error('Error searching phones:', error);
            res.status(500).json({ error: error.message || 'Error searching phones' });
        }
    }

    public async update (req: Request, res: Response) {
        try{
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const newPhone = plainToInstance(PhoneUpdateDTO, req.body);
            await this.phoneService.update(id, newPhone);
            res.status(200).json({ message: 'Phone updated successfully' });
        } catch (error: any) {
            console.error('Error updating phone:', error);
            res.status(500).json({ error: error.message || 'Error updating phone' });
        }
    }

    public async delete (req: Request, res: Response) {
        try{
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            await this.phoneService.delete(id);
            res.status(200).json({ message: 'Phone deleted successfully' });
        } catch (error: any) {
            console.error('Error deleting phone:', error);
            res.status(500).json({ error: error.message || 'Error deleting phone' });
        }
    }
}