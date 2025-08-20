require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/db");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const profileRouter = require("./routes/profile.routes");
const resourceRouter = require("./routes/resources.routes");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;
let isDBConnected = false;
connectToDB().then((status) => {
  isDBConnected = status;

  app.listen(PORT, () => console.log(`Server running on port - ${PORT}`));
});

app.get("/", (req, res) => {
  res.send({
    message: `Server running on port - ${PORT}`,
    db: isDBConnected ? "Connected to MongoDB" : "Failed to connect to MongoDB",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/resources", resourceRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Invalid Route" });
});
