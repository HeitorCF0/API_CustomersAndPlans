import { CustomerDAO } from '../dao/customer.dao'
import { EmailDAO } from '../dao/email.dao';
import { PhoneDAO } from '../dao/phone.dao';
import { SubscriptionDAO } from '../dao/subscription.dao';
import { AddressDAO } from '../dao/address.dao';
import { CustomerCreateDTO, CustomersListDTO, CustomerUpdateDTO } from '../dto/customer.dto'
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
            const customer = [customerInfo.customer[0], customerInfo.email[0], customerInfo.phone[0], customerInfo.address[0]]
            return customer;
        }
        return null;
    }

    public async update(id: string, customerUpdateDTO: CustomerUpdateDTO) {
        try {
            const existingCustomer = await this.customerDAO.updateSearchById(id);
            if (!existingCustomer) {
                throw new Error('Customer not found');
            }
            if (customerUpdateDTO.name == null) {
                customerUpdateDTO.name = existingCustomer[0].name
            }
            if (customerUpdateDTO.status == null) {
                customerUpdateDTO.status = existingCustomer[0].status
            }

            await this.customerDAO.update(id, customerUpdateDTO);
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string) {
        try {
            const customerExists = await this.customerDAO.searchById(id);
            if (!customerExists) {
                throw new Error('Customer not found');
            }

            if (await this.customerHasSubscription(id)) {
                throw new Error('Customer has associated subscription')
            }

            if (await this.customerHasEmail(id)) {
                try {
                    const emailDao = new EmailDAO();
                    await emailDao.deleteByCustomerId(id);
                } catch (error) {
                    throw error;
                }
            }
            if (await this.customerHasPhone(id)) {
                try {
                    const phoneDao = new PhoneDAO();
                    await phoneDao.deleteByCustomerId(id);
                } catch (error) {
                    throw error;
                }
            }
            if (await this.customerHasAddress(id)) {
                try {
                    const addressDao = new AddressDAO();
                    await addressDao.deleteByCustomerId(id);
                } catch (error) {
                    throw error;
                }
            }
            await this.customerDAO.delete(id);
        } catch (error) {
            throw error;
        }
    }

    public async customerHasEmail(id: string): Promise<boolean> {
        try {
            const customerInfo = await this.customerDAO.searchById(id);
            if (customerInfo && customerInfo.email && customerInfo.email.length > 0) {
                return true;
            }
            return false;
        } catch (error) {
            throw error;
        }
    }

    public async customerHasPhone(id: string): Promise<boolean> {
        try {
            const customerInfo = await this.customerDAO.searchById(id);
            if (customerInfo && customerInfo.phone && customerInfo.phone.length > 0) {
                return true;
            }
            return false;
        } catch (error) {
            throw error;
        }
    }

    public async customerHasAddress(id: string): Promise<boolean> {
        try {
            const customerInfo = await this.customerDAO.searchById(id);
            if (customerInfo && customerInfo.address && customerInfo.address.length > 0) {
                return true;
            }
            return false;
        } catch (error) {
            throw error;
        }
    }

    public async customerHasSubscription(id: string): Promise<boolean> {
        try {
            const subscriptionDAO = new SubscriptionDAO();
            const subscriptions = await subscriptionDAO.searchByCustomerId(id);
            if (subscriptions && subscriptions.length > 0) {
                return true;
            }
            return false;
        } catch (error) {
            throw error;
        }
    }
}
