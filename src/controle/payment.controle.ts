import { Request, Response } from 'express';
import { PaymentService } from "../service/payment.service";
import { PaymentCreateDTO, PaymentUpdateDTO } from '../dto/payment.dto'
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class PaymentControle {
    private paymentService: PaymentService;

    constructor(paymentService: PaymentService) {
        this.paymentService = paymentService;
    }

    public async create(req: Request, res: Response) {
        try {
            const paymentCreateDTO = plainToInstance(PaymentCreateDTO, req.body);
            const errors = await validate(paymentCreateDTO);

            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            await this.paymentService.create(paymentCreateDTO);
            res.status(201).json({ message: "Payment created successfully" });
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error creating payment' });
        }
    }

    public async searchAll(req: Request, res: Response) {
        try {
            const paymentListDTO = await this.paymentService.searchAll();
            res.status(200).json(paymentListDTO);
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error searching payments' });
        }
    }

    public async searchById(req: Request, res: Response) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const payment = await this.paymentService.searchById(id);
            if (!payment) {
                return res.status(404).json({ message: "Payment not found" });
            }
            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error searching payment' });
        }
    }

    public async searchByInstallmentId(req: Request, res: Response) {
        try {
            const installmentId = Array.isArray(req.params.installmentId) ? req.params.installmentId[0] : req.params.installmentId;
            const payments = await this.paymentService.searchByInstallmentId(installmentId);
            if (!payments || payments.length === 0) {
                return res.status(404).json({ message: "No payments found for this installment" });
            }
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error searching payments by installment' });
        }
    }

    public async searchByCustomerId(req: Request, res: Response) {
        try {
            const customerId = Array.isArray(req.params.customerId) ? req.params.customerId[0] : req.params.customerId;
            const payments = await this.paymentService.searchByCustomerId(customerId);
            if (!payments || payments.length === 0) {
                return res.status(404).json({ message: "No payments found for this customer" });
            }
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error searching payments by customer' });
        }
    }

    public async searchByPlanId(req: Request, res: Response) {
        try {
            const planId = Array.isArray(req.params.planId) ? req.params.planId[0] : req.params.planId;
            const payments = await this.paymentService.searchByPlanId(planId);
            if (!payments || payments.length === 0) {
                return res.status(404).json({ message: "No payments found for this plan" });
            }
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error searching payments by plan' });
        }
    }

    public async update(req: Request, res: Response) {
        try {            
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const paymentUpdateDTO = plainToInstance(PaymentUpdateDTO, req.body);
            const errors = await validate(paymentUpdateDTO);

            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            await this.paymentService.update(id, paymentUpdateDTO);
            res.status(200).json({ message: "Payment updated successfully" });
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error updating payment' });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            await this.paymentService.delete(id);
            res.status(200).json({ message: "Payment deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error deleting payment' });
        }
    }

    public async deleteByInstallmentId(req: Request, res: Response) {
        try {
            const installmentId = Array.isArray(req.params.installmentId) ? req.params.installmentId[0] : req.params.installmentId;
            await this.paymentService.deleteByInstallmentId(installmentId);
            res.status(200).json({ message: "Payments deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Error deleting payments by installment' });
        }
    }
}
