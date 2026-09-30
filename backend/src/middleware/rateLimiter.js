import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-rate-limit");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    next();
  } catch (error) {
    console.warn("Rate limit service unavailable, continuing request:", error.message);
    next(); // fail-open so the entire app doesn't break if Redis is unreachable
  }
};

export default rateLimiter;
