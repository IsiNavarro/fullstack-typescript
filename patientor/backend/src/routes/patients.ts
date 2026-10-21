import express from 'express';
import { addPatient, getNonSensitivePatients } from '../services/patientService.ts';
import { NewPatientSchema } from '../utils.ts';
import z from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(getNonSensitivePatients());
});

router.post('/', (req, res) => {
  const result = NewPatientSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).send(z.prettifyError(result.error));
    return;
  }

  const addedPatient = addPatient(result.data);
  res.json(addedPatient);
});

export { router as patientRouter };