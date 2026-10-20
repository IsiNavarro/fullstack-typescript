import { Gender, type NewPatient } from './types.ts';

const isString = (value: unknown): value is string => {
  return typeof value === 'string' || value instanceof String;
};

const parseString = (value: unknown, field: string): string => {
  if (!isString(value) || value.trim() === '') {
    throw new Error(`Incorrect or missing ${field}`);
  }
  return value;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (value: unknown): string => {
  if (!isString(value) || !isDate(value)) {
    throw new Error('Incorrect or missing date of birth');
  }
  return value;
};

const isGender = (value: string): value is Gender => {
  return Object.values<string>(Gender).includes(value);
};

const parseGender = (value: unknown): Gender => {
  if (!isString(value) || !isGender(value)) {
    throw new Error('Incorrect or missing gender');
  }
  return value;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    return {
      name: parseString(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, 'occupation'),
    };
  }

  throw new Error('Incorrect data: some fields are missing');
};