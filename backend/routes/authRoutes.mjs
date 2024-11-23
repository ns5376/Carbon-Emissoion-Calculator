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


router.get('/emission-form', (req, res) => {
  // Check if user is logged in, redirect if not
  if (!req.isAuthenticated()) {
      res.redirect('/login');
  } else {
      // Render the Emission Entry Form view
      res.render('emission-form'); // Ensure you have an 'emissionform.hbs' in your views directory
  }
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

// In routes file like authRoutes.mjs or a new route file, e.g., apiRoutes.mjs
router.post('/api/submit', async (req, res) => {
  try {
      // Extract data from request body
      const { date, transport, electricity } = req.body;

      // Optionally, interact with an external API like Climatiq here if needed
      // For example, send data to Climatiq and receive calculation results

      // Save the data to your database using the EmissionEntry model
      const newEntry = await EmissionEntry.create({
          userId: req.user._id, // Assuming user is logged in and session is maintained
          date,
          emissions: {
              transportation: { amount: transport, unit: 'kg of CO2', description: 'Transportation emissions' },
              electricity: { amount: electricity, unit: 'kg of CO2', description: 'Electricity emissions' }
          }
      });

      res.status(201).send(newEntry);
  } catch (error) {
      console.error('Failed to save emission data:', error);
      res.status(500).send({ message: 'Failed to process emission data' });
  }
});


export default router;
