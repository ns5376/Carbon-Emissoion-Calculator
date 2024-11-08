import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up the view engine (EJS in this example)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a basic route for testing
// Define a route to render the home page
app.get('/', (req, res) => {
    res.render('home', { title: 'Carbon Dioxide Emission Calculator' });
  });
  app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
