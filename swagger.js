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
    components: {
      schemas: {
        Article: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            href: { type: 'string' },
            description: { type: 'string' },
            imageUrl: { type: 'string' },
            date: { type: 'string' },
            datetime: { type: 'string' },
            category: { $ref: '#/components/schemas/Category' },
            author: { $ref: '#/components/schemas/Author' },
          },
        },
        Category: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            href: { type: 'string' },
          },
        },
        Author: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            role: { type: 'string' },
            href: { type: 'string' },
            imageUrl: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./app.js'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/node/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};