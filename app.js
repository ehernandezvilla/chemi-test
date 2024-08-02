// app.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Function to read JSON data from file
const readJsonFile = (filePath) => {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, filePath)));
};

// Endpoint to get users
app.get('/users', (req, res) => {
  const data = readJsonFile('data.json');
  res.json(data.users);
});

// Endpoint to get products
app.get('/products', (req, res) => {
  const data = readJsonFile('data.json');
  res.json(data.products);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
