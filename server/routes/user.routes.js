const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  changeUserRole,
} = require("../controllers/user.controller");
const limitRate = require("../middlewares/limiter.middleware");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { roleMiddleware } = require("../middlewares/role.middleware");

router.use(authMiddleware, roleMiddleware(["admin"]));

router.get("/", limitRate, getAllUsers);
router.patch("/:id/role", changeUserRole);

module.exports = router;
