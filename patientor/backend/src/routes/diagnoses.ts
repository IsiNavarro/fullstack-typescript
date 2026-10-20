import express from 'express';
import { getDiagnoses } from '../services/diagnosesService.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(getDiagnoses());
});

export { router as diagnosisRouter };