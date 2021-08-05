if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = require("./app");
const mongoose = require("mongoose");

// DB Connection
const db = process.env.MONGODB_URI || process.env.DEV_DB;

console.log(`const db = ${db}`);

// Connect to MongoDB instance
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.log("MongoDB connection error: " + err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));
