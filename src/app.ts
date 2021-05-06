import express from 'express';
import customerRouter from './customerService/customerRoutes';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default class App {
    private express: express.Application;

    private port: number = process.env.PORT ? Number(process.env.PORT) : 8080;

    constructor() {
        this.express = express();
        this.listen();
        this.midlewares();
        this.routes();
    }

    private midlewares(): void {
        this.express.use(express.json());
    }

    public getApp(): express.Application {
        return this.express;
    }

    private listen(): void {
        this.express.listen(this.port, () => {
            console.log(`servidor rodando na porta ${this.port}`);
        });
    }

    private routes(): void {
        this.express.use('/customer', customerRouter);
    }
}
