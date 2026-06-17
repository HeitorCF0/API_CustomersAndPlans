import { Router } from 'express';
import { AddressControle } from '../controle/address.controle'
import { AddressService } from '../service/address.service'
import { AddressDAO } from '../dao/address.dao'
import authToken from '../../middleware';

const addressRoutes = Router();
const addressDAO = new AddressDAO();
const addressService = new AddressService(addressDAO)
const addressControle = new AddressControle(addressService)

addressRoutes
    .route('/')
    .post(authToken, async (req, res) => addressControle.create(req, res))
    .get(authToken, async (req, res) => addressControle.searchAll(req, res));

addressRoutes
    .route('/:id')
    .get(authToken, async (req, res) => addressControle.searchByCustomerId(req, res))
    .put(authToken, async (req, res) => addressControle.update(req, res))
    .delete(authToken, async (req, res) => addressControle.delete(req, res))

export default addressRoutes;