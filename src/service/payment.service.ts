import { PaymentDAO } from '../dao/payment.dao';
import { PaymentCreateDTO, PaymentListDTO, PaymentListByIdDTO, PaymentUpdateDTO } from '../dto/payment.dto'
import { Payment, paymentStatus, paymentMethod } from '../model/payment';

export class PaymentService {
    public constructor (private readonly paymentDAO: PaymentDAO) {}

    public async create(paymentCreateDTO: PaymentCreateDTO) {
        try {
            const payment = Payment.construct(
                paymentCreateDTO.installmentId,
                paymentCreateDTO.amount,
                paymentCreateDTO.paymentMethod as paymentMethod,
                paymentCreateDTO.status as paymentStatus,
                paymentCreateDTO.comment || null
            );

            await this.paymentDAO.create(payment);
        } catch (error) {
            throw error;
        }
    }

    public async searchAll(): Promise<PaymentListDTO[] | null> {
        try {
            const paymentDTO: PaymentListDTO[] | null = await this.paymentDAO.searchAll();
            if (paymentDTO) {
                return paymentDTO;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    public async searchById(id: string): Promise<PaymentListByIdDTO | null> {
        try {
            const paymentInfo: PaymentListByIdDTO | null = await this.paymentDAO.searchById(id);
            if (paymentInfo) {
                return paymentInfo;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    public async searchByInstallmentId(installmentId: string): Promise<PaymentListByIdDTO[] | null> {
        try {
            const payments = await this.paymentDAO.searchByInstallmentId(installmentId);
            if (payments) {
                return payments;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    public async searchByCustomerId(customerId: string): Promise<PaymentListByIdDTO[] | null> {
        try {
            const payments = await this.paymentDAO.searchByCustomerId(customerId);
            if (payments) {
                return payments;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    public async searchByPlanId(planId: string): Promise<PaymentListByIdDTO[] | null> {
        try {
            const payments = await this.paymentDAO.searchByPlanId(planId);
            if (payments) {
                return payments;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    public async update(id: string, paymentUpdateDTO: PaymentUpdateDTO) {
        try {
            const existingPayment = await this.paymentDAO.searchById(id);
            if (!existingPayment) {
                throw new Error('Payment not found');
            }

            const payment = Payment.reconstruct({
                id: existingPayment.id,
                installmentId: existingPayment.installmentId,
                amount: paymentUpdateDTO.amount ?? existingPayment.amount,
                status: (paymentUpdateDTO.status ?? existingPayment.status) as paymentStatus,
                paymentMethod: (paymentUpdateDTO.paymentMethod ?? existingPayment.paymentMethod) as paymentMethod,
                comment: paymentUpdateDTO.comment !== undefined ? paymentUpdateDTO.comment : existingPayment.comment,
                paidDate: existingPayment.paidDate,
            });

            await this.paymentDAO.update(payment);
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string) {
        try {
            await this.paymentDAO.delete(id);
        } catch (error) {
            throw error;
        }
    }

    public async deleteByInstallmentId(installmentId: string) {
        try {
            await this.paymentDAO.deleteByInstallmentId(installmentId);
        } catch (error) {
            throw error;
        }
    }

    public async deleteByCustomerId(customerId: string) {
        try {
            await this.paymentDAO.deleteByCustomerId(customerId);
        } catch (error) {
            throw error;
        }
    }

    public async deleteByPlanId(planId: string) {
        try {
            await this.paymentDAO.deleteByPlanId(planId);
        } catch (error) {
            throw error;
        }
    }
}
