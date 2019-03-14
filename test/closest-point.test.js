const ClosestPoint = require("../utils/closest-point");
var expect = require("chai").expect;

describe("closest point validation", () => {
  it("It can calculate the correct distance", async () => {
    const data = require("../data")();
    const { stops_loc } = await data.collection;
    const x = 1,
      y = 0;
    let cp = ClosestPoint(stops_loc, x, y);
    let cp_op = cp.getClosestPoint();

    expect(cp_op.current_location).to.deep.equal({ x, y });
    expect(cp_op.closest_pair).to.have.property("distance");
    expect(cp_op.closest_pair)
      .to.have.property("distance")
      .that.is.a("number");

    console.log("cp_op.closest_pair.points", cp_op.closest_pair.points);
    expect(cp_op.closest_pair)
      .to.have.property("points")
      .to.have.lengthOf(1);
  });
});
