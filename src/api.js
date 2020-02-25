// export const resourceURL = 'http://localhost:5000/'; // Local development
export const resourceURL = 'https://cryptic-sands-86857.herokuapp.com/';

export default {
  // api/items
  // GET all (+ page=X&limit=Y)
  getAllItems: resourceURL + 'api/items?',
  // GET one (+ :id)
  getOneItem: resourceURL + 'api/items/',
  // POST
  createItem: resourceURL + 'api/items/',
  // UPDATE (+ :id)
  updateItem: resourceURL + 'api/items/',
  // DELETE (+ :id)
  deleteItem: resourceURL + 'api/items/delete/',

  // api/auth
  // POST
  sendAuth: resourceURL + 'api/auth',
  // GET
  getUser: resourceURL + 'api/auth/user',

  // api/users
  // POST
  createUser: resourceURL + 'api/users'
};
