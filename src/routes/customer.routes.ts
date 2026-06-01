import { Router } from 'express';
import { CustomerControle } from '../controle/customer.controle'
import { CustomerService } from '../service/customer.service'
import { CustomerDAO } from '../dao/customer.dao'

const customerRoutes = Router();
const customerDAO = new CustomerDAO();
const customerService = new CustomerService(customerDAO)
const customerControle = new CustomerControle(customerService)

customerRoutes
    .route('/')
    .post(async (req, res) => customerControle.create(req, res))
    .get(async (req, res) => customerControle.searchAll(req, res));

customerRoutes
    .route('/:id')
    .get(async (req, res) => customerControle.searchById(req, res))
    .put(async (req, res) => customerControle.update(req, res))
    .delete(async (req, res) => customerControle.delete(req, res))

export default customerRoutes;