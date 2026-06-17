import { Router } from 'express';
import { PaymentControle } from '../controle/payment.controle'
import { PaymentService } from '../service/payment.service'
import { PaymentDAO } from '../dao/payment.dao'
import authToken, { requireAdmin } from '../../middleware';

const paymentRoutes = Router();
const paymentDAO = new PaymentDAO();
const paymentService = new PaymentService(paymentDAO)
const paymentControle = new PaymentControle(paymentService)

paymentRoutes
    .route('/')
    .post(authToken,  async (req, res) => paymentControle.create(req, res))
    .get(authToken, async (req, res) => paymentControle.searchAll(req, res));

paymentRoutes
    .route('/:id')
    .get(authToken, async (req, res) => paymentControle.searchById(req, res))
    .put(authToken, async (req, res) => paymentControle.update(req, res))
    .delete(authToken, requireAdmin, async (req, res) => paymentControle.delete(req, res));

paymentRoutes
    .route('/installment/:installmentId')
    .get(authToken, async (req, res) => paymentControle.searchByInstallmentId(req, res))
    .delete(authToken, requireAdmin, async (req, res) => paymentControle.deleteByInstallmentId(req, res));

paymentRoutes
    .route('/customer/:customerId')
    .get(authToken, async (req, res) => paymentControle.searchByCustomerId(req, res));

paymentRoutes
    .route('/plan/:planId')
    .get(authToken, async (req, res) => paymentControle.searchByPlanId(req, res));

export default paymentRoutes;
