/* eslint-disable no-undef */
const app = require("../app");
var expect = require("chai").expect;

describe("/api/find_vehicle", () => {
	let server;

	beforeEach(async () => {
		server = app({});
		// eslint-disable-next-line global-require
		await server.ready();
	});

	it("GET returns 200 if a correct parameters are passed", async () => {
		const response = await server.inject({
			method: "GET",
			url: "/api/find_vehicle?x=0&y=0&timestamp=09:00:00"
		});

		expect(response.statusCode).to.equal(200);
		const payload = JSON.parse(response.payload);
		expect(payload)
			.to.have.property("next_line")
			.to.be.an("array")
			.of.length(1);

		expect(payload.next_line[0])
			.to.have.property("stops")
			.to.be.an("array")
			.of.length(1);

		expect(payload)
			.to.have.property("distance")
			.to.equal(1.4142135623730951);
	});

	it("GET returns 400 if X is not passed", async () => {
		const response = await server.inject({
			method: "GET",
			url: "/api/find_vehicle"
		});
		expect(response.statusCode).to.equal(400);
		const payload = JSON.parse(response.payload);
		expect(payload)
			.to.have.property("message")
			.that.equals("Please provide x as a number");
	});

	it("GET returns 400 if X is not a number", async () => {
		const response = await server.inject({
			method: "GET",
			url: "/api/find_vehicle?x=a"
		});
		expect(response.statusCode).to.equal(400);
		const payload = JSON.parse(response.payload);
		expect(payload)
			.to.have.property("message")
			.that.equals("Please provide x as a number");
	});

	it("GET returns 400 if Y is not passed", async () => {
		const response = await server.inject({
			method: "GET",
			url: "/api/find_vehicle?x=1"
		});
		expect(response.statusCode).to.equal(400);
		const payload = JSON.parse(response.payload);
		expect(payload)
			.to.have.property("message")
			.that.equals("Please provide y as a number");
	});

	it("GET returns 400 if Y is not passed as a number", async () => {
		const response = await server.inject({
			method: "GET",
			url: "/api/find_vehicle?x=1&y=c"
		});
		expect(response.statusCode).to.equal(400);
		const payload = JSON.parse(response.payload);
		expect(payload)
			.to.have.property("message")
			.that.equals("Please provide y as a number");
	});

	it("GET returns 400 if timestamp is not passed", async () => {
		const response = await server.inject({
			method: "GET",
			url: "/api/find_vehicle?x=1&y=0"
		});
		expect(response.statusCode).to.equal(400);
		const payload = JSON.parse(response.payload);
		expect(payload)
			.to.have.property("message")
			.that.equals("Please provide timestamp");
	});

	it("GET returns 400 if timestamp is not passed as numbers", async () => {
		const response = await server.inject({
			method: "GET",
			url: "/api/find_vehicle?x=1&y=0&timestamp=a:b:c"
		});
		expect(response.statusCode).to.equal(400);
		const payload = JSON.parse(response.payload);
		expect(payload)
			.to.have.property("message")
			.that.equals(
				"Please provide timestamp as numeric values in the format HH:MM:SS"
			);
	});

	it("GET returns 400 if timestamp is passed as H:M:S", async () => {
		const response = await server.inject({
			method: "GET",
			url: "/api/find_vehicle?x=1&y=0&timestamp=9:9:9"
		});
		expect(response.statusCode).to.equal(400);
		const payload = JSON.parse(response.payload);
		expect(payload)
			.to.have.property("message")
			.that.equals("Please provide the hours in timestamp between 00 and 23");
	});

	it("GET returns 400 if timestamp is passed as HH:M:S", async () => {
		const response = await server.inject({
			method: "GET",
			url: "/api/find_vehicle?x=1&y=0&timestamp=09:9:9"
		});
		expect(response.statusCode).to.equal(400);
		const payload = JSON.parse(response.payload);
		expect(payload)
			.to.have.property("message")
			.that.equals("Please provide the minutes in timestamp between 00 and 59");
	});

	it("GET returns 400 if timestamp is passed as HH:MM:S", async () => {
		const response = await server.inject({
			method: "GET",
			url: "/api/find_vehicle?x=1&y=0&timestamp=09:09:9"
		});
		expect(response.statusCode).to.equal(400);
		const payload = JSON.parse(response.payload);
		expect(payload)
			.to.have.property("message")
			.that.equals("Please provide the seconds in timestamp between 00 and 59");
	});

	it("GET returns 400 if timestamp is passed as as time greater than 23 hours", async () => {
		const response = await server.inject({
			method: "GET",
			url: "/api/find_vehicle?x=1&y=0&timestamp=24:09:09"
		});
		expect(response.statusCode).to.equal(400);
		const payload = JSON.parse(response.payload);
		expect(payload)
			.to.have.property("message")
			.that.equals("Please provide the hours in timestamp between 00 and 23");
	});

	it("GET returns 400 if timestamp is passed as as time less than 00 hours", async () => {
		const response = await server.inject({
			method: "GET",
			url: "/api/find_vehicle?x=1&y=0&timestamp=-01:09:09"
		});
		expect(response.statusCode).to.equal(400);
		const payload = JSON.parse(response.payload);
		expect(payload)
			.to.have.property("message")
			.that.equals("Please provide the hours in timestamp between 00 and 23");
	});

	it("GET returns 400 if timestamp is passed as as time less than 00 minute", async () => {
		const response = await server.inject({
			method: "GET",
			url: "/api/find_vehicle?x=1&y=0&timestamp=01:-09:09"
		});
		expect(response.statusCode).to.equal(400);
		const payload = JSON.parse(response.payload);
		expect(payload)
			.to.have.property("message")
			.that.equals("Please provide the minutes in timestamp between 00 and 59");
	});

	it("GET returns 400 if timestamp is passed as as time greater than 59 minute", async () => {
		const response = await server.inject({
			method: "GET",
			url: "/api/find_vehicle?x=1&y=0&timestamp=01:60:09"
		});
		expect(response.statusCode).to.equal(400);
		const payload = JSON.parse(response.payload);
		expect(payload)
			.to.have.property("message")
			.that.equals("Please provide the minutes in timestamp between 00 and 59");
	});

	it("GET returns 400 if timestamp is passed as as time less than 00 second", async () => {
		const response = await server.inject({
			method: "GET",
			url: "/api/find_vehicle?x=1&y=0&timestamp=01:09:-09"
		});
		expect(response.statusCode).to.equal(400);
		const payload = JSON.parse(response.payload);
		expect(payload)
			.to.have.property("message")
			.that.equals("Please provide the seconds in timestamp between 00 and 59");
	});

	it("GET returns 400 if timestamp is passed as as time greater than 59 second", async () => {
		const response = await server.inject({
			method: "GET",
			url: "/api/find_vehicle?x=1&y=0&timestamp=01:09:60"
		});
		expect(response.statusCode).to.equal(400);
		const payload = JSON.parse(response.payload);
		expect(payload)
			.to.have.property("message")
			.that.equals("Please provide the seconds in timestamp between 00 and 59");
	});
});
