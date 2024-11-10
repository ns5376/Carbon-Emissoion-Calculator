import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';  // Import passport here
import User from '../models/User.mjs';

const router = express.Router();
const saltRounds = 10;


router.post('/register', async (req, res, next) => {
  try {
    const user = new User({ username: req.body.username, email: req.body.email });
    await User.register(user, req.body.password);

    // Automatically log in the user after registration and redirect to dashboard
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/dashboard');
    });

  } catch (error) {
    res.status(500).send(error.message);
  }
});



// Login route with bcrypt verification
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error("Error during authentication:", err);
      return next(err);
    }
    if (!user) {
      console.log("No user found. Redirecting to login.");
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Error logging in:", err);
        return next(err);
      }
      console.log("Login successful. Redirecting to dashboard.");
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});



// OAuth Google login route
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);




// Facebook OAuth
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}));

// Apple OAuth
router.get('/auth/apple', passport.authenticate('apple'));
router.post('/auth/apple/callback', passport.authenticate('apple', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}));

export default router;
