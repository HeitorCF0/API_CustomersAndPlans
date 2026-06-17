import { Router } from 'express';
import { EmailControle } from '../controle/email.controle'
import { EmailService } from '../service/email.service'
import { EmailDAO } from '../dao/email.dao'
import authToken from '../../middleware';

const emailRoutes = Router();
const emailDAO = new EmailDAO();
const emailService = new EmailService(emailDAO)
const emailControle = new EmailControle(emailService)

emailRoutes
    .route('/')
    .post(authToken, async (req, res) => emailControle.create(req, res))
    .get(authToken, async (req, res) => emailControle.searchAll(req, res));

emailRoutes
    .route('/:id')
    .get(authToken, async (req, res) => emailControle.searchByCustomerId(req, res))
    .put(authToken, async (req, res) => emailControle.update(req, res))
    .delete(authToken, async (req, res) => emailControle.delete(req, res))

export default emailRoutes;