const request = require("supertest");
const app = require("../app");
const { setupDB } = require("../testSetup");
const User = require("../models/User");

describe("Test the route of api/users", () => {
  setupDB("users-route-testing");

  it("should respond with an unprocessable request when no data provided", async () => {
    // A post request without any data shold not pass vaildation
    const res = await request(app).post("/api/users");
    expect(res.status).toBe(422);
  });

  it("should not add a new user with incomplete data", async () => {
    const incompleteUser = {
      name: "Incomplete",
    };

    const res = await request(app).post("/api/users").send(incompleteUser);

    expect(res.status).toBe(422);
  });

  it("should save a new user to the database", async () => {
    // Create a user with proper data that will pass vaildation
    const testUser = {
      name: "Test User",
      email: "test.user@email.com",
      password: "somepassword",
    };

    // Attempt to register the user with proper data
    const res = await request(app).post("/api/users/").send(testUser);

    // Expect response body to be OK and properties to match return
    expect(res.status).toBe(200);
    expect(res.body.user.name).toBeDefined();
    expect(res.body.user.email).toBeDefined();
    expect(res.body.token).toBeDefined();
    expect(res.body.msg).toBeDefined();

    // Attempt to find the registered user
    const user = await User.findOne({ email: testUser.email });

    // Expect the user to match the data that was originally sent
    expect(user.name).toBeDefined();
    expect(user.name).toMatch(testUser.name);
    expect(user.email).toMatch(testUser.email);
  });

  it("should not duplicate an existing user", async () => {
    // Create a user with proper data that will pass vaildation
    const testUser1 = {
      name: "Test User",
      email: "test@email.com",
      password: "somepassword",
    };

    // Attempt to register the user with proper data
    const res1 = await request(app).post("/api/users/").send(testUser1);

    expect(res1.status).toBe(200);

    // Create another user with proper data that will pass vaildation
    const testUser2 = {
      name: "Test User",
      email: "test@email.com",
      password: "somepassword",
    };

    // Attempt to register the identical user
    const res2 = await request(app).post("/api/users/").send(testUser2);

    expect(res2.status).toBe(400);
    expect(res2.body).toBeDefined();
  });
});
