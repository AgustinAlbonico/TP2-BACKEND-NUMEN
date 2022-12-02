const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  registerDate: { type: Date, default: Date.now() },
  animesIDS: [{ type: mongoose.Schema.Types.ObjectId, ref: "Anime" }],
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next(error);
    }
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) {
        return next(error);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  let user = this;
  return bcrypt.compareSync(candidatePassword, user.password);
};

module.exports = mongoose.model("User", UserSchema);
