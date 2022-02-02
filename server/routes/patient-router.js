import express from 'express'
import { Patient } from '../models/patient-model.js';

// const  PatientController = require('../controllers/patient-controller');
// import {PatientController} from '../controllers/patient-controller';
import {getItems,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient,
    getExams,
    getExamById,
    createExam,
    updateExam,
    deleteExam} from '../controllers/patient-controller.js';

export const router = express.Router();

router.get('/patients',  getItems(Patient, "patients"));
router.get('/patient/:id',  getPatientById);
router.post('/patient',  createPatient);
router.put('/patient/:id',  updatePatient);
router.delete('/patient/:id',  deletePatient);

router.get('/exams',  getExams);
router.get('/exam/:id',  getExamById);
//router.post('/exam',  createExam); //working but need id
router.post('/exam/:id',  createExam); //create exam table with an existing id on item table
router.put('/exam/:id',  updateExam);
router.delete('/exam/:id',  deleteExam);


// module.exports = router;
