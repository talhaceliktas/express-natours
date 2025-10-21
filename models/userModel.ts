import mongoose from "mongoose";
import validator from "validator";
import argon2 from "@node-rs/argon2";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!
      validator: function (val: String) {
        return val === this.password;
      },
      message: "Passwords are not the same",
      select: false,
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await argon2.hash(this.password, {
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });

  this.passwordConfirm = undefined as any;

  next();
});

export default mongoose.model("User", userSchema);
