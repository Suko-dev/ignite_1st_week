import { NextFunction, Request, Response } from 'express';
import CustomerController from './customerController';
import { IStatement } from './customerInterfaces';
import { customers } from './customerModel';

class CustomerMiddlewares {
    public async verifyIfExistsAccountCPF(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { cpf } = req.headers;
            const customer = customers.find((item) => {
                return item.cpf === cpf;
            });
            if (!customer) {
                return res.status(400).json({ erro: 'customer not found' });
            }
            req.customer = customer;
            return next();
        } catch (error) {
            return res.status(500).json({ erro: error });
        }
    }

    public async verifyIfBallanceIsEnough(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { customer } = req;
            const { amount }: IStatement = req.body;
            const Ballance = new CustomerController().getBallance(
                customer.statement
            );
            if (Ballance < Number(amount)) {
                return res.status(400).json({ message: 'insuficient founds' });
            }
            return next();
        } catch (error) {
            return res.status(500).json({ erro: error });
        }
    }
}

export default new CustomerMiddlewares();
