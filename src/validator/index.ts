import {Response, Request, NextFunction} from "express";
import * as yup from 'yup';

export const schemaDataCreateBook = yup.object().shape({
    body: yup.array().of(
        yup.object({
            title: yup.string().required(),
            author: yup.string().required(),
            description: yup.string().required(),
            publisher: yup.string().required(),
            publicationDate: yup.string().required(),
        })
    ),
});
export const schemaDataUpdateBook = yup.object().shape({
    body: yup.object({
        id: yup.string().matches(/^[0-9a-fA-F]{24}$/, 'ID inválido').required(),
    })
});


export const schemaIdBook = yup.string().matches(/^[0-9a-fA-F]{24}$/, 'ID inválido');


export const validateData = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (err: any) {
        return res.status(400).json({type: err.name, message: err.message});
    }
};

export const validateParamById = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    try {
        await schema.validate(id);
        return next();
    } catch (err: any) {
        return res.status(400).json({type: err.name, message: err.message});
    }
};
export const validateDeleteById = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.body;
    try {
        await schema.validate(id);
        return next();
    } catch (err: any) {
        return res.status(400).json({type: err.name, message: err.message});
    }
};
