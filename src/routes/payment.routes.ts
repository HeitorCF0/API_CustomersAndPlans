import { Router } from 'express';
import { PaymentControle } from '../controle/payment.controle'
import { PaymentService } from '../service/payment.service'
import { PaymentDAO } from '../dao/payment.dao'

const paymentRoutes = Router();
const paymentDAO = new PaymentDAO();
const paymentService = new PaymentService(paymentDAO)
const paymentControle = new PaymentControle(paymentService)

paymentRoutes
    .route('/')
    .post(async (req, res) => paymentControle.create(req, res))
    .get(async (req, res) => paymentControle.searchAll(req, res));

paymentRoutes
    .route('/:id')
    .get(async (req, res) => paymentControle.searchById(req, res))
    .put(async (req, res) => paymentControle.update(req, res))
    .delete(async (req, res) => paymentControle.delete(req, res));

paymentRoutes
    .route('/installment/:installmentId')
    .get(async (req, res) => paymentControle.searchByInstallmentId(req, res))
    .delete(async (req, res) => paymentControle.deleteByInstallmentId(req, res));

paymentRoutes
    .route('/customer/:customerId')
    .get(async (req, res) => paymentControle.searchByCustomerId(req, res));

paymentRoutes
    .route('/plan/:planId')
    .get(async (req, res) => paymentControle.searchByPlanId(req, res));

export default paymentRoutes;
