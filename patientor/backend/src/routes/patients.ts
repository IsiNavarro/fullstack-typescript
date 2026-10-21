import express from 'express';
import { addPatient, getNonSensitivePatients } from '../services/patientService.ts';
import { NewPatientSchema } from '../utils.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(getNonSensitivePatients());
});

router.post('/', (req, res) => {
  const result = NewPatientSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: result.error.issues });
    return;
  }

  const addedPatient = addPatient(result.data);
  res.status(201).json(addedPatient);
});

export { router as patientRouter };