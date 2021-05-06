import { Router } from 'express';
// eslint-disable-next-line import/extensions
import CustomerController from './customerController';
import CustomerMiddleware from './customerMiddlewares';

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.post('/account', customerController.create);
customerRouter.get(
    '/statment',
    CustomerMiddleware.verifyIfExistsAccountCPF,
    customerController.getStatment
);
customerRouter.post(
    '/deposit',
    CustomerMiddleware.verifyIfExistsAccountCPF,
    customerController.setStatment
);

export default customerRouter;
