const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'User API',
        description: 'API for managing users'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};
    
const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);