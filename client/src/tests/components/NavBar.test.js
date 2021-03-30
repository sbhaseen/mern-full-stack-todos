import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { NavBar } from '../../components/NavBar';
import { MemoryRouter } from 'react-router-dom';

describe('NavBar renders', () => {
  afterEach(cleanup);

  it('NavBar loads with guest links if not logged in (default)', () => {
    const authProp = { isAuthenticated: false };
    const logoutProp = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
        <NavBar auth={authProp} logout={logoutProp} />
      </MemoryRouter>
    );

    const homeLink = getByText(/home/i);
    const registerLink = getByText(/register/i);
    const loginLink = getByText(/login/i);

    expect(homeLink).toBeDefined();
    expect(registerLink).toBeDefined();
    expect(loginLink).toBeDefined();
  });

  it('NavBar loads with auth links if logged in', () => {
    const authProp = { isAuthenticated: true, user: { name: 'Tester' } };
    const logoutProp = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
        <NavBar auth={authProp} logout={logoutProp} />
      </MemoryRouter>
    );

    const homeLink = getByText(/home/i);
    const logoutLink = getByText(/logout/i);

    expect(homeLink).toBeDefined();
    expect(logoutLink).toBeDefined();
  });
});
