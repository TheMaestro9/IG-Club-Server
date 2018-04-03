const app = require("../app");
const request = require("supertest");


describe("Routes /login", () => {

    it("Shoud return 201 status code.", async () => {
        const response = await request(app).post('/login');
        expect(response.status).toEqual(201);
    });

    it("Response type 'application/json'", async () => {
        const response = await request(app).post('/login');
        expect(response.type).toEqual("application/json");
    });

    it("Right respose body", async () => {
        const response = await request(app).post('/login');
        expect(response.body.message).toEqual("Not yet implemented");
    });

    it("GET request should raise an error 401", async () => {
        const response = await request(app).get('/login');
        expect(response.body.error).toEqual("wrong request method");
    });

    it("PUT request should raise an error 401", async () => {
        const response = await request(app).put('/login');
        expect(response.body.error).toEqual("wrong request method");
    });

});