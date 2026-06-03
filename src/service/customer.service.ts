import { CustomerDAO } from '../dao/customer.dao'
import { CustomerCreateDTO, CustomerSearchByIdDTO, CustomersListDTO, CustomerUpdateDTO } from '../dto/customer.dto'
import { Customer } from '../model/customer';

export class CustomerService {
    public constructor (private readonly customerDAO: CustomerDAO) {}

    public async create(customerCreateDTO: CustomerCreateDTO){
        try{
        const user = Customer.construct(customerCreateDTO);

        await this.customerDAO.create(user)
        }catch (error){
            throw error
        }
    }

    public async searchAll(): Promise<CustomersListDTO[] | null> {
        const customerDTO: CustomersListDTO[] | null = await this.customerDAO.searchAll()
        if (customerDTO) {
            return customerDTO
        }
        return null
    }

    public async searchById(id: string) {
        const customerInfo = await this.customerDAO.searchById(id);
        if (customerInfo) {
            const customer = [customerInfo.customer, customerInfo.email[0], customerInfo.phone[0], customerInfo.address[0]]
            return customer;
        }
        return null;
    }

    public async update(id: string, customerUpdateDTO: CustomerUpdateDTO) {
        try {
            const existingUser = await this.customerDAO.updateSearchById(id);
            if (!existingUser) {
                throw new Error('User not found');
            }
            if (customerUpdateDTO.name == null) {
                customerUpdateDTO.name = existingUser[0].name
            }
            if (customerUpdateDTO.status == null) {
                customerUpdateDTO.status = existingUser[0].status
            }

            await this.customerDAO.update(id, customerUpdateDTO);
        } catch (error) {
            throw error;
        }
    }
}
