const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

var mongoose = require("mongoose");
mongoose.connect(DB);
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
