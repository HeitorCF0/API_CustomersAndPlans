import { Router } from 'express';
import  userRoutes  from './user.routes'
import customerRoutes from './customer.routes'
import emailRoutes from './email.routes';
import phoneRoutes from './phone.routes';
import addressRoutes from './address.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/customer', customerRoutes)
routes.use('/email', emailRoutes)
routes.use('/phone', phoneRoutes)
routes.use('/address', addressRoutes)

export default routes;