import { Router } from 'express';
import { SubscriptionControle } from '../controle/subscription.controle'
import { SubscriptionService } from '../service/subscription.service'
import { SubscriptionDAO } from '../dao/subscription.dao'
import authToken, { requireAdmin } from '../../middleware';

const subscriptionRoutes = Router();
const subscriptionDAO = new SubscriptionDAO();
const subscriptionService = new SubscriptionService(subscriptionDAO)
const subscriptionControle = new SubscriptionControle(subscriptionService)

subscriptionRoutes
    .route('/')
    .post(authToken, async (req, res) => subscriptionControle.create(req, res))
    .get(authToken,  async (req, res) => subscriptionControle.searchAll(req, res));

subscriptionRoutes
    .route('/:id')
    .get(authToken, async (req, res) => subscriptionControle.searchById(req, res))
    .put(authToken,  async (req, res) => subscriptionControle.updateState(req, res))
    .delete(authToken, requireAdmin, async (req, res) => subscriptionControle.delete(req, res))

export default subscriptionRoutes;