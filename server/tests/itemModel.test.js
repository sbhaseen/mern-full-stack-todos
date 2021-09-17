const mongoose = require("mongoose");
const UserModel = require("../models/User");
const ItemModel = require("../models/Item");
const { setupDB } = require("../testSetup");

describe("Item model test", () => {
  setupDB("item-model-testing");

  it("should create a new item", async () => {
    const validItem = {
      description: "A valid description",
      responsible: "A valid responsible person",
      priority: "Medium",
    };

    // Assign a item to the test user
    const mockItem = new ItemModel(validItem);
    const saveItem = await mockItem.save();

    expect(saveItem.id).toBeDefined();
    expect(saveItem.description).toMatch(validItem.description);
    expect(saveItem.responsible).toMatch(validItem.responsible);
    expect(saveItem.priority).toMatch(validItem.priority);
  });

  it("should fail to create an item without a required field", async () => {
    const badItem = {
      description: "",
      responsible: "A valid responsible person",
      priority: "Medium",
    };

    let err;
    try {
      const badItemSave = await new ItemModel(badItem).save();
      error = badItemSave;
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors).toBeDefined();
  });
});
