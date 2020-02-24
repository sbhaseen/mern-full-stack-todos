import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { ItemList } from '../../components/ItemList';
import { MemoryRouter } from 'react-router-dom';

describe('ItemList renders', () => {
  afterEach(cleanup);

  it('ItemList loads without authenticated links', () => {
    const auth = { isAuthenticated: false };
    const items = {
      items: [
        {
          completed: false,
          _id: '5e27918af21a4d66c1352cec',
          description: 'A test description 1',
          responsible: 'Responsible Person 1',
          priority: 'Low'
        }
      ],
      isLoading: false
    };
    const pagination = { itemLinit: 5, total: { pages: 3 } };
    const getItems = jest.fn();

    const { queryAllByText } = render(
      <MemoryRouter>
        <ItemList
          auth={auth}
          items={items}
          pagination={pagination}
          getItems={getItems}
        />
      </MemoryRouter>
    );

    const addItemButton = queryAllByText(/add item/i);
    const editItemButton = queryAllByText(/edit/i);
    const deleteItemButton = queryAllByText(/delete/i);

    expect(addItemButton.length).toBe(0);
    expect(editItemButton.length).toBe(0);
    expect(deleteItemButton.length).toBe(0);
  });

  it('ItemList loads with authenticated links when logged in', () => {
    const auth = { isAuthenticated: true };
    const items = {
      items: [
        {
          completed: false,
          _id: '5e27918af21a4d66c1352cec',
          description: 'A test description 1',
          responsible: 'Responsible Person 1',
          priority: 'Low'
        }
      ],
      isLoading: false
    };
    const pagination = { itemLinit: 5, total: { pages: 3 } };
    const getItems = jest.fn();

    const { queryAllByText } = render(
      <MemoryRouter>
        <ItemList
          auth={auth}
          items={items}
          pagination={pagination}
          getItems={getItems}
        />
      </MemoryRouter>
    );

    const addItemButton = queryAllByText(/add item/i);
    const editItemButton = queryAllByText(/edit/i);
    const deleteItemButton = queryAllByText(/delete/i);

    expect(addItemButton.length).not.toBe(0);
    expect(editItemButton.length).not.toBe(0);
    expect(deleteItemButton.length).not.toBe(0);
  });
});
