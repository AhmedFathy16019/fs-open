import patientsData from '../../data/patients';
import { Gender, NewPatient, NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';
import { z } from 'zod';


const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patientsData.map(
        ({ id, name, dateOfBirth, gender, occupation }) => {
            const genderParsed = z.nativeEnum(Gender).parse(gender);

            return {
                id,
                name,
                dateOfBirth,
                gender: genderParsed,
                occupation
            };
        }
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