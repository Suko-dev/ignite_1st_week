import { Router } from 'express';
// eslint-disable-next-line import/extensions
import UserController from './userController';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/account', userController.create);
userRouter.get('/statment', userController.getStatment);

export default userRouter;
