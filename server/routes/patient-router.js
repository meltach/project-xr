import express from 'express'

// const  PatientController = require('../controllers/patient-controller');
// import {PatientController} from '../controllers/patient-controller';
import {getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    getExams,
    getExamById,
    createExam,
    updateExam,
    deleteExam} from '../controllers/patient-controller.js';

export const router = express.Router();

router.get('/patients',  getItems);
router.get('/patient/:id',  getItemById);
router.post('/patient',  createItem);
router.put('/patient/:id',  updateItem);
router.delete('/patient/:id',  deleteItem);

router.get('/exams',  getExams);
router.get('/exam/:id',  getExamById);
//router.post('/exam',  createExam); //working but need id
router.post('/exam/:id',  createExam); //create exam table with an existing id on item table
router.put('/exam/:id',  updateExam);
router.delete('/exam/:id',  deleteExam);


// module.exports = router;
