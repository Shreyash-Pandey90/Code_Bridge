// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { generateContent } = require('./index.js');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/api/data', async(req, res) => {
  try {
    const requestData = req.body;
    const data = await generateContent(requestData);
    await res.json({ message: data });
  } catch(error) {
    res.status(500).json({ error: 'Error generating content' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
