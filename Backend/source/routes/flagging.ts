import express from 'express';
import flaggingController from '../controllers/flagging';

const router = express.Router();

router.post('/flag/flagPatient', flaggingController.flagPatient);
router.get('/flag/getFlaggedPatients', flaggingController.getFlaggedPatients);
router.post('/flag/getFlaggedPatients', flaggingController.getFlaggedPatients);
router.get('/flag/flagPatient', flaggingController.flagPatient);
export = router;