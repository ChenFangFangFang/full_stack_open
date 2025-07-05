import { Gender,NewPatientEntry} from "./types";
import { z } from "zod";
// const isString = (text: unknown): text is string => {
//         return typeof text === 'string' || text instanceof String;
//     };
//   const isDate = (date: string): boolean => {
//     return Boolean(Date.parse(date));
//   };
    // const isGender = (gender: string): gender is Gender => {
    //     return Object.values(Gender).includes(gender as Gender);
    // };


// const parseName = (name: unknown): string => {
//     if ( !name || !isString(name) ) {
//         throw new Error('Incorrect or missing name');
//     }
//     return name;
// };
// const parseName = (name: unknown): string => {
//     return z.string().parse(name);
// };
// const parseGender = (gender: unknown): Gender => {
//     if ( !gender || !isString(gender) || !isGender(gender) ) {
//         throw new Error('Incorrect or missing gender');
//     }
//     return gender;
// };

// const parseBirthDate = (date: unknown): string => {
//     if ( !date || !isString(date) || !isDate(date) ) {
//         throw new Error('Incorrect or missing date');
//     }
//     return date;
// };

// const parseSsn = (ssn: unknown): string => {
//     if ( !ssn || !isString(ssn) ) {
//         throw new Error('Incorrect or missing ssn');
//     }
//     return ssn;
// };

// const parseOccupation = (occupation: unknown): string => {
//     if ( !occupation || !isString(occupation) ) {
//         throw new Error('Incorrect or missing occupation');
//     }
//     return occupation;
// };

// export const toNewPatient = (object: unknown): NewPatientEntry => {
//     if ( !object || typeof object !== 'object' ) {
//         throw new Error('Incorrect or missing data');
//       }

//     if ( 'name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object ) {
//         const newPatient: NewPatientEntry = {
//             name: z.string().parse(object.name),
//             dateOfBirth: z.string().parse(object.dateOfBirth),
//             ssn: z.string().parse(object.ssn),
//             gender: z.nativeEnum(Gender).parse(object.gender),
//             occupation: z.string().parse(object.occupation)
//         };
//         return newPatient;
//     }
//     throw new Error('Incorrect data: a field missing');
// };
  
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