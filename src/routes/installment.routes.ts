import { Router } from 'express';
import { InstallmentControle } from '../controle/installment.controle'
import { InstallmentService } from '../service/installment.service'
import { InstallmentDAO } from '../dao/installment.dao'
import authToken, { requireAdmin } from '../../middleware';

const installmentRoutes = Router();
const installmentDAO = new InstallmentDAO();
const installmentService = new InstallmentService(installmentDAO)
const installmentControle = new InstallmentControle(installmentService)

installmentRoutes
    .route('/')
    .post(authToken, requireAdmin, async (req, res) => installmentControle.create(req, res))
    .get(authToken, async (req, res) => installmentControle.searchAll(req, res));

installmentRoutes
    .route('/:id')
    .get(authToken, async (req, res) => installmentControle.searchById(req, res))
    .put(authToken, requireAdmin, async (req, res) => installmentControle.update(req, res))
    .delete(authToken, requireAdmin, async (req, res) => installmentControle.delete(req, res))

export default installmentRoutes;