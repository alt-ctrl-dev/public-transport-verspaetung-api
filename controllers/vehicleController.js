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
    const { timetable } = await data.collection;
    let index = _.findIndex(timetable, function(o) {
      return o.line_id === line_id;
    });
    if (index === -1) {
      throw boom.boomify(new Error("Could not find line ID " + line_id));
    }

    return timetable[index].delay > 0;
  };

  return { getVehicleInformation, isLineDelayed };
};

module.exports = VehicleController;
