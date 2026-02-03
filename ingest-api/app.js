const express = require("express");
const Redis = require("ioredis");

const app = express();
app.use(express.json());

const redis = new Redis({
  host: "redis.monitoring.svc.cluster.local",
  port: 6379,
});

app.post("/event", async (req, res) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey !== "agent-key") {
    return res.status(403).json({ error: "Forbidden" });
  }

  await redis.lpush("events", JSON.stringify(req.body));
  console.log("Event received:", req.body);

  res.json({ status: "accepted" });
});

app.listen(3000, () => {
  console.log("Ingest API running on port 3000");
});
