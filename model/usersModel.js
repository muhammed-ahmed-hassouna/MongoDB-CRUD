const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: false
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  religion: {
    type: String,
    required: true,
    // lowercase: true
  },
  skinColor: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    // allowNull: true,
  },
  governorate: {
    type: String,
  },
  hobby: {
    type: String,
  },
  profession: {
    type: String,
  },
  EducationDegree: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// ! immutable , min , max, minLength, maxLength

const User = mongoose.model("Users", userSchema);

module.exports = User;
