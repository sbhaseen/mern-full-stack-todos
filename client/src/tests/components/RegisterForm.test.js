import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { RegisterForm } from '../../components/RegisterForm';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

it('RegisterForm loads without crashing', () => {
  const isAuthenticated = false;
  const error = {};

  const register = jest.fn();
  const clearErrors = jest.fn();

  const registerForm = render(
    <MemoryRouter>
      <RegisterForm
        isAuthenticated={isAuthenticated}
        error={error}
        register={register}
        clearErrors={clearErrors}
      />
    </MemoryRouter>
  );

  expect(registerForm).toBeDefined();
});
