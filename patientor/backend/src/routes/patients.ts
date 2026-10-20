import express from 'express';
import { addPatient, getNonSensitivePatients } from '../services/patientService.ts';
import { toNewPatient } from '../utils.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = addPatient(newPatient);
    res.status(201).json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export { router as patientRouter };