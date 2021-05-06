import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { ICustomer, IStatement, Transactions } from './customerInterfaces';
import { customers } from './customerModel';

class CustomerController {
    public getBallance(statment: Array<IStatement>): number {
        return statment.reduce((acc, item) => {
            if (item.type === Transactions.credit) {
                return acc + Number(item.amount);
            }
            return acc - Number(item.amount);
        }, 0);
    }

    public async deposit(req: Request, res: Response): Promise<Response> {
        try {
            const { description, amount }: IStatement = req.body;
            const { customer } = req;
            const statement: IStatement = {
                description,
                amount,
                createdAt: new Date(),
                type: Transactions.credit,
            };
            customer?.statement.push(statement);
            return res.status(200).json(statement);
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
            if (req.query.date) {
                const { date } = req.query;
                const dateformat = new Date(`${date} 00:00`);
                const statement = customer?.statement.filter((element) => {
                    return (
                        element.createdAt.toDateString() ===
                        new Date(dateformat).toDateString()
                    );
                });
                return res.status(200).json(statement);
            }
            return res.status(200).json(customer?.statement);
        } catch (error) {
            return res.status(400).json({ erro: error });
        }
    }

    public async withdraw(req: Request, res: Response): Promise<Response> {
        try {
            const { description, amount }: IStatement = req.body;
            const { customer } = req;
            const statement: IStatement = {
                description,
                amount,
                createdAt: new Date(),
                type: Transactions.debit,
            };
            customer?.statement.push(statement);
            return res.status(200).json(statement);
        } catch (error) {
            return res.status(500).json({ erro: error });
        }
    }

    public async editAccount(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.body;
            const { customer } = req;
            customer.name = name;
            return res.status(200).json(customer?.name);
        } catch (error) {
            return res.status(500).json({ erro: error });
        }
    }

    public async findAccount(req: Request, res: Response): Promise<Response> {
        try {
            const { customer } = req;
            return res.status(200).json(customer);
        } catch (error) {
            return res.status(500).json({ erro: error });
        }
    }

    public async deletAccount(req: Request, res: Response): Promise<Response> {
        try {
            const { customer } = req;
            const id = customers.findIndex((item) => {
                return item.id === customer?.id;
            });
            customers.splice(id, 1);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ erro: error });
        }
    }

    public async sendBallance(req: Request, res: Response): Promise<Response> {
        try {
            const { customer } = req;
            const ballance = new CustomerController().getBallance(
                customer?.statement
            );
            return res.status(200).json(ballance);
        } catch (error) {
            return res.status(500).json({ erro: error });
        }
    }
}

export default CustomerController;
