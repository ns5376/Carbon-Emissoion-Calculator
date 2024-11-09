import passport from 'passport';
import LocalStrategy from 'passport-local';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import AppleStrategy from 'passport-apple';
import User from '../models/User.mjs';

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

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ facebookId: profile.id });
  if (!user) {
    user = await User.create({
      facebookId: profile.id,
      username: profile.displayName,
    });
  }
  done(null, user);
}));

// Apple OAuth Strategy
passport.use(new AppleStrategy({
  clientID: process.env.APPLE_CLIENT_ID,
  teamID: process.env.APPLE_TEAM_ID,
  keyID: process.env.APPLE_KEY_ID,
  privateKey: fs.readFileSync(process.env.APPLE_PRIVATE_KEY_PATH, 'utf8'),
  callbackURL: '/auth/apple/callback',
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ appleId: profile.id });
  if (!user) {
    user = await User.create({
      appleId: profile.id,
      username: profile.name,
    });
  }
  done(null, user);
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
