import express from 'express'
import { Patient } from '../models/patient-model.js';
import { Exam } from '../models/exam-model.js';

import {getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
   } from '../controllers/patient-controller.js';

export const router = express.Router();

router.get('/patients',  getItems(Patient, "patients"));
router.get('/patient/:id',  getItemById(Patient, 'patient'));
router.post('/patient',  createItem(Patient, "patient"));
router.put('/patient/:id',  updateItem(Patient, "patient"));
router.delete('/patient/:id',  deleteItem(Patient, "patient"));

router.get('/exams',  getItems(Exam, "exams"));
router.get('/exam/:id',  getItemById(Exam, 'exam'));
router.post('/exam/:id',  createItem(Exam, "exam"));
router.put('/exam/:id',  updateItem(Exam, "exam"));
router.delete('/exam/:id',  deleteItem(Exam, "exam"));


// module.exports = router;
