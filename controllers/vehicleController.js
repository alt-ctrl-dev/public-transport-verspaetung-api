const boom = require("boom");
const _ = require("lodash");

const VehicleController = data => {
  const getVehicleInformation = async ({ timestamp, x, y }) => {
    // console.log("x", x);
    // console.log("y", y);
    // console.log("timestamp", timestamp);
    try {
      const { timetable } = await data.collection;
      return timetable;
    } catch (err) {
      throw boom.boomify(err);
    }
  };

  const isLineDelayed = async line_id => {
    try {
      const { timetable } = await data.collection;
      let index = _.findIndex(timetable, function(o) {
        return o.line_id === line_id;
      });
      if (index === -1) {
        throw boom.boomify(
          {
            error: true,
            message: "Could not find line ID " + line_id
          },
          { statusCode: 400 }
        );
      }

      return timetable[index].delay > 0;
    } catch (err) {
      throw boom.boomify(err);
    }
  };

  return { getVehicleInformation, isLineDelayed };
};

module.exports = VehicleController;
