import { Router } from 'express';
import { PlanControle } from '../controle/plan.controle'
import { PlanService } from '../service/plan.service'
import { PlanDAO } from '../dao/plan.dao'

const planRoutes = Router();
const planDAO = new PlanDAO();
const planService = new PlanService(planDAO)
const planControle = new PlanControle(planService)

planRoutes
    .route('/')
    .post(async (req, res) => planControle.create(req, res))
    .get(async (req, res) => planControle.searchAll(req, res));

planRoutes
    .route('/:id')
    .get(async (req, res) => planControle.searchById(req, res))
    .put(async (req, res) => planControle.update(req, res))
    .delete(async (req, res) => planControle.delete(req, res))

export default planRoutes;