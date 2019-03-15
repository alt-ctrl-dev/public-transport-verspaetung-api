const boom = require("boom");
const _ = require("lodash");
const ClosestPoint = require("../utils/closest-point");

const VehicleController = async data => {
	const { timetable, stops_loc } = await data.collection;
	const getVehicleInformation = async (x, y, timestamp) => {
		try {
			let cp = ClosestPoint(stops_loc, x, y);
			let closest_point = cp.getClosestPoint();

			let { distance, points } = closest_point.closest_pair;

			let point = points[0];

			let stop_index = _.findIndex(stops_loc, function(o) {
				return o.x == point.x && o.y == point.y;
			});
			let stop = stops_loc[stop_index];
			let { next_line } = await getNextVechicle(stop.stop_id, timestamp);

			return { next_line, distance };
		} catch (err) {
			throw boom.boomify(err);
		}
	};

	const isLineDelayed = async line_id => {
		let index = _.findIndex(timetable, function(o) {
			return o.line_id === line_id;
		});
		if (index === -1) {
			throw boom.boomify(new Error("Could not find line ID " + line_id));
		}
		let delay = timetable[index].delay;
		let result = delay > 0;
		return { delay, result };
	};

	const getNextVechicle = async (stop_id, timestamp) => {
		let vehicles = _.filter(timetable, function(tt) {
			return _.some(tt.stops, s => {
				return (
					s.stop_id == stop_id &&
          Date.parse(`01/01/2011 ${timestamp}`) <
            Date.parse(`01/01/2011 ${s.stop_time}`)
				);
			});
		});

		let next_line = [];
		vehicles.forEach(v => {
			let stops = _.filter(v.stops, s => {
				return (
					s.stop_id == stop_id &&
          Date.parse(`01/01/2011 ${timestamp}`) <
            Date.parse(`01/01/2011 ${s.stop_time}`)
				);
			});
			next_line.push({ line_name: v.line_name, line_id: v.line_id, stops });
		});
		return { next_line };
	};

	return { getVehicleInformation, isLineDelayed, getNextVechicle };
};

module.exports = VehicleController;
