const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.promise = global.Promise;

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // Occasionally occurs if trying to drop non existing collections. Safe to ignore.
      if (error.message === 'ns not found') return;
      // Multiple concurrent operations sometimes throw this error. Safe to ignore.
      if (error.message.includes('a background operation is currently running'))
        return;
      console.log(error.message);
    }
  }
}

module.exports = {
  setupDB(databaseName) {
    // Connect to MongoDB local service
    beforeAll(async () => {
      const url = `mongodb://localhost:27017/${databaseName}`;
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
    });

    // Cleans up database between each test
    afterEach(async () => {
      await removeAllCollections();
    });

    // Disconnect Mongoose
    afterAll(async () => {
      await dropAllCollections();
      await mongoose.connection.close();
    });
  }
};
