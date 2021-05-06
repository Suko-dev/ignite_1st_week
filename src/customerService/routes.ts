import { Router } from 'express';
// eslint-disable-next-line import/extensions
import UserController from './userController';
import CustomerMiddleware from './middlewares';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/account', userController.create);
userRouter.get(
    '/statment',
    CustomerMiddleware.verifyIfExistsAccountCPF,
    userController.getStatment
);

export default userRouter;
