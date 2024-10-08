import express, { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { Entry, EntryWithoutId, HealthCheckRating, NewPatient, NonSensitivePatient, Patient } from '../types';
import patientService from '../services/patientService';
import NewPatientSchema from '../utils';

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


const newEntryParser = (req: Request<unknown, unknown, EntryWithoutId>, _res: Response, next: NextFunction) => {
    try {
        const baseEntry = {
            date: z.string().date().parse(req.body.date),
            specialist: z.string().parse(req.body.specialist),
            description: z.string().parse(req.body.description),
            diagnosisCodes: req.body.diagnosisCodes 
                ?  z.array(z.string()).parse(req.body.diagnosisCodes)
                : undefined,
        };
    
        let entry: EntryWithoutId;
    
        switch (req.body.type) {
            case 'Hospital':
                entry = {
                    ...baseEntry,
                    type: 'Hospital',
                    discharge: {
                        date: z.string().date().parse(req.body.discharge.date),
                        criteria: z.string().parse(req.body.discharge.criteria),
                    }
                };
                break;
            case 'HealthCheck':
                entry = {
                    ...baseEntry,
                    type: 'HealthCheck',
                    healthCheckRating: z.nativeEnum(HealthCheckRating).parse(req.body.healthCheckRating),
                };
                break;
            case 'OccupationalHealthcare':
                entry = {
                    ...baseEntry,
                    type: 'OccupationalHealthcare',
                    employerName: z.string().parse(req.body.employerName),
                    sickLeave: req.body.sickLeave ? {
                        startDate: z.string().parse(req.body.sickLeave.startDate),
                        endDate: z.string().parse(req.body.sickLeave.endDate),
                    } : undefined,
                };
                break;
            default:
                throw new Error('Invalid entry type');
        }
    
        req.body = entry;
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

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<NonSensitivePatient>) => {
    const newPatient = patientService.createNewPatient(req.body);
    
    res.status(200).json(newPatient);
});

router.get('/:id', (req: Request<{ id: string }>, res: Response<Patient | undefined>) => {
    const patient = patientService.getPatientById(req.params.id);
    res.send(patient);
});

router.post('/:id/entries', newEntryParser, (req: Request<{ id: string }, unknown, EntryWithoutId>, res: Response<Entry>) => {
    const entry = patientService.addPatientEntry(req.params.id, req.body);
    res.status(200).json(entry);
});

router.use(errorMiddleware);

export default router;