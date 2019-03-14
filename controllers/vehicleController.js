const boom = require("boom");
const _ = require("lodash");
const ClosestPoint = require("../utils/closest-point");

const VehicleController = data => {
  const getVehicleInformation = async (x, y, timestamp) => {
    try {
      const { timetable, stops_loc } = await data.collection;
      let cp = ClosestPoint(stops_loc, x, y);
      let cp_op = cp.getClosestPoint();

      let { distance, points } = cp_op.closest_pair;

      point = points[0];

      let stop_index = _.findIndex(stops_loc, function(o) {
        return o.x == point.x && o.y == point.y;
      });
      let stop = stops_loc[stop_index];

      let vehicles = _.filter(timetable, function(tt) {
        return _.some(tt.stops, s => {
          return s.stop_id == stop.stop_id && timestamp < s.stop_time;
        });
      });

      let next_line = [];
      vehicles.forEach(v => {
        let stops = _.filter(v.stops, s => {
          return s.stop_id == stop.stop_id;
        });
        next_line.push({ line_name: v.line_name, line_id: v.line_id, stops });
      });

      return { next_line, distance };
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
