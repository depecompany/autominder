import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 25 * 60 * 1000,
  limit: 250,
  max: 315,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again",
});

export default limiter;
