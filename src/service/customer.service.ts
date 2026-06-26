import { CustomerDAO } from '../dao/customer.dao'
import { EmailDAO } from '../dao/email.dao';
import { PhoneDAO } from '../dao/phone.dao';
import { SubscriptionDAO } from '../dao/subscription.dao';
import { AddressDAO } from '../dao/address.dao';
import { CustomerCreateDTO, CustomersListDTO, CustomerUpdateDTO } from '../dto/customer.dto'
import { Customer } from '../model/customer';
import { EmailAndId } from '../dto/email.dto'
import { PhoneAndId } from '../dto/phone.dto'
import { AddressAndId } from '../dto/address.dto'

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
            const customer = [customerInfo.customer[0], customerInfo.email, customerInfo.phone, customerInfo.address]
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

            if (await this.haveActiveSubscriptions(id)) {
                throw new Error('Customer has associated active subscription')
            }

            const [hasEmail, hasPhone, hasAddress] = await this.customerHasInfo(id)

            if (hasEmail == true) {
                try {
                    const emailDao = new EmailDAO();
                    await emailDao.deleteByCustomerId(id);
                } catch (error) {
                    throw error;
                }
            }
            if (hasPhone == true) {
                try {
                    const phoneDao = new PhoneDAO();
                    await phoneDao.deleteByCustomerId(id);
                } catch (error) {
                    throw error;
                }
            }
            if (hasAddress == true) {
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

    public async customerHasInfo(id: string) : Promise<boolean[]>{
        try {
            const customerInfo = await this.customerDAO.searchById(id);
            if (customerInfo != null) {
                const hasEmail = await this.customerHasEmail(customerInfo.email)
                const hasPhone = await this.customerHasPhone(customerInfo.phone)
                const hasAddress = await this.customerHasAddress(customerInfo.address)
                return [hasEmail, hasPhone, hasAddress]
            }
            return [false, false, false];
        } catch (error) {
            throw error;
        }
    }

    public async customerHasEmail(emails: EmailAndId[]) {
        if (emails.length > 0) {
            return true;
        }
        return false;
    }

    public async customerHasPhone(phones: PhoneAndId[]) {
        if (phones.length > 0) {
            return true;
        }
        return false;
    }

    public async customerHasAddress(address: AddressAndId[]) {
        if (address.length > 0) {
            return true;
        }
        return false;
    }

    public async haveActiveSubscriptions(id: string) : Promise <boolean> {
        const subscriptionDAO = new SubscriptionDAO();
        const result = await subscriptionDAO.searchActivesByPlanId(id);
        return result.length > 0;
    }
}
