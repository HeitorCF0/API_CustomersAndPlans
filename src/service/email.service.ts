import { Email } from '../model/email';
import { EmailDAO } from '../dao/email.dao'
import { EmailCreateDTO, EmailUpdateDTO } from '../dto/email.dto';
import { CustomerDAO } from '../dao/customer.dao';
import { Customer } from '../model/customer';

export class EmailService {
    public constructor (private readonly emailDAO: EmailDAO) {}

    public async create(emailCreateDTO: EmailCreateDTO){
        try{
            if(!await this.customerExists(emailCreateDTO.customerId)){
                throw new Error("Customer not found");
            }

            const email = Email.construct(emailCreateDTO);

            await this.emailDAO.create(email)
        }catch (error){
            throw error
        }
    }

    public async searchAll() {
        try{
            const emailDTO = await this.emailDAO.searchAll();
            return emailDTO;
        }catch (error){
            throw error
        }
    }

    public async update(id: string, newEmail: EmailUpdateDTO) {
        try{
            await this.emailDAO.update(id, newEmail);
        }catch (error){
            throw error
        }
    }

    public async delete(id: string) {
        try{
            await this.emailDAO.delete(id);
        }catch (error){
            throw error
        }
    }

    public async customerExists(customerId: string): Promise<boolean> {
        const customerDAO = new CustomerDAO();
        const result = await customerDAO.searchById(customerId);
        return result !== null;
    }
}