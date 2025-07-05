import { NonSensitivePatient, Patient } from "../types";
import patientData from "../data/patients";
import { v1 as uuid } from 'uuid';

type NewPatient = Omit<Patient, 'id'>;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patientData.map(({ name, id, dateOfBirth, gender, occupation }) => ({
        name,
        id,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const id = uuid();
    const newPatient = {
        ...patient,
        id
    };
    patientData.push(newPatient);
    return newPatient;
};

export default {
    getNonSensitivePatients,
    addPatient
};