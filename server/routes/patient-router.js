import express from 'express'

// const  PatientController = require('../controllers/patient-controller');
// import {PatientController} from '../controllers/patient-controller';
import {getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem} from '../controllers/patient-controller.js';

export const router = express.Router();

router.get('/patients',  getItems);
router.get('/patient/:id',  getItemById);
router.post('/patient',  createItem);
router.put('/patient/:id',  updateItem);
router.delete('/patient/:id',  deleteItem);

// module.exports = router;
