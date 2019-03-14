const app = require("../app");
var expect = require("chai").expect;

describe("/api/line_delay", () => {
  let server;

  beforeEach(async () => {
    server = app({});
    // eslint-disable-next-line global-require
    await server.ready();
  });

  it("GET returns 200 if a correct line id is passed", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/api/line_delay?line_id=1"
    });
    expect(response.statusCode).to.equal(200);
    const payload = JSON.parse(response.payload);
    expect(payload).to.deep.equal({ result: true });
  });

  it("GET returns 400 if no query is passed", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/api/line_delay"
    });
    expect(response.statusCode).to.equal(400);
    const payload = JSON.parse(response.payload);
    expect(payload)
      .to.have.property("message")
      .that.equals("Please provide a line id");
  });

  it("GET returns 400 if no line id query is passed without any value", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/api/line_delay?line_id"
    });
    expect(response.statusCode).to.equal(400);
    const payload = JSON.parse(response.payload);
    expect(payload)
      .to.have.property("message")
      .that.equals("Please provide a line id");
  });

  it("GET returns 400 if line id does not exist in data", async () => {
    const line_id = -1;
    const response = await server.inject({
      method: "GET",
      url: "/api/line_delay?line_id=" + line_id
    });
    expect(response.statusCode).to.equal(400);
    const payload = JSON.parse(response.payload);
    expect(payload)
      .to.have.property("message")
      .that.equals("Could not find line ID " + line_id);
  });
});
