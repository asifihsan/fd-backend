const fastify = require("fastify")({ logger: true });
// const fastify = require("fastify")();
fastify.register(require("@fastify/cors"), { 
  origin: "http://localhost:5173"
});

require("dotenv").config();


const Routes = require("./routes/routes"); 

// Register Routes
fastify.register(Routes, { prefix: "/api" }); 

// Start Server
fastify.listen({ port: process.env.PORT || 3000 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server running on http://localhost:${process.env.PORT || 3000}`);
});



