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

// Endpoint to get all articles
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
 *                 $ref: '#/components/schemas/Article'
 */
app.get('/node/articles', (req, res) => {
  const data = readJsonFile('data.json');
  res.json(data.articles);
});

// Endpoint to get a single article
/**
 * @swagger
 * /node/articles/{id}:
 *   get:
 *     summary: Retrieve a single article
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The article ID
 *     responses:
 *       200:
 *         description: A single article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 */
app.get('/node/articles/:id', (req, res) => {
  const data = readJsonFile('data.json');
  const article = data.articles.find(a => a.id === parseInt(req.params.id));
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

// Endpoint to get all authors
/**
 * @swagger
 * /node/authors:
 *   get:
 *     summary: Retrieve a list of authors
 *     responses:
 *       200:
 *         description: A list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 */
app.get('/node/authors', (req, res) => {
  const data = readJsonFile('data.json');
  const authors = data.articles.map(article => article.author);
  res.json(authors);
});

// Endpoint to get all categories
/**
 * @swagger
 * /node/categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
app.get('/node/categories', (req, res) => {
  const data = readJsonFile('data.json');
  const categories = data.articles.map(article => article.category);
  res.json(categories);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});