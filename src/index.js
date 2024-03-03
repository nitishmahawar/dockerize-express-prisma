const express = require("express");
const cors = require("cors");
const prisma = require("./lib/prisma");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.json({ message: "🐳✨🔥" }));

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port 3000`));
