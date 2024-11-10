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
app.set('views', path.join(__dirname, 'views'));
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
mongoose.connect(process.env.DSN)
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.render('home', { 
      title: 'Home', 
      message: 'Welcome to the Carbon Emission Calculator!',
      user: req.user // Pass user information if authenticated
    });
  });
  

  app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/login');
    }
    res.render('dashboard', { user: req.user });
  });
  

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login', user: req.user });
  });
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/', // Redirect to home page on successful login
    failureRedirect: '/login'
  }));
  
  
  app.get('/register', (req, res) => {
    res.render('register', { title: 'Register', user: req.user });
  });
  

// Logout route
app.get('/logout', (req, res) => {
    req.logout(() => {
      res.redirect('/'); // Redirect to home page after logout
    });
  });

  app.listen(process.env.PORT,'0.0.0.0', () => {
    console.log(`Server running on http://linserv1.cims.nyu.edu:${process.env.PORT}`);
  });
  