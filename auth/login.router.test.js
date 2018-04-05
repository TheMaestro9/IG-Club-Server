const app = require("../app");
const request = require("supertest");
var models  = require('../models');

// Create a user
beforeEach(() => {
    models.User.create({
        username: "foo",
        password: 'passwd',
        email: "foo@example.com"
    })
});

// Remove the user
afterEach(() => {
    models.User.destroy({
        where: {
            username: "foo",
            email: "foo@example.com"
        }
});
});

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
        const response = await request(app).post('/login')
        .send('email', "foo@example.com")
        .send('password', 'passwd');
        expect(response.body.message).toEqual("success");
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
