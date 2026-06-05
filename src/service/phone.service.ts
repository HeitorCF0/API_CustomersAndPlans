import { Phone } from "../model/phone"
import { PhoneDAO } from "../dao/phone.dao";
import { PhoneCreateDTO, PhoneListDTO, PhoneUpdateDTO } from "../dto/phone.dto";
import { CustomerDAO } from "../dao/customer.dao";

export class PhoneService {
    public constructor (private readonly phoneDAO: PhoneDAO) {}

    public async create(phoneCreateDTO: PhoneCreateDTO){
        try{
            if(!await this.customerExists(phoneCreateDTO.customerId)){
                throw new Error("Customer not found");
            }

            const phone = Phone.construct(phoneCreateDTO);

            await this.phoneDAO.create(phone)
        }catch (error){
            throw error
        }
    }

    public async searchAll(): Promise<PhoneListDTO[] | null>{
        try{
            const phoneDTO: PhoneListDTO[] | null = await this.phoneDAO.searchAll();

            if (phoneDTO) {
                return phoneDTO;
            }
            throw new Error("No phones found");
        }catch (error){
            throw error
        }
    }

    public async searchByCustomerId(customerId: string) {
        try{
            const phoneDTO = await this.phoneDAO.searchByCustomerId(customerId);

            if (phoneDTO) {
                return phoneDTO;
            }
            throw new Error("Phone not found");
        }catch (error){
            throw error
        }
    }

    public async update(id: string, newPhone: PhoneUpdateDTO) {
        try{
            await this.phoneDAO.update(id, newPhone);
        }catch (error){
            throw error
        }
    }

    public async delete(id: string) {
        try{
            await this.phoneDAO.delete(id);
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