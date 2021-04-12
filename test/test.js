const request = require("supertest");
const app = require("../index");

describe("GET /", () => {
    it("respond with Svested App", (done) => {
    request(app).get("/").expect("Svested", done);
    })
});