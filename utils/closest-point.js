const _ = require("lodash");

const ClosestPoint = (stops, x, y) => {
	let current_location = { x, y };
	let locations = _.map(stops, ({ x, y }) => {
		return { x, y };
	});
	function distance(p1, p2) {
		var dx = Math.abs(p1.x - p2.x);
		var dy = Math.abs(p1.y - p2.y);
		return Math.sqrt(dx * dx + dy * dy);
	}

	function calculateClosestPair(arr) {
		if (arr.length < 2) {
			return Infinity;
		} else {
			var minDist = distance(arr[0], current_location);
			var minPoints = arr.slice(0, 1);

			for (var j = 0; j < arr.length; j++) {
				if (distance(current_location, arr[j]) < minDist) {
					minDist = distance(current_location, arr[j]);
					minPoints = [arr[j]];
				}
			}
			return {
				distance: minDist,
				points: minPoints
			};
		}
	}

	const getClosestPoint = () => {
		let closest_pair = calculateClosestPair(locations);
		return { current_location, closest_pair };
	};

	return { getClosestPoint };
};
module.exports = ClosestPoint;
