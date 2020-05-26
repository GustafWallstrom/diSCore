const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    par: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    }
}, {
    collection: 'course',
    versionKey: false
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;