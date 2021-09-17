const request = require("supertest");
const app = require("../app");
const { setupDB } = require("../testSetup");
const User = require("../models/User");
const Item = require("../models/Item");

describe("Test the route of api/items", () => {
  setupDB("items-route-testing");

  it("should respond with unauthorized when no data or token provided", async () => {
    const res = await request(app).post("/api/items/");
    expect(res.status).toBe(401);
  });

  it("should respond with an unprocessable entity when no data provided but sent with token", async () => {
    // A post request without any data shold not pass vaildation
    const validUser = {
      name: "Test User",
      email: "test.user@email.com",
      password: "somepassword",
    };

    const savedUser = await new User(validUser).save();

    const user = await User.findOne({ email: validUser.email });

    expect(user.id).toBeDefined();

    const loginData = {
      email: validUser.email,
      password: validUser.password,
    };

    const resLogin = await request(app).post("/api/auth/").send(loginData);

    expect(resLogin.body.token).toBeDefined();

    const validToken = resLogin.body.token;

    const res = await request(app)
      .post("/api/items/")
      .set("x-auth-token", validToken);

    expect(res.status).toBe(422);
  });

  it("should not add an item when a required field is blank and sent with token", async () => {
    // A post request without any data shold not pass vaildation
    const validUser = {
      name: "Test User",
      email: "test.user@email.com",
      password: "somepassword",
    };

    const savedUser = await new User(validUser).save();

    const user = await User.findOne({ email: validUser.email });

    expect(user.id).toBeDefined();

    const loginData = {
      email: validUser.email,
      password: validUser.password,
    };

    const resLogin = await request(app).post("/api/auth/").send(loginData);

    expect(resLogin.body.token).toBeDefined();

    const validToken = resLogin.body.token;

    // Create an item with proper data that will pass vaildation
    const testItem = {
      description: " ",
      responsible: "",
      priority: "Low",
    };

    // Attempt to add the valid item
    const resItem = await request(app)
      .post("/api/items/")
      .set("x-auth-token", validToken)
      .send(testItem);

    expect(resItem.status).toBe(422);
  });

  it("should save a new item to the database", async () => {
    const validUser = {
      name: "Test User",
      email: "test.user@email.com",
      password: "somepassword",
    };

    const savedUser = await new User(validUser).save();

    const user = await User.findOne({ email: validUser.email });

    expect(user.id).toBeDefined();

    const loginData = {
      email: validUser.email,
      password: validUser.password,
    };

    const resLogin = await request(app).post("/api/auth/").send(loginData);

    expect(resLogin.body.token).toBeDefined();

    const validToken = resLogin.body.token;

    // Create an item with proper data that will pass vaildation
    const testItem = {
      description: "A test description",
      responsible: "Responsible Person",
      priority: "Medium",
    };

    // Attempt to add the valid item
    const resItem = await request(app)
      .post("/api/items/")
      .set("x-auth-token", validToken)
      .send(testItem);

    // Expect response body to be OK and properties to match return
    expect(resItem.status).toBe(200);
    expect(resItem.body).toBeDefined();
    expect(resItem.body.description).toMatch(testItem.description);
    expect(resItem.body.responsible).toMatch(testItem.responsible);
    expect(resItem.body.priority).toMatch(testItem.priority);
    expect(resItem.body.completed).toBeFalsy(); // Default completed condition
  });

  it("should update an existing item in the database", async () => {
    const validUser = {
      name: "Test User",
      email: "test.user@email.com",
      password: "somepassword",
    };

    const savedUser = await new User(validUser).save();

    const user = await User.findOne({ email: validUser.email });

    expect(user.id).toBeDefined();

    const loginData = {
      email: validUser.email,
      password: validUser.password,
    };

    const resLogin = await request(app).post("/api/auth/").send(loginData);

    expect(resLogin.body.token).toBeDefined();

    const validToken = resLogin.body.token;

    // Create an item with valid data
    const validItem = {
      description: "A test description",
      responsible: "Responsible Person",
      priority: "Medium",
    };

    const savedValidItem = await new Item(validItem).save();

    // Create valid modifications to send
    const modsToSend = {
      description: "A changed description",
      responsible: "New Responsible Person",
      priority: "Low",
      completed: true,
    };

    // Attempt to send the valid
    const resUpdateItem = await request(app)
      .put(`/api/items/${savedValidItem.id}`)
      .set("x-auth-token", validToken)
      .send(modsToSend);

    expect(resUpdateItem.status).toBe(200);
    expect(resUpdateItem.body.description).toMatch(modsToSend.description);
    expect(resUpdateItem.body.responsible).toMatch(modsToSend.responsible);
    expect(resUpdateItem.body.priority).toMatch(modsToSend.priority);
    expect(resUpdateItem.body.completed).toBe(modsToSend.completed);
  });

  it("should not update an existing item without proper modified data", async () => {
    const validUser = {
      name: "Test User",
      email: "test.user@email.com",
      password: "somepassword",
    };

    const savedUser = await new User(validUser).save();

    const user = await User.findOne({ email: validUser.email });

    expect(user.id).toBeDefined();

    const loginData = {
      email: validUser.email,
      password: validUser.password,
    };

    const resLogin = await request(app).post("/api/auth/").send(loginData);

    expect(resLogin.body.token).toBeDefined();

    const validToken = resLogin.body.token;

    // Create an item with valid data
    const validItem = {
      description: "A test description",
      responsible: "Responsible Person",
      priority: "Medium",
    };

    const savedValidItem = await new Item(validItem).save();

    // Create bad modifications to send
    const badModsToSend = {
      description: "",
      responsible: "",
      priority: "",
      completed: 1,
    };

    // Attempt to send the bad data
    const resModItem = await request(app)
      .put(`/api/items/${savedValidItem.id}`)
      .set("x-auth-token", validToken)
      .send(badModsToSend);

    expect(resModItem.status).toBe(422);
  });

  it("should delete an item from the database", async () => {
    const validUser = {
      name: "Test User",
      email: "test.user@email.com",
      password: "somepassword",
    };

    const savedUser = await new User(validUser).save();

    const user = await User.findOne({ email: validUser.email });

    expect(user.id).toBeDefined();

    const loginData = {
      email: validUser.email,
      password: validUser.password,
    };

    const resLogin = await request(app).post("/api/auth/").send(loginData);

    expect(resLogin.body.token).toBeDefined();

    const validToken = resLogin.body.token;

    // Create an item with valid data
    const validItem = {
      description: "A test description",
      responsible: "Responsible Person",
      priority: "Medium",
      completed: true,
    };

    const savedValidItem = await new Item(validItem).save();

    // Delete this item form the database
    const deleteItem = await request(app)
      .delete(`/api/items/delete/${savedValidItem.id}`)
      .set("x-auth-token", validToken);

    expect(deleteItem.status).toBe(200);
    expect(deleteItem.body).toBeDefined();
  });

  it("should not delete an item from the database without a proper ID", async () => {
    const validUser = {
      name: "Test User",
      email: "test.user@email.com",
      password: "somepassword",
    };

    const savedUser = await new User(validUser).save();

    const user = await User.findOne({ email: validUser.email });

    expect(user.id).toBeDefined();

    const loginData = {
      email: validUser.email,
      password: validUser.password,
    };

    const resLogin = await request(app).post("/api/auth/").send(loginData);

    expect(resLogin.body.token).toBeDefined();

    const validToken = resLogin.body.token;

    const deleteBadItem = await request(app)
      .delete(`/api/items/delete/123456`)
      .set("x-auth-token", validToken);

    expect(deleteBadItem.status).toBe(400);
    expect(deleteBadItem.body).toBeDefined();
  });

  it("should get a list of items from the database without previous or next in pagination", async () => {
    // Create an item with valid data
    const validItems = [
      {
        description: "A test description 1",
        responsible: "Responsible Person 1",
        priority: "Low",
      },
      {
        description: "A test description 2",
        responsible: "Responsible Person 2",
        priority: "Medium",
        completed: true,
      },
      {
        description: "A test description",
        responsible: "Responsible Person",
        priority: "Medium",
      },
    ];

    validItems.forEach(async (item) => {
      await new Item(item).save();
    });

    // Get this item list from the database
    const getItem = await request(app).get("/api/items/");

    expect(getItem.status).toBe(200);
    expect(getItem.body).toBeDefined();
    expect(getItem.body.limit).toBeDefined();
    expect(getItem.body.total).toBeDefined();

    expect(getItem.body.next).toBeUndefined();
    expect(getItem.body.previous).toBeUndefined();
  });

  it("should get a paginated list of items with default pagination parameters", async () => {
    // Create an item with valid data
    const validItems = [
      {
        description: "A test description 1",
        responsible: "Responsible Person 1",
        priority: "Low",
      },
      {
        description: "A test description 2",
        responsible: "Responsible Person 2",
        priority: "Medium",
        completed: true,
      },
      {
        description: "A test description 3",
        responsible: "Responsible Person 3",
        priority: "Medium",
      },
      {
        description: "A test description 4",
        responsible: "Responsible Person 4",
        priority: "Medium",
      },
      {
        description: "A test description 5",
        responsible: "Responsible Person 5",
        priority: "High",
        completed: true,
      },
      {
        description: "A test description 6",
        responsible: "Responsible Person 6",
        priority: "Low",
      },
      {
        description: "A test description 7",
        responsible: "Responsible Person 7",
        priority: "Medium",
      },
    ];

    validItems.forEach(async (item) => {
      await new Item(item).save();
    });

    // Get this item list from the database
    const getItem = await request(app).get("/api/items?");

    expect(getItem.status).toBe(200);
    expect(getItem.body).toBeDefined();
    expect(getItem.body.next).toBeDefined();
    expect(getItem.body.limit).toBeDefined();
    expect(getItem.body.total).toBeDefined();

    expect(getItem.body.previous).toBeUndefined();
  });

  it("should get a specific page of items from the database", async () => {
    // Create an item with valid data
    const validItems = [
      {
        description: "A test description 1",
        responsible: "Responsible Person 1",
        priority: "Low",
      },
      {
        description: "A test description 2",
        responsible: "Responsible Person 2",
        priority: "Medium",
        completed: true,
      },
      {
        description: "A test description 3",
        responsible: "Responsible Person 3",
        priority: "Medium",
      },
      {
        description: "A test description 4",
        responsible: "Responsible Person 4",
        priority: "Medium",
      },
      {
        description: "A test description 5",
        responsible: "Responsible Person 5",
        priority: "High",
        completed: true,
      },
      {
        description: "A test description 6",
        responsible: "Responsible Person 6",
        priority: "Low",
      },
      {
        description: "A test description 7",
        responsible: "Responsible Person 7",
        priority: "Medium",
      },
    ];

    validItems.forEach(async (item) => {
      await new Item(item).save();
    });

    // Get this item list from the database
    const queryParams = new URLSearchParams();
    queryParams.append("page", 2);
    queryParams.append("limit", 5);

    const getItem = await request(app).get("/api/items?" + queryParams);

    expect(getItem.status).toBe(200);
    expect(getItem.body).toBeDefined();
    expect(getItem.body.limit).toBeDefined();
    expect(getItem.body.total).toBeDefined();
  });

  it("should send back the last valid previous page if the current page is beyond the pagination limit", async () => {
    // Create an item with valid data
    const validItems = [
      {
        description: "A test description 1",
        responsible: "Responsible Person 1",
        priority: "Low",
      },
      {
        description: "A test description 2",
        responsible: "Responsible Person 2",
        priority: "Medium",
        completed: true,
      },
      {
        description: "A test description 3",
        responsible: "Responsible Person 3",
        priority: "Medium",
      },
      {
        description: "A test description 4",
        responsible: "Responsible Person 4",
        priority: "Medium",
      },
      {
        description: "A test description 5",
        responsible: "Responsible Person 5",
        priority: "High",
        completed: true,
      },
      {
        description: "A test description 6",
        responsible: "Responsible Person 6",
        priority: "Low",
      },
      {
        description: "A test description 7",
        responsible: "Responsible Person 7",
        priority: "Medium",
      },
    ];

    validItems.forEach(async (item) => {
      await new Item(item).save();
    });

    // Get this item list from the database
    const queryParams = new URLSearchParams();
    queryParams.append("page", 3);
    queryParams.append("limit", 5);

    const getItem = await request(app).get("/api/items?" + queryParams);

    expect(getItem.status).toBe(200);
    expect(getItem.body).toBeDefined();
    expect(getItem.body.total).toBeDefined();
    expect(getItem.body.previous).toBe(2);
  });

  it("should respond with a bad request if pagination parameters are invalid", async () => {
    // Create an item with valid data
    const validItems = [
      {
        description: "A test description 1",
        responsible: "Responsible Person 1",
        priority: "Low",
      },
      {
        description: "A test description 2",
        responsible: "Responsible Person 2",
        priority: "Medium",
        completed: true,
      },
      {
        description: "A test description 3",
        responsible: "Responsible Person 3",
        priority: "Medium",
      },
      {
        description: "A test description 4",
        responsible: "Responsible Person 4",
        priority: "Medium",
      },
      {
        description: "A test description 5",
        responsible: "Responsible Person 5",
        priority: "High",
        completed: true,
      },
      {
        description: "A test description 6",
        responsible: "Responsible Person 6",
        priority: "Low",
      },
      {
        description: "A test description 7",
        responsible: "Responsible Person 7",
        priority: "Medium",
      },
    ];

    validItems.forEach(async (item) => {
      await new Item(item).save();
    });

    // Get this item list from the database
    const queryParams = new URLSearchParams();
    queryParams.append("page", 0);
    queryParams.append("limit", 0);

    const getItem = await request(app).get("/api/items?" + queryParams);

    expect(getItem.status).toBe(400);
    expect(getItem.body).toBeDefined();
  });
});
