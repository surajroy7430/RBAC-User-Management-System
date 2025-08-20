const express = require("express");
const router = express.Router();
const limitRate = require("../middlewares/limiter.middleware");
const { register, login } = require("../controllers/auth.controller");
const {
  registerValidation,
  loginValidation,
  runValidation,
} = require("../middlewares/validator.middleware");

router.post("/register", registerValidation, runValidation, register);
router.post("/login", limitRate, loginValidation, runValidation, login);

module.exports = router;
