import mongoose, {Schema} from "mongoose";

const facultySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    departments: {
        type: [],
        required: true
    }
});

export const Faculty = mongoose.model( "Faculty", facultySchema );