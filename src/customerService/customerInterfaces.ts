// eslint-disable-next-line no-shadow
export enum Transactions {
    credit,
    debit,
}
export interface IStatement {
    description: string;
    amount: string;
    createdAt: Date;
    type: Transactions;
}

export interface ICustomer {
    name: string;
    cpf: string;
    id: string;
    statement: Array<IStatement>;
}
