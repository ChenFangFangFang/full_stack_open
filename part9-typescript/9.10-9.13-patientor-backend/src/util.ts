import { Gender,NewPatientEntry } from "./types";
import { z } from "zod";
import { Diagnosis,HealthCheckRating } from "./types";

const BaseEntrySchema = z.object({
    description: z.string().min(1),
    date: z.string().refine((v) => Boolean(Date.parse(v)), {
        message: "Invalid date format"
    }),
    specialist: z.string().min(1),
    diagnosisCodes: z.array(z.string()).optional(),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.nativeEnum(HealthCheckRating),
});

// Hospital Entry Schema
export const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: z.object({
        date: z.string().refine((v) => Boolean(Date.parse(v))),
        criteria: z.string().min(1),
    }),
});

// OccupationalHealthcare Entry Schema
export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string().min(1),
    sickLeave: z.object({
        startDate: z.string().refine((v) => Boolean(Date.parse(v))),
        endDate: z.string().refine((v) => Boolean(Date.parse(v))),
    }).optional(),
});

export const NewEntrySchema = z.discriminatedUnion("type", [
    HealthCheckEntrySchema,
    HospitalEntrySchema,
    OccupationalHealthcareEntrySchema,
]);
export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
});
export const toNewPatientEntry = (object:unknown):NewPatientEntry => {
    return NewPatientSchema.parse(object);
};
export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
  };
