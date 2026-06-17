import { Router } from 'express';
import { PlanControle } from '../controle/plan.controle'
import { PlanService } from '../service/plan.service'
import { PlanDAO } from '../dao/plan.dao'
import authToken, { requireAdmin } from '../../middleware';

const planRoutes = Router();
const planDAO = new PlanDAO();
const planService = new PlanService(planDAO)
const planControle = new PlanControle(planService)

planRoutes
    .route('/')
    .post(authToken, requireAdmin, async (req, res) => planControle.create(req, res))
    .get(authToken, async (req, res) => planControle.searchAll(req, res));

planRoutes
    .route('/:id')
    .get(authToken, async (req, res) => planControle.searchById(req, res))
    .put(authToken, requireAdmin, async (req, res) => planControle.update(req, res))
    .delete(authToken, requireAdmin, async (req, res) => planControle.delete(req, res))

export default planRoutes;