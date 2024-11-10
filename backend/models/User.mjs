import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  googleId: String,
  facebookId: String,
  appleId: String,
});

// Hash password before saving the user
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Password verification method
UserSchema.methods.verifyPassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};



UserSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', UserSchema);