async function routes(fastify) {
  const _ = require("lodash");
  const data = require("../data")();
  const VehicleController = require("../controllers/vehicleController");
  const vehicleController = VehicleController(data);

  fastify.get("/api/find_vehicle", async (request, response) => {
    try {
      let { query } = request;
      let { x, y, timestamp } = query;
      if (isNaN(parseInt(x))) throw new Error("Please provide x as a number");
      if (isNaN(parseInt(y))) throw new Error("Please provide y as a number");
      let timeArr = _.split(timestamp, ":");

      if (timeArr.length !== 3) {
        throw new Error("Please provide timestamp as HH:MM:SS");
      }

      let hour = parseInt(timeArr[0]);
      let minute = parseInt(timeArr[1]);
      let second = parseInt(timeArr[2]);
      if (isNaN(hour) || isNaN(minute) || isNaN(second))
        throw new Error(
          "Please provide timestamp as numeric values in the format HH:MM:SS"
        );

      console.log("hour", hour > 24);
      // console.log("timeArr[0].length", timeArr[0].length);
      // console.log(
      //   "(hour > 24 && hour < 0) || timeArr[0].length !== 2",
      //   (hour > 24 && hour < 0) || timeArr[0].length !== 2
      // );

      if (hour >= 24 || hour < 0 || timeArr[0].length !== 2)
        throw new Error(
          "Please provide the hours in timestamp between 00 and 24"
        );

      if (minute >= 60 || minute < 0 || timeArr[1].length !== 2)
        throw new Error(
          "Please provide the minutes in timestamp between 00 and 60"
        );

      if (second >= 60 || second < 0 || timeArr[2].length !== 2)
        throw new Error(
          "Please provide the seconds in timestamp between 00 and 60"
        );

      let vehicleInformation = await vehicleController.getVehicleInformation(
        x,
        y,
        timestamp
      );
      return vehicleInformation;
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
}

module.exports = routes;
