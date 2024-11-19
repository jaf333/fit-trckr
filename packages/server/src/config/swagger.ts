// packages/server/src/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FitTrackr API Documentation',
      version: '1.0.0',
      description: 'API documentation for the FitTrackr application',
      contact: {
        name: 'Development Team'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      BearerAuth: []
    }],
    tags: [
      {
        name: 'Auth',
        description: 'Authentication endpoints'
      },
      {
        name: 'Users',
        description: 'User management endpoints'
      },
      {
        name: 'Profiles',
        description: 'User profile endpoints'
      },
      {
        name: 'Workouts',
        description: 'Workout management endpoints'
      },
      {
        name: 'Exercise Templates',
        description: 'Exercise template endpoints'
      }
    ]
  },
  apis: ['./src/routes/*.ts'] // Path to the API routes
};

export const specs = swaggerJsdoc(options);
