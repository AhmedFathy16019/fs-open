import express, { Response } from 'express';
import patientsData from '../../data/patients';
import { nonSensitivePatient } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<nonSensitivePatient[]>) => {
    const nonSensitivePatientsData = patientsData.map(
        ({ id, name, dateOfBirth, gender,occupation}) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        })
    );

    res.send(nonSensitivePatientsData);
});

export default router;