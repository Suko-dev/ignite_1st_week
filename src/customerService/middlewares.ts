import { NextFunction, Request, Response } from 'express';
import { customers } from './model';

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
}

export default new CustomerMiddlewares();
