const request = require('supertest');
const app = require('../app');
const { setupDB } = require('../testSetup');
const User = require('../models/User');

describe('Test the route of api/auth', () => {
  setupDB('auth-route-testing');

  it('should authenticate a valid email and vaild password', async done => {
    const validUser = {
      name: 'Test User',
      email: 'test.user@email.com',
      password: 'somepassword'
    };

    const savedUser = await new User(validUser).save();

    const loginData = {
      email: validUser.email,
      password: validUser.password
    };

    const res = await request(app)
      .post('/api/auth/')
      .send(loginData);

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.name).toMatch(validUser.name);
    expect(res.body.user.email).toMatch(validUser.email);

    done();
  });

  it('should not pass validation without providing an email or password', async done => {
    const loginData = {
      email: null,
      password: null
    };

    const res = await request(app)
      .post('/api/auth/')
      .send(loginData);

    expect(res.status).toBe(422);

    done();
  });

  it('should not authenticate a non-existant user email', async done => {
    const loginData = {
      email: 'non.existing@email.com',
      password: 'somepassword'
    };

    const res = await request(app)
      .post('/api/auth/')
      .send(loginData);

    expect(res.status).toBe(400);
    expect(res.body).toContain('User not found');

    done();
  });

  it('should not authenticate an invalid password with a valid email', async done => {
    const validUser = {
      name: 'Test User',
      email: 'test.user@email.com',
      password: 'somepassword'
    };

    const savedUser = await new User(validUser).save();

    const loginData = {
      email: validUser.email,
      password: 'invalidpassword'
    };

    const res = await request(app)
      .post('/api/auth/')
      .send(loginData);

    expect(res.status).toBe(400);
    expect(res.body).toContain('Invalid credentials');

    done();
  });

  it('should authenticate a user with valid token', async done => {
    const validUser = {
      name: 'Test User',
      email: 'test.user@email.com',
      password: 'somepassword'
    };

    const savedUser = await new User(validUser).save();

    const loginData = {
      email: validUser.email,
      password: validUser.password
    };

    const resLogin = await request(app)
      .post('/api/auth/')
      .send(loginData);

    expect(resLogin.status).toBe(200);
    expect(resLogin.body.token).toBeDefined();

    const validToken = resLogin.body.token;

    const resAuthCheck = await request(app)
      .get('/api/auth/user/')
      .set('x-auth-token', validToken);

    expect(resAuthCheck.status).toBe(200);
    expect(resAuthCheck.body).toBeDefined();
    expect(resAuthCheck.body.name).toMatch(validUser.name);
    expect(resAuthCheck.body.email).toMatch(validUser.email);
    expect(resAuthCheck.body.password).toBeUndefined();

    done();
  });

  it('should not authenticate an existing user with an invalid token', async done => {
    const validUser = {
      name: 'Test User',
      email: 'test.user@email.com',
      password: 'somepassword'
    };

    const savedUser = await new User(validUser).save();

    const loginData = {
      email: validUser.email,
      password: validUser.password
    };

    const resLogin = await request(app)
      .post('/api/auth/')
      .send(loginData);

    expect(resLogin.status).toBe(200);

    // A correctely formatted, but invalid token was purposely chosen from jwt.io
    const invalidToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    const resAuthCheck = await request(app)
      .get('/api/auth/user/')
      .set('x-auth-token', invalidToken);

    expect(resAuthCheck.status).toBe(401);

    done();
  });

  it('should not authenticate an existing user without providing a token', async done => {
    const validUser = {
      name: 'Test User',
      email: 'test.user@email.com',
      password: 'somepassword'
    };

    const savedUser = await new User(validUser).save();

    const loginData = {
      email: validUser.email,
      password: validUser.password
    };

    // Login is deliberate
    const resLogin = await request(app)
      .post('/api/auth/')
      .send(loginData);

    expect(resLogin.status).toBe(200);

    // Purposely not passing a token to check for failure
    const resAuthCheck = await request(app).get('/api/auth/user/');

    expect(resAuthCheck.status).toBe(401);

    done();
  });
});
