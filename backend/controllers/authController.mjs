import passport from 'passport';
// import LocalStrategy from 'passport-local';
import GoogleStrategy from 'passport-google-oauth20';
// import FacebookStrategy from 'passport-facebook';
// import AppleStrategy from 'passport-apple';
import User from '../models/User.mjs';
// import fs from 'fs';


// Local Strategy
passport.use(User.createStrategy());

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, async (token, tokenSecret, profile, done) => {
  let user = await User.findOne({ googleId: profile.id });
  if (!user) {
    user = await User.create({
      googleId: profile.id,
      username: profile.displayName,
      email: profile.emails[0].value,
    });
  }
  done(null, user);
}));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
