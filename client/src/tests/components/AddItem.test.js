import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { AddItem } from '../../components/AddItem';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

it('AddItem loads without crashing', () => {
  const error = {};
  const items = {
    items: [],
    addedItem: false
  };
  const addItem = jest.fn();
  const setAddedItemsFalse = jest.fn();
  const clearErrors = jest.fn();

  const addItemForm = render(
    <MemoryRouter>
      <AddItem
        error={error}
        items={items}
        addItem={addItem}
        setAddedItemsFalse={setAddedItemsFalse}
        clearErrors={clearErrors}
      />
    </MemoryRouter>
  );

  expect(addItemForm).toBeDefined();
});
