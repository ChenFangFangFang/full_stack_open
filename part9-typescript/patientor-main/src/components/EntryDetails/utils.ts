import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";

export const isHealthCheckEntry = (entry: Entry): entry is HealthCheckEntry => {
  return entry.type === "HealthCheck";
};

export const isHospitalEntry = (entry: Entry): entry is HospitalEntry => {
  return entry.type === "Hospital";
};

export const isOccupationalHealthcareEntry = (entry: Entry): entry is OccupationalHealthcareEntry => {
  return entry.type === "OccupationalHealthcare";
};

export const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};