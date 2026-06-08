import { InstallmentDAO } from '../dao/installment.dao';
import { InstallmentCreateDTO, InstallmentListDTO, InstallmentSearchtByIdDTO, InstallmentUpdateDTO } from '../dto/installment.dto'
import { Installment } from '../model/installment';

export class InstallmentService {
    public constructor (private readonly installmentDAO: InstallmentDAO) {}

    public async create(installmentCreateDTO: InstallmentCreateDTO){
        try{
        const installment = Installment.construct(installmentCreateDTO);

        await this.installmentDAO.create(installment)
        }catch (error){
            throw error
        }
    }

    public async searchAll(): Promise<InstallmentListDTO[] | null> {
        const installmentDTO: InstallmentListDTO[] | null = await this.installmentDAO.searchAll()
        if (installmentDTO) {
            return installmentDTO
        }
        return null
    }

    public async searchById(id: string) {
        const installmentInfo : InstallmentSearchtByIdDTO | null = await this.installmentDAO.searchById(id);
        if (installmentInfo) {
            return installmentInfo;
        }
        return null;
    }

    public async update(id: string, installmentUpdateDTO: InstallmentUpdateDTO) {
        try {
            const existingCustomer = await this.installmentDAO.searchById(id);
            if (!existingCustomer) {
                throw new Error('Customer not found');
            }
            if (installmentUpdateDTO.amount == null) {
                installmentUpdateDTO.amount = existingCustomer.amount
            }
            if (installmentUpdateDTO.dueDate == null) {
                installmentUpdateDTO.dueDate = existingCustomer.dueDate
            }
            if (installmentUpdateDTO.state == null) {
                installmentUpdateDTO.state = existingCustomer.state
            }
            if (installmentUpdateDTO.paidAt == null) {
                installmentUpdateDTO.paidAt = existingCustomer.paidAt
            }

            await this.installmentDAO.update(id, installmentUpdateDTO);
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string) {
        try {
            await this.installmentDAO.delete(id);
        } catch (error) {
            throw error;
        }
    }
}