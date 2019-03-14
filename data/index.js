module.exports = () => {
  const _ = require("lodash");
  let lines, stopTimes, delays, stops;

  const getLines = () => {
    if (!lines) {
      lines = readCsv("lines.csv");
    }
    return lines;
  };
  const getStopTimes = () => {
    if (!stopTimes) {
      stopTimes = readCsv("times.csv");
    }
    return stopTimes;
  };
  const getStops = () => {
    if (!stops) {
      stops = readCsv("stops.csv");
    }
    return stops;
  };
  const getDelays = () => {
    if (!delays) {
      delays = readCsv("delays.csv");
    }
    return delays;
  };

  async function readCsv(fileName) {
    const csv = require("csvtojson");
    const jsonObj = await csv().fromFile(__dirname + "/" + fileName);
    return jsonObj;
  }

  const getAllData = async () => {
    let timetable = [];
    let lines = await getLines();
    let stops = await getStops();
    let delays = await getDelays();
    let times = await getStopTimes();

    lines.forEach(line => {
      let line_id = parseInt(line.line_id);
      let index = _.findIndex(timetable, function(o) {
        return o.line_id === line_id;
      });
      if (index === -1) {
        timetable.push({
          line_id,
          line_name: line.line_name,
          stops: []
        });
      } else {
        timetable[index].line_name = line.line_name;
      }
    });

    times.forEach(stop_time => {
      let line_id = parseInt(stop_time.line_id);

      let line_index = _.findIndex(timetable, function(o) {
        return o.line_id === line_id;
      });

      if (line_index === -1) {
        timetable.push({
          line_id,
          line_name: line_id,
          stops: []
        });
      }
      if (!timetable[line_index].stops) timetable[line_index].stops = [];

      let stop_id = parseInt(stop_time.stop_id);
      let stop_index = _.findIndex(timetable[line_index].stops, function(o) {
        return parseInt(o.stop_id) === stop_id;
      });

      // if (stop_index === -1) {
      //Add stop detail
      timetable[line_index].stops.push({
        stop_id,
        stop_time: stop_time.time
      });
      // } else {
      //   //Replace time as it is the new updated time
      //   timetable[line_index].stops[stop_index].stop_time = stop_time.time;
      // }
    });

    delays.forEach(delay => {
      let delay_time = parseInt(delay.delay);

      let delay_index = _.findIndex(timetable, function(o) {
        return o.line_name === delay.line_name;
      });
      timetable[delay_index].delay = delay_time;
    });

    return { timetable, stops_loc: stops };
  };

  return {
    collection: getAllData()
  };
};
