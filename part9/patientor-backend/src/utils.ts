import { Gender, NewPatient } from "./types";

const isString = (value: unknown): value is string => {
    return typeof value === 'string' || value instanceof String; 
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
    return Object
        .values(Gender)
        .map(g => g.toString())
        .includes(gender);
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date: ' + date);
    }

    return date;
};

const parseString = (str: unknown): string => {
    if (!isString(str)) {
        throw new Error('Incorrect string: ' + str);
    }

    return str;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }

    return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect object: ' + object);
    }

    if (
        'name' in object
        && 'dateOfBirth' in object
        && 'ssn' in object
        && 'gender' in object
        && 'occupation' in object
    ) {
        return {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation)
        };
    } else {
        throw new Error('Missing fields');
    }
};

export default toNewPatient;