const fastify = require("./app")({
  logger: true
});

const start = async () => {
  try {
    let address = await fastify.listen(8081, "0.0.0.0");
    fastify.log.info(`server listening on ${address}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
