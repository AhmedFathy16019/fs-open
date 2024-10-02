import express, { Response } from 'express';
import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
    res.send(diagnosesData);
});

export default router;