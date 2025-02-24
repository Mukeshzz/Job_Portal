import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required:true
    },
    phoneNo: {
        type: Number,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    role: {
        type: String,
        enum: ['student','recruiter'],
        required: true
    },
    profile: {
        bio: {type:String},
        skills: [{type: String}],
        resume: {type:String},
        resumeOriginal: {type:String},
        company: {type:mongoose.Schema.Types.ObjectID, ref:'Company'},
        profilePhoto: {
            type: String,
            default:""
        }
    }

},{timestamps:true});
export const User = mongoose.model('User',userSchema);