import z from "zod";
import { NewPatientSchema } from "./util";
export type Diagnosis = {
    code: string;
    name: string;
    latin?: string;
};

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
};
const newEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
});
export const toNewPatient = (object: unknown): NewPatientEntry => {
    return newEntrySchema.parse(object);
};
export interface PatientEntry {
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation?: string;
}
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
export type NonSensitivePatient = Omit<PatientEntry, 'ssn'>;