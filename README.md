# A MERN Full Stack To Do List Application

A MERN (MongoDB, Express.js, React and Node.js) Stack Application was developed for creating and maintaing a To Do list. This is a demo project that builds out a frontend React app that connects to an Express.js RESTful backend and provides full CRUD (Create, Read, Updated and Delete) functionality.

The main motivation behind this project was to explore a realistic Redux usage scenario as well as the testing invloved with such an implementation.

The styles are 100% custom CSS, but draw some inspiration from Google's [Material Design](https://material.io/design/). The views are all fully responsive and change based on the `screen` attribute and `min-width: 768px`.

## Some screenshots of the app:

The main view:

![main view](docs/MainView.png)

The main view loading (spinner):

![loading spinner](docs/AppLoading.png)

The mobile view of the main page:

<img src="docs/MainViewMobile.png" width="360">

The Register form:

![register form](docs/RegisterView.png)

Editing an item:

![edit view](docs/EditItem.png)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

# Getting Started with the client (Front End)

This project was bootstrapped with `create-react-app` and should retain the default script parameters in `package.json`.

### Prerequisites

A Node.js installation with `npm` capable of running React 16.

### Installing

Install locally with `npm`:

```
npm install
```

For development the usual `create-react-app` defaults apply.

```
npm run start
```

## Tests

Test are performed with `jest`.

```
npm test
```

Please note that using the CLI command `jest` (instead of `npm test`) may lead to some errors due to the use of `@testing-library/react` which is handled by the `react-scripts` module.

### Testing details

The primary objective of testing this application focuses on verifying the logic behind the Redux implemention (action, reducers and store). A secondary objective is to ensure that the essential components render without crashing (ItemList, NavBar, etc.) however no implement details are tested as those may change over time.

Another point to note is that since Redux logic is tested seperately and the `connect` function from `react-redux` wrap a component with this logic, it was deemed redundant to test a Component and Redux together. The redux testing style was adopted from the Redux documentation which can be found [here](https://redux.js.org/recipes/writing-tests/).

All tests are in the folder `tests` under `src`.

## Deployment

If a production build is required, use:

```
npm build
```

## Usage

The app is a stand-alone frontend application which is capable of interacting with a RESTful API backend. As such, it can function independently of a backend and will show a "No Data to Display" message if it cannot resolve data from a backend.

When connected to a backend, the table of item data will show a spinner as the data loads in the background.

In the navigation bar, some links are displayed based on the authentication state. There exist two possibilites: authenticated (auth) links or guest links.

Guest links consist of Register and Login.

- To register, one must click on the "Register" link.
- To login, one must click on the "Login" link.

Authenticated or auth links only consits of the Logout feature, which simply clears the authentication token from storage.

When accessing the main view or "Home", the items will be visible in a paginated table format and will have certain views hidden or show based on the global authentication (auth) state.

For items specifically, the authentication enabled views are:

- Add Item (button)
- Under the actions column:
  - Edit (button)
  - Delete (button)

If a user is not logged in, these buttons will not be visible.

For pagination, the user can navigate using `Prev` or `Next` buttons under the table. A user may also select the items per page from a drop-down menu above the table. The default limit is 5 and the programmed limits are 5 and 10, respectively. The idea was to be as mobile-friendly as possible and higher limits simply add more scolling on mobile screens.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Redux](https://redux.js.org/) - A Predictable State Container for JS Apps
- [Axios](https://github.com/axios/axios) - A promise based HTTP client for the browser and Node.js

---

# Getting Started with the server (Back End)

A MERN Stack REST API Server. This is a demo project that builds an Express.js server which connects to a MongoDB instance and provides CRUD functionality at various endpoints.

### Prerequisites

A Node.js installation with `npm`.

### Installing

Install locally with `npm`:

```
npm install
```

For development, run with `nodemon`:

```
npm run dev
```

To add inital Item model data to a database via script for development:

- Ensure a vaild JSON formatted file is required in `populateDB.js`. In this case the file used is `MOCK_DATA.json`.
- Ensure the `process.env.DEV_DB` or `process.env.PROD_DB` is set in the environment or a local `.env` file.
- Then run the `popdb` script:

  ```
  npm run popdb
  ```

## Tests

Test are performed with `jest`.

```
npm test
```

or

```
jest
```

### Testing details

The tests verify the API endpoint functionality and Model signatures via the Mongoose ODM driver.

Note that `app.js` was seperated out from `server.js`. This is due to the nature of testing with `jest` and how it is internally configured. In essence, `jest` can run multiple parallel instances of the same test file. If `server.js` was used, a "port" is defined in it and will cause an error to be thrown in another parallel instance that uses the same port resulting in a failed test, thus the application logic was seperated out into `app.js`.

## Deployment

Depending on the particular deployment environment, process environment variables may need to be set.

Verify the following for deployment:

```
process.env.MONGODB_URI
process.env.PORT
process.env.JWT_SECRET
```

A typical local connection string in an `.env` file may look like this:

```
DEV_DB = "mongodb://localhost:27017/mern-item-list"
```

Depending on the MongoDB service and Mongoose driver support, the
`mongoose.connect(db, { params })` function parameters may need to be tweaked in `server.js`.

## Usage

The primary endpoints are defined in `app.js`. Implementation details are located in the folder `routes` with the associated filenames.

- ### Auth: `/api/auth`

  - This endpoint handles login and verification of existing users.

- ### Users: `/api/users`

  - This endpoint handles the creating a new user. It uses the data model of `User.js`.

- ### Items: `/api/items`

  - This endpoint handles creating, reading, updating and deleting Items in a collection. It uses the data model of `Item.js`.

  - #### Pagination (custom middleware function):

    - Pagination is used to limit a potential response delay and very large data set by serving only small chunks of Item data at a time.

    - The optional URL parameters are `page` and `limit`, where `page` is the current page to be views and `limit` is the maximum number of items shown on a page.

    - Example:

      ```
      https://localhost:5000/api/items?page=2&limit=10
      ```

    - Default values are:
      ```javascript
      page = 1;
      limit = 5;
      ```
    - Returns pagination navigation information:

      - `next` for next page
      - `previous` for previous page
      - `total` an object containing the total `items` and total `pages` for the data set

    - Implementation details in `utilities` folder as `paginationMiddleware.js`

  - A typical `JSON` formatted `GET` response for items:

    ```json
    {
      "next": 2,
      "limit": 5,
      "total": {
        "items": 13,
        "pages": 3
      },
      "data": [
        {
          "completed": true,
          "_id": "5e544bb295cb945af25a35ee",
          "description": "Assimilated content-based capacity",
          "responsible": "Orran Ryam",
          "priority": "high",
          "__v": 0
        },
        {
          "completed": false,
          "_id": "5e544bb295cb945af25a35f1",
          "description": "Innovative fresh-thinking strategy",
          "responsible": "Antonius Canter",
          "priority": "high",
          "__v": 0
        }
      ]
    }
    ```

## Built With

- [Express.js](https://expressjs.com/) - A Node.js web application framework
- [Express-Validator](https://express-validator.github.io/docs/) - A set of validation middlewares for Express.js applications.
- [Mongoose](https://mongoosejs.com/) - MongoDB Object Document Mapper
- [JWT](https://jwt.io/) - JSON web token authentication.
- [Node Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) - A bcrypt implemention for Node.js
