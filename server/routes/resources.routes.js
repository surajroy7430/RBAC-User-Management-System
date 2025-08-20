const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const limitRate = require("../middlewares/limiter.middleware");
const {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource,
} = require("../controllers/resource.controller");
const { runValidation } = require("../middlewares/validator.middleware");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { roleMiddleware } = require("../middlewares/role.middleware");

router.use(authMiddleware, roleMiddleware(["user", "admin", "moderator"]));

router.post(
  "/",
  body("title").notEmpty().withMessage("Title is required"),
  runValidation,
  createResource
);
router.get("/", limitRate, getResources);
router.get("/:id", limitRate, getResourceById);
router.put(
  "/:id",
  body("title").optional().notEmpty(),
  runValidation,
  updateResource
);
router.delete("/:id", deleteResource);

module.exports = router;
