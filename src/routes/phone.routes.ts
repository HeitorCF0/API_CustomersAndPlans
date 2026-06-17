import { Router } from 'express';
import { PhoneControle } from '../controle/phone.controle'
import { PhoneService } from '../service/phone.service'
import { PhoneDAO } from '../dao/phone.dao'
import authToken from '../../middleware';

const phoneRoutes = Router();
const phoneDAO = new PhoneDAO();
const phoneService = new PhoneService(phoneDAO)
const phoneControle = new PhoneControle(phoneService)

phoneRoutes
    .route('/')
    .post(authToken, async (req, res) => phoneControle.create(req, res))
    .get(authToken, async (req, res) => phoneControle.searchAll(req, res));

phoneRoutes
    .route('/:id')
    .get(authToken, async (req, res) => phoneControle.searchByCustomerId(req, res))
    .put(authToken, async (req, res) => phoneControle.update(req, res))
    .delete(authToken, async (req, res) => phoneControle.delete(req, res))

export default phoneRoutes;