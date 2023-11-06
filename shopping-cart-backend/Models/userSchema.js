import { Schema, model } from "mongoose";
import { genSalt, hash as _hash } from "bcrypt";
import uniqueValidator from "mongoose-unique-validator";

const saltRounds = 10;
const UserSchema = Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      required: true,
      type: String,
    },
    token: {
      type: String,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  genSalt(saltRounds, function (err, salt) {
    if (err) {
      return next(err);
    }

    _hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.plugin(uniqueValidator);
const User = new model("User", UserSchema);

export default User;
