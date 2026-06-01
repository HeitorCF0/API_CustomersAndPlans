import { Router } from 'express';
import  userRoutes  from './user.routes'
import customerRoutes from './customer.routes'
import emailRoutes from './email.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/customer', customerRoutes)
routes.use('/email', emailRoutes)

export default routes;