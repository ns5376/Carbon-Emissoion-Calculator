import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import AppleStrategy from 'passport-apple';
import User from '../models/User.mjs'; // Adjust the path to the User model
import fs from 'fs';

// Local Strategy for manual login
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) { // Replace with bcrypt check if using hashed passwords
      return done(null, false, { message: 'Invalid email or password' });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ googleId: profile.id });
  if (!user) {
    user = await User.create({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
    });
  }
  done(null, user);
}));

// Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ facebookId: profile.id });
  if (!user) {
    user = await User.create({
      facebookId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
    });
  }
  done(null, user);
}));

// Apple Strategy
passport.use(new AppleStrategy({
  clientID: process.env.APPLE_CLIENT_ID,
  teamID: process.env.APPLE_TEAM_ID,
  keyID: process.env.APPLE_KEY_ID,
  privateKey: fs.readFileSync('path/to/AuthKey_YOUR_KEY_ID.p8', 'utf8'),
  callbackURL: '/auth/apple/callback',
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ appleId: profile.id });
  if (!user) {
    user = await User.create({
      appleId: profile.id,
      email: profile.email,
      name: profile.name,
    });
  }
  done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
