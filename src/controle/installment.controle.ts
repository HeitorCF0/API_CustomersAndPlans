import { Request, Response } from 'express';
import { InstallmentService } from "../service/installment.service";
import { InstallmentCreateDTO, InstallmentUpdateDTO } from '../dto/installment.dto'
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class InstallmentControle {
    private installmentService: InstallmentService;

    constructor(installmentService: InstallmentService) {
        this.installmentService = installmentService;
    }

    public async create(req: Request, res: Response) {
        try {
            const installmentCreateDTO = plainToInstance(InstallmentCreateDTO, req.body);
            const errors = await validate(installmentCreateDTO);

            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            await this.installmentService.create(installmentCreateDTO);
            res.status(201).json({ message: "Installment created successfully" });
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error creating installment' });
        }
    }

    public async searchAll(req: Request, res: Response) {
        try {
            const intallmentListDTO = await this.installmentService.searchAll();
            res.status(200).json(intallmentListDTO);
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error searching installments' });
        }
    }

    public async searchById(req: Request, res: Response) {
        try {
            const id = Array.isArray(req.params.id)? req.params.id[0] : req.params.id;
            const subscription = await this.installmentService.searchById(id);
            if (!subscription) {
                return res.status(404).json({ message: "Installment not found" });
            }
            res.status(200).json(subscription);
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error searching Installment' });
        }
    }

    public async update(req: Request, res: Response) {
        try {            
            const id = Array.isArray(req.params.id)? req.params.id[0] : req.params.id;
            const newInstallment = plainToInstance(InstallmentUpdateDTO, req.body);
            const errors = await validate(newInstallment);

            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            await this.installmentService.update(id, newInstallment);
            res.status(200).json({ message: "Installment updated successfully" });
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error updating installment' });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const id = Array.isArray(req.params.id)? req.params.id[0] : req.params.id;
            await this.installmentService.delete(id);
            res.status(200).json({ message: "Installment deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error deleting installment' });
        }
    }
}