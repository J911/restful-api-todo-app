import * as swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
  info: {
    title: 'Todo RESTful API',
    version: '1.0.0',
    description: 'Todo RESTful API Specification',
  },
  host: "todo-api.j911.me",
  basePath: "/api/v1"
};

const swaggerOptions = {
  swaggerDefinition: swaggerDefinition,
  apis: [
    'src/api/**/*.ts'
  ]
};

export default swaggerJSDoc(swaggerOptions);