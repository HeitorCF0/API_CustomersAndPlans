import { Router } from 'express';
import { AddressControle } from '../controle/address.controle'
import { AddressService } from '../service/address.service'
import { AddressDAO } from '../dao/address.dao'

const addressRoutes = Router();
const addressDAO = new AddressDAO();
const addressService = new AddressService(addressDAO)
const addressControle = new AddressControle(addressService)

addressRoutes
    .route('/')
    .post(async (req, res) => addressControle.create(req, res))
    .get(async (req, res) => addressControle.searchAll(req, res));

addressRoutes
    .route('/:id')
    .get(async (req, res) => addressControle.searchByCustomerId(req, res))
    .put(async (req, res) => addressControle.update(req, res))
    .delete(async (req, res) => addressControle.delete(req, res))

export default addressRoutes;