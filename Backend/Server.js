// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyparser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");
dotenv.config();

const url = process.env.MONGO_URI;
const client = new MongoClient(url);
client.connect();

const dbName = process.env.DB_NAME;
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyparser.json());
const collection = client.db(dbName).collection("tasks");

// app.get("/", async (req, res) => {
//   const db = client.db(dbName);
//   const collection = db.collection("test");
//   const findResult = await collection.find({}).toArray();
//   res.json(findResult);
// });

// CREATE a task
app.post("/tasks", async (req, res) => {
  const task = req.body;
  const result = await collection.insertOne(task);
  res.json({ ...task, _id: result.insertedId });
});
// READ all tasks
app.get("/tasks", async (_, res) => {
  const tasks = await collection.find().toArray();
  res.json(tasks);
});

// UPDATE a task by id
// app.put("/tasks/:id", async (req, res) => {
//   const { id } = req.params;
//   const updated = req.body;
//   await collection.updateOne(
//     { _id: new ObjectId(id) },
//     { $set: updated }
//   );
//   res.json({ ...updated, _id: id });
// });
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    res.status(200).json({ message: "Task updated", id, updates });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

// DELETE a task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await collection.deleteOne({ _id: new ObjectId(id) });
  res.json({ success: true });
});

// DELETE all tasks before a specific date
app.delete("/tasks/before/:date", async (req, res) => {
  const { date } = req.params;

  try {
    const result = await collection.deleteMany({
      date: { $lt: date }
    });

    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (err) {
    console.error("Failed to delete tasks:", err);
    res.status(500).json({ success: false, error: "Failed to delete tasks" });
  }
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
