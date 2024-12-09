import express from "express";
import passport from "passport"; // Import passport
import User from "../models/User.mjs";
import EmissionEntry from "../models/EmissionEntry.mjs"; // Adjust the path as necessary
import exphbs from "express-handlebars"; // For Handlebars helpers
import session from "express-session";


// Set up Handlebars with helpers
const hbs = exphbs.create({
  helpers: {
    add: (a, b) => a + b, // Register the custom "add" helper
  },
});

const router = express.Router();

// Middleware to ensure user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

// Register a new user
router.post("/register", async (req, res, next) => {
  try {
    const user = new User({ username: req.body.username, email: req.body.email });
    await User.register(user, req.body.password);

    // Automatically log in the user after registration and redirect to dashboard
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/dashboard");
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login route with passport authentication
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Error during authentication:", err);
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Error logging in:", err);
        return next(err);
      }
      return res.redirect("/dashboard");
    });
  })(req, res, next);
});

// Render the emission form page
router.get("/emission-form", ensureAuthenticated, (req, res) => {
  res.render("emission-form"); // Ensure you have an 'emission-form.hbs' in your views directory
});

// OAuth Google login route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);


router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  try {
    const entries = await EmissionEntry.find({ userId: req.user._id });

    const processedEntries = entries.map((entry) => {
      const totalEmissions = Object.values(entry.emissions || {}).reduce(
        (sum, emission) => sum + (emission.amount || 0),
        0
      );
      return { ...entry.toObject(), totalEmissions };
    });

    res.render("dashboard", { entries: processedEntries });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).send("Error loading dashboard.");
  }
});


// View details of a specific entry
router.get("/dashboard/entry/:id", ensureAuthenticated, async (req, res) => {
  try {
    const entry = await EmissionEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).send("Entry not found.");
    }
    console.log("Entry Fetched:", entry);

    res.render("entry-details", { entry });
  } catch (error) {
    console.error("Error fetching entry details:", error);
    res.status(500).send("Error loading entry details.");
  }
});


// Render feedback form
router.get("/feedback", ensureAuthenticated, (req, res) => {
  res.render("feedback", { user: req.user });
});

// Render update profile page
router.get("/update", ensureAuthenticated, (req, res) => {
  res.render("update", { user: req.user });
});

// Handle feedback submission
router.post("/api/feedback", async (req, res) => {
  const { name, email, feedbackType, message } = req.body;
  try {
    console.log("Feedback received:", { name, email, feedbackType, message });
    res.json({ success: true, message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ success: false, message: "Failed to submit feedback" });
  }
});

// Update user profile
router.post("/api/update", async (req, res) => {
  const { username, email } = req.body;
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({ success: false, message: "Username is already taken." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { username, email },
      { new: true }
    );

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
