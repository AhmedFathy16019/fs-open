import patientsData from '../../data/patients';
import { nonSensitivePatient } from '../types';

const getNonSensitivePatients = (): nonSensitivePatient[] => {
    return patientsData.map(
        ({ id, name, dateOfBirth, gender, occupation }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        })
    );
};

export default {
    getNonSensitivePatients
};