async function routes(fastify) {
  const data = require("../data")();
  const VehicleController = require("../controllers/vehicleController");
  const vehicleController = await VehicleController(data);
  const tsvalidator = require("../utils/timestamp-validator");

  fastify.get("/api/find_vehicle", async (request, response) => {
    try {
      let { query } = request;
      let { x, y, timestamp } = query;
      if (isNaN(parseInt(x))) throw new Error("Please provide x as a number");
      if (isNaN(parseInt(y))) throw new Error("Please provide y as a number");
      if (!timestamp) throw new Error("Please provide timestamp");
      tsvalidator(timestamp);
      let vehicle_information = await vehicleController.getVehicleInformation(
        x,
        y,
        timestamp
      );
      return vehicle_information;
    } catch (err) {
      return response.status(400).send(err);
    }
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

  fastify.get("/api/next_vehicle", async (request, response) => {
    try {
      let { query } = request;
      let { stop_id, timestamp } = query;
      if (!stop_id) throw new Error("Please provide stop_id");
      if (!timestamp) throw new Error("Please provide timestamp");
      tsvalidator(timestamp);
      let next_vehicle = await vehicleController.getNextVechicle(
        stop_id,
        timestamp
      );
      return next_vehicle;
    } catch (err) {
      return response.status(400).send(err);
    }
  });
}

module.exports = routes;
