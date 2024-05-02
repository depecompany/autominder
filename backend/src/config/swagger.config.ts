import swaggerJsDoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "0.1.o",
      title: "AutoMinder API",
      description: "API Documentation for use",
      contact: {
        name: "Depe",
        url: "https://github.com/depecompany",
      },
      servers: [`http://localhost:${PORT}/api/`],
    },
  },
  apis: ["**/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs };
