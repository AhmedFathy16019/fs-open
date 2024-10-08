import patientsData from '../../data/patients-full';
import { Entry, EntryWithoutId, Gender, NewPatient, NonSensitivePatient, Patient } from '../types';
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

const createNewPatient = (patientData: NewPatient): NonSensitivePatient => {
    const id = uuid();

    const newPatientEntry = {
        id,
        ...patientData,
        entries: [],
    };

    patientsData.push(newPatientEntry);
    return newPatientEntry;
};

const getPatientById = (id: string): Patient | undefined => {
    return patientsData.find(patient => patient.id === id);
};

const addPatientEntry = (patientId: string, entry: EntryWithoutId): Entry => {
    const patient = patientsData.find(patient => patient.id === patientId);
    
    if (!patient) {
        throw new Error(`Patient with id ${patientId} not found`);
    }

    const newEntry = { id: uuid(), ...entry };
    patient.entries.push(newEntry);

    return newEntry;
};

export default {
    getNonSensitivePatients,
    createNewPatient,
    getPatientById,
    addPatientEntry
};