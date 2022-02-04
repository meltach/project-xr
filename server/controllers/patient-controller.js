/* eslint-disable no-undef, arrow-body-style */

import { Exam } from "../models/exam-model.js";

export const getItems = (schemaName, name) => {
  return async (req, res) => {
    await schemaName.find({}, (err, items) => {
      if (err) {
        console.error(`Error getting ${name} data': ${err}`);
        return res.status(400).json({
          success: false,
          error: err,
        });
      }
      if (!items.length) {
        console.error(`${name} not found`);
        return res.status(200).json([]);
      }
      console.log(`Fetching successful!`);
      return res.status(200).json(items);
    }).catch(err => {
      console.error(`Error fetching the data': ${err}`);
      console.error(err);
      return res.status(404).json({
        success: false,
        error: err,
      });
    });
  }
}


export const getItemById = (schemaName, name) => {

return async (req, res) => {
   
  await schemaName.find({ _id: req.params.id }, (err, items) => {
    if (err) {
      console.error(`Status 400: getItemsById: ${err}`);
      throw res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!items.length) {
      console.error(`Hack_avengers - 404 in 'getItemsById': ${name} not found`);
      return res.status(404).json({
        success: false,
        error: `${name} not found`,
      });
    }
    console.log(`Hack_avengers - 200 in 'getItemById': ${name} fetched!`);
    return res.status(200).json(items[0]);
  }).catch(err => {
    console.error(`Hack_avengers - caught error in 'getItemsById': ${err}`);
    console.error(err);
    return err;
  });
};
}

export const createItem = (schemaName, name) => {
  return (req, res) => {
    const body = req.body;
   
    // patient
    if (!body) {
      return res.status(400).json({
        success: false,
        error: `You must provide an ${name}.`,
      });
    }

    const item = new schemaName(body); //create new record


    if (!item) {
      console.error(`Hack_avengers - 400 in create${name}: '${name}' is malformed.`);
      return res.status(400).json({
        success: false,
        message: `'${name}' is malformed`,
      });
    }


    return item
      .save()
      .then(() => {
        console.error(`Hack_avengers - 201 in 'createItem': ${name} created!`);
        return res.status(201).json({
          success: true,
          id: item._id,
          message: `${name} created!`,
        });
      })
      .catch(err => {
        console.error(`Hack_avengers - caught error in 'createItem'`);
        Object.keys(err.errors).forEach(errorKey => {
          console.error(`Hack_avengers ERROR for: ${errorKey}`);
          console.error(
            `Hack_avengers => ${
              ((err.errors[errorKey] || {}).properties || {}).message
            }`,
          );
        });
        return res.status(400).json({
          success: false,
          error: err.errors,
          message: err.errors.name,
        });
      });
  };
}

export const updateItem = (schemaName, name) => {
return async (req, res) => {
  const body = req.body;
  const arryOfItem = [body]
  if (!body) {
    console.error(`Hack_avengers - 400 in 'update${name}': You must provide ${name} to update.`);
    return res.status(400).json({
      success: false,
      error: `You must provide ${name} to update.`,
    });
  }
  
  const itemForUpdate = {...arryOfItem}[0]


  try {
    await schemaName.findOneAndUpdate({ _id: req.params.id }, itemForUpdate);
  } catch (err) {
    console.error(`Hack_avengers - caught error in 'update${name}': ${err}`);
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err,
    });
  }

  console.log(`Hack_avengers - 200 in 'update${name}': ${name} updated!`);
  return res.status(200).json({
    success: true,
    id: req.params.id,
    message: `${name} updated!`,
  });
};
}

export const deleteItem = (schemaName, name) => {
  return async (req, res) => {
    await schemaName.findOneAndDelete({ _id: req.params.id }, (err, item) => {
    if (err) {
      console.error(`Hack_avengers - 400 in 'delete${name}': ${err}`);
      return res.status(400).json({
        succes: false,
        error: err,
      });
    }

    if (!item) {
      console.error(`Hack_avengers - 400 in 'delete${name}': ${name} not found!`);
      return res.status(400).json({
        success: false,
        error: `${name} not found!`,
      });
    }

    return res.status(200).json({
      success: true,
      item: item,
    });
    }).catch(err => {
    console.error(`Hack_avengers - caught error in 'delete${name}': ${err}`);
    console.error(err);
    return err;
    });
};
}

//**--------------------------------------EXAM TABLE------------------------------------ */
//Function for getting exam table: if the data exists, edit; if it doesn't, create exam
export const createExam = (req, res) => {
  const body = req.body;
  //const id = "61f7c2452bbe5349500db6d0";
  //check hot to make a request with params id
  const id = req.params.id;
  console.log(id);
  // console.log('----------------------- createpatient: req -----------------------')
  // console.log(req);
  // console.log('----------------------- createpatient: body -----------------------')
  // console.log(body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an patient.',
    });
  }

  //check this
  // const patient = await getpatientById(req.body._id);
  // console.log(patient);
  const patient = new Exam({
    image: body.image,
    score: body.score,
    examInfo: body.examInfo,
    date: body.date,
    keyFindings: body.keyFindings,
    patient: id
  }); //create new record

  if (!patient) {
    console.error(`Hack_avengers - 400 in 'createpatient': 'patient' is malformed.`);
    return res.status(400).json({
      success: false,
      message: "'patient' is malformed",
    });
  }

  // console.log('----------------------- createpatient: patient -----------------------')
   console.log(patient);

  return patient
    .save()
    .then(() => {
      console.error(`Hack_avengers - 201 in 'createExam': Exam patient created!`);
      return res.status(201).json({
        success: true,
        id: patient._id,
        message: 'patient created!',
      });
    })
    .catch(err => {
      console.error(`Hack_avengers - caught error in 'createExam'`);
      Object.keys(err.errors).forEach(errorKey => {
        console.error(`Hack_avengers ERROR for: ${errorKey}`);
        console.error(
          `Hack_avengers => ${
            ((err.errors[errorKey] || {}).properties || {}).message
          }`,
        );
      });
      return res.status(400).json({
        success: false,
        error: err.errors,
        message: err.errors.name,
      });
    });
};

//  ***********************************************************************

export const getExams = async (req, res) => {
  await Exam.find({}, (err, patients) => {
    if (err) {
      console.error(`Error getting exams data': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!patients.length) {
      console.error(`patients not found`);
      return res.status(200).json({
        success: true,
        patients: [],
      });
    }
    console.log(`Fetching successful!`);
    return res.status(200).json(patients);
  }).catch(err => {
    console.error(`Error fetching the data': ${err}`);
    console.error(err);
    return res.status(404).json({
      success: false,
      error: err,
    });
  });
};

export const getExamById = async (req, res) => {
  await Exam.find({ _id: req.params.id }, (err, patients) => {
    if (err) {
      console.error(`Hack_avengers - 400 in 'getExamById': ${err}`);
      throw res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!patients.length) {
      console.error(`Hack_avengers - 404 in 'getExamById': patient not found`);
      return res.status(404).json({
        success: false,
        error: 'patient not found',
      });
    }
    console.log(`Hack_avengers - 200 in 'getExamById': patient fetched!`);
    return res.status(200).json(patients[0]);
  }).catch(err => {
    console.error(`Hack_avengers - caught error in 'getExamById': ${err}`);
    console.error(err);
    return err;
  });
};

export const updateExam = async (req, res) => {
  const body = req.body;
  if (!body) {
    console.error(`Hack_avengers - 400 in 'updateExam': You must provide an patient to update.`);
    return res.status(400).json({
      success: false,
      error: 'You must provide an patient to update.',
    });
  }

  const patientForUpdate = {
        image: body.image,
        score: body.score,
        examInfo: body.examInfo,
        keyFindings: body.keyFindings
  };

  // console.log('----------------------- updatepatient: res -----------------------');
  // console.log(res);

  try {
    await Exam.findOneAndUpdate({ _id: req.params.id }, patientForUpdate);
  } catch (err) {
    console.error(`Hack_avengers - caught error in 'updateExam': ${err}`);
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err,
    });
  }

  console.log(`Hack_avengers - 200 in 'updateExam': patient updated!`);
  return res.status(200).json({
    success: true,
    id: req.params.id,
    message: 'patient updated!',
  });
};

export const deleteExam = async (req, res) => {
  await Exam.findOneAndDelete({ _id: req.params.id }, (err, patient) => {
    if (err) {
      console.error(`Hack_avengers - 400 in 'deleteExam': ${err}`);
      return res.status(400).json({
        succes: false,
        error: err,
      });
    }

    if (!patient) {
      console.error(`Hack_avengers - 400 in 'deleteExam': patient not found!`);
      return res.status(400).json({
        success: false,
        error: 'patient not found!',
      });
    }

    return res.status(200).json({
      success: true,
      patient: patient,
    });
  }).catch(err => {
    console.error(`Hack_avengers - caught error in 'deleteExam': ${err}`);
    console.error(err);
    return err;
  });
};


