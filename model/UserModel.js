const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,

    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: "Please enter a valid email",
    },
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  
},
 { timestamps: true } 
);

module.exports = mongoose.model("User", userSchema);