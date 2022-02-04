import mongoose from "mongoose"
const Schema = mongoose.Schema;

const ExamSchema = new Schema(
    {
        patient:
            {type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
            }
        ,
        image: String,
        score: {
            type: [Number],
            require: true
        },
        examInfo: String,
        date: Date,
        keyFindings: String
    },

    { timestamps: true },
);

export const Exam = mongoose.model('Exam', ExamSchema);