import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  googleId: String,
  facebookId: String,
  appleId: String,
});

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', UserSchema);
