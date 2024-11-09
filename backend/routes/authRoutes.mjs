import express from 'express';
import passport from 'passport';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const user = new User({ username: req.body.username, email: req.body.email });
    await User.register(user, req.body.password);
    res.redirect('/login');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}));

// Google OAuth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}));

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
