import express from 'express';
import { addPatient, getNonSensitivePatients } from '../services/patientService.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(getNonSensitivePatients());
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedPatient = addPatient({ name, dateOfBirth, ssn, gender, occupation });

  const { ssn: _ssn, ...nonSensitivePatient } = addedPatient;
  res.status(201).json(nonSensitivePatient);
});

export { router as patientRouter };