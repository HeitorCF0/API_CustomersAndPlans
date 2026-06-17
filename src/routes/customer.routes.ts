import { Router } from 'express';
import { CustomerControle } from '../controle/customer.controle'
import { CustomerService } from '../service/customer.service'
import { CustomerDAO } from '../dao/customer.dao'
import authToken, { requireAdmin } from '../../middleware';

const customerRoutes = Router();
const customerDAO = new CustomerDAO();
const customerService = new CustomerService(customerDAO)
const customerControle = new CustomerControle(customerService)

customerRoutes
    .route('/')
    .post(authToken, async (req, res) => customerControle.create(req, res))
    .get(authToken, async (req, res) => customerControle.searchAll(req, res));

customerRoutes
    .route('/:id')
    .get(authToken, async (req, res) => customerControle.searchById(req, res))
    .put(authToken, async (req, res) => customerControle.update(req, res))
    .delete(authToken, requireAdmin, async (req, res) => customerControle.delete(req, res))

export default customerRoutes;