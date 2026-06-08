import { Router } from 'express';
import  userRoutes  from './user.routes'
import customerRoutes from './customer.routes'
import emailRoutes from './email.routes';
import phoneRoutes from './phone.routes';
import addressRoutes from './address.routes';
import planRoutes from './plan.routes';
import subscriptionRoutes from './subscription.routes';
import installmentRoutes from './installment.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/customer', customerRoutes)
routes.use('/subscription', subscriptionRoutes)
routes.use('/plan', planRoutes)
routes.use('/email', emailRoutes)
routes.use('/phone', phoneRoutes)
routes.use('/address', addressRoutes)
routes.use('/installment', installmentRoutes)

export default routes;