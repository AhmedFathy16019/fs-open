import express, { NextFunction, Request, Response } from 'express';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import patientService from '../services/patientService';
import NewPatientSchema from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientService.getNonSensitivePatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.issues });
    } else {
        next(error);
    }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const newPatient = patientService.createNewPatient(req.body);
    
    res.status(200).json(newPatient);
});

router.use(errorMiddleware);

export default router;