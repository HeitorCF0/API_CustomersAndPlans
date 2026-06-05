import { Request, Response } from 'express';
import { AddressService } from "../service/address.service";
import { AddressCreateDTO, AddressUpdateDTO } from "../dto/address.dto";
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class AddressControle{
    private addressService: AddressService;

    constructor(addressService: AddressService) {
        this.addressService = addressService;
    }

    public async create(req: Request, res: Response) {
        try {
            const addressCreateDTO = plainToInstance(AddressCreateDTO, req.body);
            const errors = await validate(addressCreateDTO);

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            await this.addressService.create(addressCreateDTO);
            res.status(201).json({ message: 'Address created successfully'});
        } catch (error: any) {
            console.error('Error creating address:', error);
            res.status(500).json({ error: error.message || 'Error creating address' });
        }
    }

    public async searchAll(req: Request, res: Response) {
        try {
            const addressDTO = await this.addressService.searchAll();
            res.status(200).json(addressDTO);
        } catch (error: any) {
            console.error('Error searching addres:', error);
            res.status(500).json({ error: error.message || 'Error searching addresses' });
        }
    }

    public async searchByCustomerId(req: Request, res: Response) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const addressDTO = await this.addressService.searchByCustomerId(id);
            res.status(200).json(addressDTO);
        } catch (error: any) {
            console.error('Error searching address:', error);
            res.status(500).json({ error: error.message || 'Error searching address' });
        }
    }

    public async update (req: Request, res: Response) {
        try{
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const newAddress = plainToInstance(AddressUpdateDTO, req.body);
            await this.addressService.update(id, newAddress);
            res.status(200).json({ message: 'Address updated successfully' });
        } catch (error: any) {
            console.error('Error updating address:', error);
            res.status(500).json({ error: error.message || 'Error updating address' });
        }
    }

    public async delete (req: Request, res: Response) {
        try{
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            await this.addressService.delete(id);
            res.status(200).json({ message: 'Address deleted successfully' });
        } catch (error: any) {
            console.error('Error deleting address:', error);
            res.status(500).json({ error: error.message || 'Error deleting address' });
        }
    }
}