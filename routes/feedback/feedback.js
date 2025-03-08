const { runQuery, getRows } = require("../../db/db");

const feedback = {
  async addFeedback(req, reply) {
    try {
      const { name, phone, rating, feedback } = req.body;
      const query = "INSERT INTO feedback (customer_name, phone_number, rating, feedback_text) VALUES (?, ?, ?, ?)";
      const data=[name, phone, rating, feedback];
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
