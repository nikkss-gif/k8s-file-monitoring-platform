const Redis = require("ioredis");

const redis = new Redis({
  host: "redis",
  port: 6379,

  // IMPORTANT: make Redis tolerant to temporary DNS / network issues
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
  retryStrategy(times) {
    console.log(`Redis retry attempt #${times}`);
    return Math.min(times * 100, 2000); // backoff
  },
});

console.log("Processor started, waiting for events...");

async function processEvents() {
  while (true) {
    const data = await redis.brpop("events", 0);
    const event = JSON.parse(data[1]);

    console.log("Processed event:", event);

    // later: send to OpenSearch
  }
}

processEvents();

