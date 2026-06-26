import { Router } from 'express';
import { UserControle } from '../controle/user.controle'
import { UserService } from '../service/user.service'
import { UserDAO } from '../dao/user.dao'
import authToken, { requireAdmin } from '../../middleware';

const userRoutes = Router();
const userDAO = new UserDAO();
const userService = new UserService(userDAO)
const userControle = new UserControle(userService)

userRoutes
    .route('/login')
    .post(async (req, res) => userControle.login(req, res))

userRoutes
    .route('/')
    .post(async (req, res) => userControle.create(req, res))
    .get(authToken, requireAdmin, async (req, res) => userControle.searchAll(req, res));

userRoutes
    .route('/:id')
    .get(authToken, requireAdmin, async (req, res) => userControle.searchById(req, res))
    .put(authToken, requireAdmin, async (req, res) => userControle.update(req, res))
    .delete(authToken, requireAdmin, async (req, res) => userControle.delete(req, res))

export default userRoutes;