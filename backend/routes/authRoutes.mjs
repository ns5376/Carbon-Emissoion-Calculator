import express from 'express';
import passport from '../config/passportConfig.mjs';

const router = express.Router();

// Manual login route
router.post('/auth/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
}));

// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/home',
  failureRedirect: '/login',
}));

// Facebook OAuth routes
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/home',
  failureRedirect: '/login',
}));

// Apple OAuth routes
router.get('/auth/apple', passport.authenticate('apple'));
router.post('/auth/apple/callback', passport.authenticate('apple', {
  successRedirect: '/home',
  failureRedirect: '/login',
}));

export default router;
