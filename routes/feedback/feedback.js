const { runQuery, getRows } = require("../../db/db");

const feedback = {
    async addFeedback(req, reply) {
        try {
          const { name, phone, rating, feedback } = req.body;
      
          // Basic validation
          if (!name || typeof name !== "string" || name.trim().length === 0) {
            return reply.code(400).send({ success: false, message: "Invalid name" });
          }
          if (!phone || !/^\d{10}$/.test(phone)) {
            return reply.code(400).send({ success: false, message: "Invalid phone number" });
          }
          if (
            rating === undefined ||
            isNaN(rating) ||
            rating < 0.5 ||
            rating > 5
          ) {
            return reply.code(400).send({ success: false, message: "Rating must be a number between 1 and 5" });
          }
          if (!feedback || typeof feedback !== "string" || feedback.trim().length < 5) {
            return reply.code(400).send({ success: false, message: "Feedback must be at least 5 characters long" });
          }
      
          const query = "INSERT INTO feedback (customer_name, phone_number, rating, feedback_text) VALUES (?, ?, ?, ?)";
          const data = [name.trim(), phone, rating, feedback.trim()];
          const result = await runQuery(query, data);
      
          reply.code(200).send({ success: true, message: "Feedback stored", id: result.id });
        } catch (error) {
          reply.code(500).send({ success: false, error: error.message });
        }
      },
      
  async getAllFeedback(req, reply) {
    try {
      const rows = await getRows("SELECT * FROM feedback ORDER BY timestamp DESC");
      reply.code(200).send(rows);
    } catch (error) {
      reply.code(500).send({ success: false, error: error.message });
    }
  },

  async getFeedbackStats(req, reply) {
    try {
      const query = `
        SELECT rating, COUNT(*) as count, 
               (SELECT AVG(rating) FROM feedback) as avg_rating
        FROM feedback GROUP BY rating`;
      const rows = await getRows(query);
      reply.code(200).send(rows);
    } catch (error) {
      reply.code(500).send({ success: false, error: error.message });
    }
  },
};

module.exports = feedback;
