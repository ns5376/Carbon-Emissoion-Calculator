// app.mjs
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import User from './models/User.mjs';
import 'dotenv/config';
import path from 'path';
import authRoutes from './routes/authRoutes.mjs';
import { fileURLToPath } from 'url';
import './controllers/authController.mjs'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
// Set up sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport and session support
app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to MongoDB
mongoose.connect(process.env.DSN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.render('home', { 
      title: 'Home', 
      message: 'Welcome to the Carbon Emission Calculator!',
      user: req.user  // Pass user information if authenticated
    });
  });
  

app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  res.send('Welcome to your dashboard!');
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login', user: req.user });
  });
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',  // Redirect to home page on successful login
    failureRedirect: '/login'
  }));
  
  
  app.get('/register', (req, res) => {
    res.render('register', { title: 'Register', user: req.user });
  });
  

// Registration route
app.post('/register', async (req, res) => {
    try {
      const user = new User({ username: req.body.username, email: req.body.email });
      await User.register(user, req.body.password);
      res.redirect('/login');  // Redirect to login after registration
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  



// Logout route
app.get('/logout', (req, res) => {
    req.logout(() => {
      res.redirect('/');  // Redirect to home page after logout
    });
  });

// Start server
app.listen(5001, () => {
  console.log('Server running on http://localhost:3000');
});
