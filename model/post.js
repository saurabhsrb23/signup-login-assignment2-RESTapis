const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const blogSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    image: {
        data:Buffer,
        contentType: String
    },
    user: {type: ObjectId, ref: "User"}
}, {timestamps : true});

module.exports= mongoose.model('Blog', blogSchema);
