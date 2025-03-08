const feedbackAPI = require("./feedback/feedback");

module.exports = async function (fastify, opts) {
  fastify.post("/feedback", feedbackAPI.addFeedback);
  fastify.get("/feedback", feedbackAPI.getAllFeedback);
  fastify.get("/feedback/stats", feedbackAPI.getFeedbackStats);
};
