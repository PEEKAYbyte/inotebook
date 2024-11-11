const mongoose = require('mongoose');
const { Schema } = mongoose;


const NotesSchema = new Schema({
    // create user for own data show only
    // different user can get onlt his data, not other
    user:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        default: "general"
        
    },
    tag:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('notes', NotesSchema);