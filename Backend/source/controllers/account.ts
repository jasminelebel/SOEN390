import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import * as accountService from '../services/account';
import { accountModel } from '../models/account';

const NAMESPACE = 'account/controller';

function handleAccountError(err: Error, res: Response) {
    if (err.message == "email is null") {
        return res.status(400).json({
            status: 400,
            message: "Email needs to be assigned a value"
        })
    } else if (err.message == "password is null") {
        return res.status(400).json({
            status: 400,
            message: "Password needs to be assigned a value"
        })
    } else if (err.message == "type is null") {
        return res.status(400).json({
            status: 400,
            message: "User type needs to be assigned a value"
        })
    } else if (err.message == "account is not admin") {
        return res.status(403).json({
            status: 404,
            message: "You do not have permission to access this ressource"
        })
    } else if (err.message == "account does not exist") {
        return res.status(404).json({
            status: 404,
            message: "There is no existing account associated to this email"
        })
    } else if (err.message == "account exist") {
        return res.status(409).json({
            status: 409,
            message: "An account using this email already exists"
        })
    } else {
        return res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

const registerClient = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Create account');

    // cast request body as account model
    const accountDTO: accountModel = req.body;

    try {
        //  Call to service layer
        await accountService.createAccount(accountDTO);

        // Return a response to client.
        return res.status(200).json({
            status: 200,
            message: "Account created successfully"
        });

    } catch (e) {
        const err = e as Error;
        logging.error(NAMESPACE, err.message);
        return handleAccountError(err, res);
    }
};

const loginClient = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Login to account.');

    // cast request body as account model
    const accountDTO: accountModel = req.body;

    try {
        //  Call to service layer
        const result = await accountService.loginAccount(accountDTO);

        // Return a response to client.
        if (result) {
            return res.status(200).json({
                status: 200,
                message: "login successful",
            })
        } else {
            return res.status(403).json({
                status: 403,
                message: "login failed, wrong username or password"
            })
        }

    } catch (e) {
        const err = e as Error;
        logging.error(NAMESPACE, err.message);
        return handleAccountError(err, res);
    }
};

const registerAdmin = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Create account');

    // cast request body as account model
    const accountDTO: accountModel = req.body;

    try {
        //  Call to service layer
        await accountService.createAccountAdmin(accountDTO);

        // Return a response to client.
        return res.status(200).json({
            status: 200,
            message: "Account created successfully"
        });

    } catch (e) {
        const err = e as Error;
        logging.error(NAMESPACE, err.message);
        return handleAccountError(err, res);
    }
};

const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Login to account.');

    // cast request body as account model
    const accountDTO: accountModel = req.body;

    try {
        //  Call to service layer
        const result = await accountService.loginAccountAdmin(accountDTO);

        // Return a response to client.
        if (result) {
            return res.status(200).json({
                status: 200,
                message: "login successful",
            })
        } else {
            return res.status(403).json({
                status: 403,
                message: "login failed, wrong username or password"
            })
        }

    } catch (e) {
        const err = e as Error;
        logging.error(NAMESPACE, err.message);
        return handleAccountError(err, res);
    }
};

const getAccount = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Retrieving Account from Database');

    // cast request body as account model
    const accountDTO: accountModel = req.body;

    try {
        //  Call to service layer
        const result = await accountService.getAccount(accountDTO);

        // Return a response to client.
        return res.status(200).json({
            status: 200,
            result: result
        });

    } catch (e) {
        const err = e as Error;
        logging.error(NAMESPACE, err.message);
        return handleAccountError(err, res);
    }
}

const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Deleting Account from Database');

    const accountDTO: accountModel = req.body;

    try {
        //  Call to service layer
        await accountService.deleteAccount(accountDTO);

        // Return a response to client.
        return res.status(200).json({
            status: 200,
            result: "Account has been deleted"
        });

    } catch (e) {
        const err = e as Error;
        logging.error(NAMESPACE, err.message);
        return handleAccountError(err, res);
        
    }
}

const getPatients = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Get Doctor Accounts From Account Table');

    try {
        //  Call to service layer
        const result = await accountService.getPatientAccounts();

        // Return a response to client.
        return res.status(200).json({
            status: 200,
            result: result
        });

    } catch (e) {
        const err = e as Error;
        logging.error(NAMESPACE, err.message);
        return handleAccountError(err, res);
        
    }
}

const getDoctors = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Get Doctor Accounts From Account Table');

    try {
        //  Call to service layer
        const result = await accountService.getDoctorAccounts();

        // Return a response to client.
        return res.status(200).json({
            status: 200,
            result: result
        });

    } catch (e) {
        const err = e as Error;
        logging.error(NAMESPACE, err.message);
        return handleAccountError(err, res);
        
    }
}

export default {
    registerClient,
    loginClient,
    registerAdmin,
    loginAdmin,
    getAccount,
    deleteAccount,
    getPatients,
    getDoctors
};