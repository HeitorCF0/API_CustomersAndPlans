import { AddressDAO } from '../dao/address.dao';
import { CustomerDAO } from '../dao/customer.dao';
import { AddressCreateDTO, AddressListDTO, AddressUpdateDTO } from '../dto/address.dto';
import { Address } from '../model/address';

export class AddressService {
    public constructor (private readonly addressDAO: AddressDAO) {}

    public async create(addressCreateDTO: AddressCreateDTO){
        try{
            if(!await this.customerExists(addressCreateDTO.customerId)){
                throw new Error("Customer not found");
            }

            const address = Address.construct(addressCreateDTO);

            await this.addressDAO.create(address)
        }catch (error){
            throw error
        }
    }

    public async searchAll(): Promise<AddressListDTO[] | null>{
        try{
            const addressDTO: AddressListDTO[] | null = await this.addressDAO.searchAll();

            if (addressDTO) {
                return addressDTO;
            }
            throw new Error("No addresses found");
        }catch (error){
            throw error
        }
    }

    public async searchByCustomerId(customerId: string) {
        try{
            const addressDTO = await this.addressDAO.searchByCustomerId(customerId);

            if (addressDTO) {
                return addressDTO;
            }
            throw new Error("Address not found");
        }catch (error){
            throw error
        }
    }

    public async update(id: string, newAddress: AddressUpdateDTO) {
        try{
            const existingAddress = await this.addressDAO.updateSearchById(id);
            if (!existingAddress) {
                throw new Error('Address not found');
            }
            if (newAddress.street == null) {
                newAddress.street = existingAddress[0].street
            }
            if (newAddress.number == null) {
                newAddress.number = existingAddress[0].number
            }
            if (newAddress.neighborhood == null) {
                newAddress.neighborhood = existingAddress[0].neighborhood
            }
            if (newAddress.city == null) {
                newAddress.city = existingAddress[0].city
            }
            if (newAddress.state == null) {
                newAddress.state = existingAddress[0].state
            }
            if (newAddress.cep == null) {
                newAddress.cep = existingAddress[0].cep
            }
            if (newAddress.complement == null) {
                newAddress.complement = existingAddress[0].complement
            }

            await this.addressDAO.update(id, newAddress);
        }catch (error){
            throw error
        }
    }

    public async delete(id: string) {
        try{
            await this.addressDAO.delete(id);
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