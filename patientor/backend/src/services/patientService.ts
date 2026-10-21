import { v1 as uuid } from 'uuid';
import { patients } from '../data/patients.ts';
import type { NewPatient, NonSensitivePatient, Patient } from '../types.ts';

const toNonSensitivePatient = ({ id, name, dateOfBirth, gender, occupation }: Patient): NonSensitivePatient => ({
  id,
  name,
  dateOfBirth,
  gender,
  occupation,
});

export const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(toNonSensitivePatient);
};

export const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};