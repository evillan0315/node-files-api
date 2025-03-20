
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *          id:
           type: "string"
         name:
           type: "string"
         email:
           type: "string"
         password:
           type: "string"
         role:
           type: "string"
         createdAt:
           type: "date"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *          id:
           type: "string"
         title:
           type: "string"
         description:
           type: "string"
         ownerId:
           type: "string"
         status:
           type: "string"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *          id:
           type: "string"
         title:
           type: "string"
         description:
           type: "string"
         projectId:
           type: "string"
         assigneeId:
           type: "string"
         status:
           type: "string"
         priority:
           type: "string"
 */
