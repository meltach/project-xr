import express from 'express'

// const  PatientController = require('../controllers/patient-controller');
// import {PatientController} from '../controllers/patient-controller';
import {getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    createExam} from '../controllers/patient-controller.js';

export const router = express.Router();

router.get('/items',  getItems);
router.get('/item/:id',  getItemById);
router.post('/item',  createItem);
router.put('/item/:id',  updateItem);
router.delete('/item/:id',  deleteItem);

//**--------- exam table----------*/
router.get('/exams',  getItems);
router.get('/exam/:id',  getItemById);
router.post('/exam',  createExam); //working but need id
//router.post('/exam/:id',  createExam); //check this
router.put('/exam/:id',  updateItem);
router.delete('/exam/:id',  deleteItem);

// module.exports = router;
