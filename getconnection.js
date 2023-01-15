const mongoose = require("mongoose");
const getConnection=async()=> {
    await mongoose.connect('mongodb://localhost:27017/assignment');
}

module.exports = getConnection;