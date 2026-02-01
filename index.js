const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todos");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
