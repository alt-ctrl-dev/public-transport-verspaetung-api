async function routes(fastify) {
  const boom = require("boom");
  const data = require("../data")();
  const VehicleController = require("../controllers/vehicleController");
  const vehicleController = VehicleController(data);

  fastify.get("/api/find_vehicle", async request => {
    let { query } = request;
    let vehicleInformation = await vehicleController.getVehicleInformation(
      query
    );
    return vehicleInformation;
  });

  fastify.get("/api/line_delay", async (request, response) => {
    try {
      let { query } = request;
      let { line_id } = query;
      line_id = parseInt(line_id);
      if (line_id !== null && !isNaN(line_id)) {
        let vehicleInformation = await vehicleController.isLineDelayed(line_id);
        return { result: vehicleInformation };
      } else {
        response.status(400).send({
          error: true,
          message: "Please provide a line id"
        });
      }
    } catch (err) {
      return response.status(400).send(err);
    }
  });
}

module.exports = routes;
