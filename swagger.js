// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dummy API',
      version: '1.0.0',
      description: 'A simple Express API for articles',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./app.js'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/node/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};