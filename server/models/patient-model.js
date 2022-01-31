import mongoose from "mongoose"
const Schema = mongoose.Schema;

const PatientSchema = new Schema(
    {
        patient_id: {
            type: String,
            required: false
        },
        age: Number,
        sex: {
            type: String,
            max: 1,
        },
        race: String,
        zip: Number,
        latest_bmi: Number,
        latest_weight: Number,
        latest_height: String,
        test_name: String,
        icu_admit: String,
        mortality: String,

    }

);

export const Patient = mongoose.model('Patient', PatientSchema);
