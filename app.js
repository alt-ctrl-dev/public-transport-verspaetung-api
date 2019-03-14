const buildFastify = config => {
	const fastify = require("fastify")(config);

	fastify.register(require("fastify-cors"), {
		options: {
			origin: true
		}
	});

	fastify.register(require("fastify-helmet"));
	fastify.register(require("./routes"));
	return fastify;
};
module.exports = buildFastify;
