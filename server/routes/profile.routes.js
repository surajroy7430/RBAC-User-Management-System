const express = require("express");
const router = express.Router();
const limitRate = require("../middlewares/limiter.middleware");
const {
  getProfile,
  updateProfile,
} = require("../controllers/profile.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const {
  profileValidation,
  runValidation,
} = require("../middlewares/validator.middleware");

router.use(authMiddleware);

router.get("/", limitRate, getProfile);
router.put("/", profileValidation, runValidation, updateProfile);

module.exports = router;
