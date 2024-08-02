// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const setupSwagger = require('./swagger');
const customLogger = require('./customLogger');

const app = express();
const port = 3000;

// Setup Morgan for logging
app.use(morgan('combined'));

// Setup custom logger
app.use(customLogger);

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

// Endpoint to get users
/**
 * @swagger
 * /node/users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
app.get('/node/users', (req, res) => {
  const data = readJsonFile('data.json');
  res.json(data.users);
});

// Endpoint to get products
/**
 * @swagger
 * /node/products:
 *   get:
 *     summary: Retrieve a list of products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 */
app.get('/node/products', (req, res) => {
  const data = readJsonFile('data.json');
  res.json(data.products);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
