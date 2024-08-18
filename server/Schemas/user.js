const mongoose = require("mongoose")

const userSchema =mongoose.Schema({
  name: String,
  nationalId: Number,
  role: String,
  salary: Number,
  workingHours: Number,
  currentWorkingHours: Number,
  employmentDate: String
})
const UserModel = mongoose.model("employees", userSchema)
module.exports = UserModel;
