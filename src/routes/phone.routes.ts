import { Router } from 'express';
import { PhoneControle } from '../controle/phone.controle'
import { PhoneService } from '../service/phone.service'
import { PhoneDAO } from '../dao/phone.dao'

const phoneRoutes = Router();
const phoneDAO = new PhoneDAO();
const phoneService = new PhoneService(phoneDAO)
const phoneControle = new PhoneControle(phoneService)

phoneRoutes
    .route('/')
    .post(async (req, res) => phoneControle.create(req, res))
    .get(async (req, res) => phoneControle.searchAll(req, res));

phoneRoutes
    .route('/:id')
    .get(async (req, res) => phoneControle.searchByCustomerId(req, res))
    .put(async (req, res) => phoneControle.update(req, res))
    .delete(async (req, res) => phoneControle.delete(req, res))

export default phoneRoutes;