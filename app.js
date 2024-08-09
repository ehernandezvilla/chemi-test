// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const setupSwagger = require('./swagger');
const customLogger = require('./customLogger');
const cors = require('cors');

const app = express();
const port = 3000;

// Create a write stream (in append mode) for Morgan
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Setup Morgan for logging
app.use(morgan('combined', { stream: accessLogStream }));

// Setup custom logger
app.use(customLogger);

// Setup CORS
app.use(cors());

// Function to read JSON data from file
const readJsonFile = (filePath) => {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, filePath)));
};

// Setup Swagger
setupSwagger(app);

// Front page endpoint
app.get('/node', (req, res) => {
  res.send('<h1>Welcome to the Dummy API</h1><p>Use <a href="/node/api-docs">/node/api-docs</a> to view the API documentation.</p>');
});

// Endpoint to get articles
/**
 * @swagger
 * /node/articles:
 *   get:
 *     summary: Retrieve a list of articles
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   href:
 *                     type: string
 *                   description:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 *                   date:
 *                     type: string
 *                   datetime:
 *                     type: string
 *                   category:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       href:
 *                         type: string
 *                   author:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       role:
 *                         type: string
 *                       href:
 *                         type: string
 *                       imageUrl:
 *                         type: string
 */
app.get('/node/articles', (req, res) => {
  const data = readJsonFile('data.json');
  res.json(data.articles);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});