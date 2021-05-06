import { Router } from 'express';
// eslint-disable-next-line import/extensions
import UserController from './userController';

const userRouter = Router();

userRouter.post('/account', new UserController().create);
userRouter.get('/statment', new UserController().statment);

export default userRouter;
