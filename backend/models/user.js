const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: String,
  email: { type: String, unique: true },
  password: { type: String, select: false },
  isAdmin: { type: Boolean, default: false }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
=======
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b

module.exports = mongoose.model("User", userSchema);