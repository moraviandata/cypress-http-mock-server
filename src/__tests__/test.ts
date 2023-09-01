import request from "supertest";
import app, { HttpMockServerRequest, RegisterApiRequest } from "../app";
import { REGISTER_PATH, RESET_PATH } from "../constants";
import { json } from "stream/consumers";
import { response } from "express";

describe("Cypress http mock server end to end test", () => {
	it("Random page throws 404", async () => {
		const res = await request(app).get("/");
		expect(res.status).toEqual(404)
	});

	it

	it("Register URL and reset", async () => {
		// setup

		const appRequest = request(app)

		const somePath = "/api/v1/and/then/some"
		const statusCode = 204

		const payload: RegisterApiRequest = { path: somePath, statusCode: statusCode }
		let res = await appRequest.post(REGISTER_PATH)
			.send(JSON.stringify(payload))
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')

		expect(res.status).toEqual(200)

		// execute
		let mockedResponse = await appRequest.get(somePath)

		// verify
		expect(mockedResponse.status).toBe(statusCode)

		// test reset
		res = await appRequest.post(RESET_PATH)

		expect(res.status).toEqual(200)

		mockedResponse = await appRequest.get(somePath)

		expect(mockedResponse.status).toEqual(404)
	})

	it("http mock server request map function test", () => {
		const mockRequest = new HttpMockServerRequest({method: "POST", path: "/api/some"})
		expect(mockRequest.convertToString()).toEqual("1/api/some")

		const secondMockRequest = HttpMockServerRequest.fromString("2/api")
		expect(secondMockRequest.method).toEqual("PUT")
		expect(secondMockRequest.path).toEqual("/api")
	})

	it("Reset", () => {

	})
});

