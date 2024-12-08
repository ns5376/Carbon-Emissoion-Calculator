import express from 'express';
import passport from 'passport';  // Import passport here
import User from '../models/User.mjs';
import EmissionEntry from '../models/EmissionEntry.mjs';  // Adjust the path as necessary
import axios from 'axios';


const router = express.Router();


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
router.get("/feedback", (req, res) => {
  res.render("feedback", { user: req.user }); // Render feedback.hbs with user data (if logged in)
});
router.get("/update", (req, res) => {
  if (!req.user) {
    return res.redirect("/login"); // Redirect to login if the user is not authenticated
  }

  res.render("update", { user: req.user }); // Render the profile update form
});



router.post("/api/feedback", async (req, res) => {
  const { name, email, feedbackType, message } = req.body;

  try {
    // Log or save feedback data
    console.log("Feedback received:", { name, email, feedbackType, message });
    res.json({ success: true, message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ success: false, message: "Failed to submit feedback" });
  }
});

router.post("/api/update", async (req, res) => {
  const { username, email } = req.body;

  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Check for duplicate username
    const existingUser = await User.findOne({ username });
    if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({ success: false, message: "Username is already taken." });
    }

    // Update the user's profile
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { username, email },
      { new: true } // Return the updated document
    );

    // Refresh the session with the updated user data
    req.login(updatedUser, (err) => {
      if (err) {
        console.error("Error refreshing session:", err);
        return res.status(500).json({ success: false, message: "Failed to refresh session" });
      }

      res.json({ success: true, redirect: "/", user: updatedUser });
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
});


export default router;
