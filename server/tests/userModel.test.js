const mongoose = require('mongoose');
const User = require('../models/User');
const { setupDB } = require('../testSetup');

describe('User model test', () => {
  setupDB('user-model-testing');

  it('should create a new user', async done => {
    const validUser = {
      name: 'Test User',
      email: 'test.user@email.com',
      password: 'somepassword'
    };

    const savedUser = await new User(validUser).save();

    expect(savedUser.id).toBeDefined();

    // Check if the helper method can verify a password
    expect(savedUser.verifyPassword(validUser.password)).toBeTruthy();

    // Check saved data matched input data
    expect(savedUser.name).toMatch(validUser.name);
    expect(savedUser.email).toMatch(validUser.email);

    done();
  });

  it('should fail to create a user without required fields', async done => {
    const userWithoutRequiredField = {
      name: 'A Test User'
    };

    const mockUserWithoutRequiredField = new User(userWithoutRequiredField);

    let err;
    try {
      const savedUserWithoutRequiredField = await mockUserWithoutRequiredField.save();
      error = savedUserWithoutRequiredField;
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();

    done();
  });
});
