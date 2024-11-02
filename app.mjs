import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a basic route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Carbon Dioxide Emission Calculator!');
});
app.listen(process.env.PORT || 3000);
