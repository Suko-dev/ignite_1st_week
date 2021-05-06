import { ICustomer } from './customerService/interfaces';

declare global {
    namespace Express {
        interface Request {
            customer?: ICustomer;
        }
    }
}
