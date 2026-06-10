import { Router } from 'express';
import { UserControle } from '../controle/user.controle'
import { UserService } from '../service/user.service'
import { UserDAO } from '../dao/user.dao'
import authToken from '../../middleware';

const userRoutes = Router();
const userDAO = new UserDAO();
const userService = new UserService(userDAO)
const userControle = new UserControle(userService)

// Rota pública - Login
userRoutes
    .route('/login')
    .post(async (req, res) => userControle.login(req, res))

// Rota pública - Criar novo usuário
userRoutes
    .route('/')
    .post(async (req, res) => userControle.create(req, res))
    // Rota protegida - Listar todos os usuários
    .get(authToken, async (req, res) => userControle.searchAll(req, res));

// Rotas protegidas - Operações por ID
userRoutes
    .route('/:id')
    .get(authToken, async (req, res) => userControle.searchById(req, res))
    .put(authToken, async (req, res) => userControle.update(req, res))
    .delete(authToken, async (req, res) => userControle.delete(req, res))

export default userRoutes;