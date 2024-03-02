module.exports = {
    swaggerDefinition: {
      info: {
        title: 'User Management API',
        version: '1.0.0',
        description: 'An API for managing user data, including creation, retrieval, updates, and soft deletion. This API is designed to handle user-related operations with a MongoDB backend.',
    },
      servers: [
        {
          url: 'http://localhost:3000/',
        },
      ],
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
                example: 'Mohammed 2',
              },
              dateOfBirth: {
                type: 'string',
                format: 'date-time',
                example: '2005-11-26T00:00:00.000Z',
              },
              age: {
                type: 'integer',
                example: 18,
              },
              religion: {
                type: 'string',
                example: 'Islam',
              },
              skinColor: {
                type: 'string',
                example: 'White',
              },
              country: {
                type: 'string',
                example: 'Palestine',
              },
              governorate: {
                type: 'string',
                example: 'Al-Russifa',
              },
              hobby: {
                type: 'string',
                example: 'Games',
              },
              profession: {
                type: 'string',
                example: 'Back-End Developer',
              },
              EducationDegree: {
                type: 'string',
                example: 'High School',
              },
            },
          },
        },
      },
    },
    apis: ['./route/*.js'], 
  };