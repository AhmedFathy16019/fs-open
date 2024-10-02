import patientsData from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
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

const createNewPatient = (patientData: NewPatient): Patient => {
    const id = uuid();

    const newPatientEntry = {
        id,
        ...patientData
    };

    patientsData.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getNonSensitivePatients,
    createNewPatient,
};