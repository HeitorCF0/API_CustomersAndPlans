import { Router } from 'express';
import { SubscriptionControle } from '../controle/subscription.controle'
import { SubscriptionService } from '../service/subscription.service'
import { SubscriptionDAO } from '../dao/subscription.dao'

const subscriptionRoutes = Router();
const subscriptionDAO = new SubscriptionDAO();
const subscriptionService = new SubscriptionService(subscriptionDAO)
const subscriptionControle = new SubscriptionControle(subscriptionService)

subscriptionRoutes
    .route('/')
    .post(async (req, res) => subscriptionControle.create(req, res))
    .get(async (req, res) => subscriptionControle.searchAll(req, res));

subscriptionRoutes
    .route('/:id')
    .get(async (req, res) => subscriptionControle.searchById(req, res))
    .put(async (req, res) => subscriptionControle.updateState(req, res))
    .delete(async (req, res) => subscriptionControle.delete(req, res))

export default subscriptionRoutes;