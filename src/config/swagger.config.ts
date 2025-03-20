import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dynamic File Management API",
      version: "1.0.0",
      description: "An API to create files dynamically with AI-generated documentation.",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./src/controllers/*.ts"], // Points to files with Swagger annotations
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 
};

