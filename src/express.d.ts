import { ICustomer } from './customerService/customerInterfaces';

declare global {
    namespace Express {
        interface Request {
            customer?: ICustomer;
        }
    }
}
