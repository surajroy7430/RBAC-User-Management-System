const { rateLimit } = require("express-rate-limit");

const limitRate = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  message: {
    msg: "Too many request. Please try again later.",
  },
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

module.exports = limitRate;
