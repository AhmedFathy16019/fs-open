import express, { Response } from 'express';
import { NonSensitivePatient } from '../types';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
    try {
        const newPatientData = toNewPatient(req.body);
    
        const newPatient = patientService.createNewPatient(newPatientData);
    
        res.status(200).json(newPatient);
    } catch (error: unknown) {
        let errorMessage = 'An error occurred';

        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }

        res.status(400).send(errorMessage);
    }
});

export default router;