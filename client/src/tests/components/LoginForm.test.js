import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { LoginForm } from '../../components/LoginForm';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

it('LoginForm loads without crashing', () => {
  const isAuthenticated = false;
  const error = {};

  const login = jest.fn();
  const clearErrors = jest.fn();

  const loginForm = render(
    <MemoryRouter>
      <LoginForm
        isAuthenticated={isAuthenticated}
        error={error}
        login={login}
        clearErrors={clearErrors}
      />
    </MemoryRouter>
  );

  expect(loginForm).toBeDefined();
});
