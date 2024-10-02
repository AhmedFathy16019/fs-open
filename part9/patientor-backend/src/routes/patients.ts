import express, { Response } from 'express';
import { nonSensitivePatient } from '../types';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res: Response<nonSensitivePatient[]>) => {
    res.send(patientService.getNonSensitivePatients());
});

export default router;