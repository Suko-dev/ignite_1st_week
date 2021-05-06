import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { ICustomer, IStatement, Transactions } from './customerInterfaces';
import { customers } from './customerModel';

class CustomerController {
    public async setStatment(req: Request, res: Response): Promise<Response> {
        try {
            const { description, amount }: IStatement = req.body;
            const { customer } = req;
            customer?.statement.push({
                description,
                amount,
                createdAt: new Date(),
                type: Transactions.deposit,
            });
            return res.status(200).json(customer?.statement);
        } catch (error) {
            return res.status(500).json({ erro: error });
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { cpf, name }: ICustomer = req.body;
            const customerAlreadyExists = customers.some((item) => {
                return item.cpf === cpf;
            });

            if (customerAlreadyExists) {
                return res
                    .status(400)
                    .json({ erro: 'customer already exists' });
            }
            const id = uuid();
            const customer: ICustomer = { cpf, name, id, statement: [] };
            customers.push(customer);
            return res.status(200).json(customer);
        } catch (err) {
            return res.status(400).json({ erro: err });
        }
    }

    public async getStatment(req: Request, res: Response): Promise<Response> {
        try {
            const { customer } = req;
            if (customer) {
                return res.status(200).json(customer.statement);
            }
            return res.status(204).json({ error: 'customer not found' });
        } catch (error) {
            return res.status(400).json({ erro: error });
        }
    }
}

export default CustomerController;