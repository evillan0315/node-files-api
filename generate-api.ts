import fs from "fs-extra";
import path from "path";

// Load API config
const configPath = path.join(__dirname, "api-config.json");
const apiConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));

// Root directory for API
const SRC_DIR = path.join(__dirname, "src");
const FOLDERS = ["routes", "controllers", "services", "types", "utils", "config"];

// Ensure base folders exist
FOLDERS.forEach(folder => fs.ensureDirSync(path.join(SRC_DIR, folder)));

// Generate API files dynamically
apiConfig.entities.forEach((entity: any) => {
  const entityName = entity.name;
  const lowerEntity = entityName.toLowerCase();

  // 1️⃣ Generate Routes
  if (entity.routes) {
    const routeContent = `
import express from "express";
import { create${entityName}, get${entityName}, update${entityName}, delete${entityName} } from "../controllers/${lowerEntity}.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ${entityName}
 *   description: API for managing ${entityName}s
 */

/**
 * @swagger
 * /${lowerEntity}s:
 *   get:
 *     summary: Get all ${entityName}s
 *     tags: [${entityName}]
 *     responses:
 *       200:
 *         description: A list of ${entityName}s
 *   post:
 *     summary: Create a new ${entityName}
 *     tags: [${entityName}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/${entityName}"
 *     responses:
 *       201:
 *         description: ${entityName} created
 *
 * /${lowerEntity}s/{id}:
 *   get:
 *     summary: Get a single ${entityName} by ID
 *     tags: [${entityName}]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ${entityName} found
 *   put:
 *     summary: Update a ${entityName} by ID
 *     tags: [${entityName}]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/${entityName}"
 *     responses:
 *       200:
 *         description: ${entityName} updated
 *   delete:
 *     summary: Delete a ${entityName} by ID
 *     tags: [${entityName}]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ${entityName} deleted
 */

router.get("/", get${entityName});
router.post("/", create${entityName});
router.get("/:id", get${entityName});
router.put("/:id", update${entityName});
router.delete("/:id", delete${entityName});

export default router;
`;
    fs.writeFileSync(path.join(SRC_DIR, "routes", `${lowerEntity}.routes.ts`), routeContent);
  }

  // 2️⃣ Generate Controllers
  if (entity.controller) {
    const controllerContent = `
import { Request, Response } from "express";
import { create${entityName}Service, get${entityName}Service, update${entityName}Service, delete${entityName}Service } from "../services/${lowerEntity}.service";
import { handleError } from "../utils/errorHandler";

export const create${entityName} = async (req: Request, res: Response) => {
  try {
    const result = await create${entityName}Service(req.body);
    res.status(201).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export const get${entityName} = async (req: Request, res: Response) => {
  try {
    const result = await get${entityName}Service(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export const update${entityName} = async (req: Request, res: Response) => {
  try {
    const result = await update${entityName}Service(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};

export const delete${entityName} = async (req: Request, res: Response) => {
  try {
    const result = await delete${entityName}Service(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
};
`;
    fs.writeFileSync(path.join(SRC_DIR, "controllers", `${lowerEntity}.controller.ts`), controllerContent);
  }

  // 3️⃣ Generate Services
  if (entity.service) {
    const serviceContent = `
import { ${entityName} } from "../types/${lowerEntity}.types";

export const create${entityName}Service = async (data: ${entityName}) => {
  return { message: "${entityName} created", data };
};

export const get${entityName}Service = async (id: string) => {
  return { message: "Returning ${entityName} with ID " + id };
};

export const update${entityName}Service = async (id: string, data: ${entityName}) => {
  return { message: "${entityName} updated", data };
};

export const delete${entityName}Service = async (id: string) => {
  return { message: "${entityName} deleted", id };
};
`;
    fs.writeFileSync(path.join(SRC_DIR, "services", `${lowerEntity}.service.ts`), serviceContent);
  }

  // 4️⃣ Generate Types
  if (entity.types) {
    const typesContent = `
export interface ${entityName} {
  ${Object.entries(entity.fields)
    .map(([key, type]) => `${key}: ${type};`)
    .join("\n  ")}
}
`;
    fs.writeFileSync(path.join(SRC_DIR, "types", `${lowerEntity}.types.ts`), typesContent);
  }
 
const schemaContent = `
/**
 * @swagger
 * components:
 *   schemas:
 *     ${entityName}:
 *       type: object
 *       properties:
 * ${Object.entries(entity.fields)
  .map(([key, type]) => `         ${key}:\n           type: "${type}"`)
  .join("\n")}
 */
`;
fs.appendFileSync(path.join(SRC_DIR, "config", "swagger.ts"), schemaContent);
});

// 5️⃣ Generate Utility Files
fs.writeFileSync(
  path.join(SRC_DIR, "utils", "errorHandler.ts"),
  `
import { Response } from "express";

export const handleError = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(500).json({ error: "An unknown error occurred" });
  }
};
`
);

fs.writeFileSync(
  path.join(SRC_DIR, "utils", "logger.ts"),
  `
export const logger = (message: string) => {
  console.log("[LOG]:", message);
};
`
);

// 6️⃣ Generate Config
fs.writeFileSync(
  path.join(SRC_DIR, "config", "config.ts"),
  `
export const config = {
  db: "${apiConfig.config.db}",
  auth: "${apiConfig.config.auth}",
  useSwagger: ${apiConfig.config.useSwagger}
};
`
);






// ✅ Done!
console.log("✅ API files generated successfully!");

