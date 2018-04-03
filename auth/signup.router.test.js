const app = require("../app");
const request = require("supertest");

// close the server after each test
// afterEach(() => {
//     app.close();
// });

describe("Routes /signup", () => {

    it("Shoud return 201 status code.", async () => {
        const response = await request(app).post('/signup');
        expect(response.status).toEqual(201);
    });

    it("Response type application/json", async () => {
        const response = await request(app).post('/signup');
        expect(response.type).toEqual("application/json");
    });

    it("Right respose body", async () => {
        const response = await request(app)
        .post('/signup')        
        .send('username', 'foo')
        .send('email', "foo@example.com")
        .send('password', 'passwd');
        
        expect(response.body.message).toEqual("success");
    });

    it("GET request should raise an error 401", async () => {
        const response = await request(app).get('/signup');
        expect(response.body.error).toEqual("wrong request method");
    });

    it("PUT request should raise an error 401", async () => {
        const response = await request(app).put('/signup');
        expect(response.body.error).toEqual("wrong request method");
    });

});