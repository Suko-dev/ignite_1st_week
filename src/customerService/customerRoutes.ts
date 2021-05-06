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
    customerController.deposit
);
customerRouter.post(
    '/withdraw',
    CustomerMiddleware.verifyIfExistsAccountCPF,
    CustomerMiddleware.verifyIfBallanceIsEnough,
    customerController.withdraw
);
customerRouter.put(
    '/account',
    CustomerMiddleware.verifyIfExistsAccountCPF,
    customerController.editAccount
);
customerRouter.get(
    '/account',
    CustomerMiddleware.verifyIfExistsAccountCPF,
    customerController.findAccount
);
customerRouter.delete(
    '/account',
    CustomerMiddleware.verifyIfExistsAccountCPF,
    customerController.deletAccount
);
customerRouter.get(
    '/ballance',
    CustomerMiddleware.verifyIfExistsAccountCPF,
    customerController.sendBallance
);

export default customerRouter;
