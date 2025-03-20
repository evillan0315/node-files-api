import express from "express";
import cors from "cors";
import fileRoutes from "./routes/file.routes";
import { setupSwagger } from "./config/swagger.config";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use("/files", fileRoutes);

// Apply error-handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📜 Swagger docs available at http://localhost:${PORT}/api-docs`);
});

