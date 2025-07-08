// 只导入实际需要的类型
import { Entry, EntryWithoutId, NonSensitivePatient, Patient } from "../types";
import patientData from "../data/patients";
import { v1 as uuid } from 'uuid';
import { NewEntrySchema,parseDiagnosisCodes } from "../util";
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
const getPatient = (id: string): Patient | undefined => {
    const patient = patientData.find((p) => p.id === id);
    if (!patient) return undefined;
    return {
        ...patient,
        
    };
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

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
    const patient = getPatient(id);
    if (!patient) {
        throw new Error('Patient not found');
    }
    const diagnosisCodes = parseDiagnosisCodes(entry);

    try {
        const validatedEntry = NewEntrySchema.parse(entry);

        const newEntry = {
            ...validatedEntry,
            id: uuid(),
            diagnosisCodes
        };

        patient.entries.push(newEntry);
        return newEntry;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Invalid entry: ${error.message}`);
        }
        throw new Error('Invalid entry: Unknown error');
    }
};
export default {
    getNonSensitivePatients,
    addPatient,
    getPatient,
    addEntry
};