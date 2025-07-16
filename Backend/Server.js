// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyparser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");
const nodemailer = require('nodemailer');
dotenv.config();

const url = process.env.MONGO_URI;
const client = new MongoClient(url);
client.connect();

const dbName = process.env.DB_NAME;
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyparser.json());

// admin
app.get('/get', async(req, res)=>{
  const db = client.db(dbName)
  const collection = db.collection('userinfo')
    const findResult  = await collection.find({}).toArray()
    res.json(findResult)
  })

  app.get('/getUser', async (req, res) => {
  const { username } = req.query;
  const db = client.db(dbName);
  const user = await db.collection('userinfo').findOne({ username });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.put('/updateUser', async (req, res) => {
  const { currentUsername, name, email, username: newUsername } = req.body;
  const db = client.db(dbName);

  try {
    // First, update userinfo
    const result = await db.collection('userinfo').updateOne(
      { username: currentUsername },
      { $set: { name, email, username: newUsername } }
    );

    // If username changed, rename the user's collection
    if (currentUsername !== newUsername) {
      await db.renameCollection(currentUsername, newUsername);
    }

    if (result.modifiedCount > 0) {
      res.send({ message: 'User info and collection updated successfully' });
    } else {
      res.status(404).send({ message: 'User not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating user info or renaming collection:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});
// Check if username or email already exists
app.get('/checkUserExists', async (req, res) => {
  const { username, email, currentUsername } = req.query;
  const db = client.db(dbName);
  const collection = db.collection('userinfo');

  let query = {};
  if (username) query.username = username;
  if (email) query.email = email;

  const user = await collection.findOne(query);

  // If found but it's the same user, treat as not existing
  if (user && user.username === currentUsername) {
    return res.json({ exists: false });
  }

  res.json({ exists: !!user });
});


app.post('/verifyPassword', async (req, res) => {
  const { username, oldPassword } = req.body;
  const db = client.db(dbName);
  const user = await db.collection('userinfo').findOne({ username });

  if (user && user.password === oldPassword) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

app.put('/updatePassword', async (req, res) => {
  const { username, newPassword } = req.body;
  const db = client.db(dbName);

  try {
    const result = await db.collection('userinfo').updateOne(
      { username },
      { $set: { password: newPassword } }
    );

    if (result.modifiedCount > 0) {
      res.send({ message: 'Password updated successfully' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).send({ message: 'Internal server error' });
  }
});






  
  app.post('/Signup', async (req, res) => {
  const { id, name, email, username, password } = req.body;
  const db = client.db(dbName);
  const userCollection = db.collection('userinfo');

  try {
    // Insert into userinfo
    const result = await userCollection.insertOne({ id, name, username, email, password });

    // Create user-specific collection by inserting an empty doc (MongoDB creates collection on first insert)
    await db.createCollection(username); // optional, but explicit

    res.send({ message: 'User registered and collection created', result });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).send({ error: 'Signup failed' });
  }
});

  
  function getUserCollection(username) {
  return client.db(dbName).collection(username);
}


app.get('/user/:username', async (req, res) => {
    const username = req.params.username;
    const db = client.db(dbName);
    const user = await db.collection('userinfo').findOne({ username });

    if (user) {
        res.json({ name: user.name, email: user.email });
    } else {
        res.status(404).send('User not found');
    }
});



// CREATE a task
app.post("/tasks", async (req, res) => {
  const { username, ...task } = req.body;
  const collection = getUserCollection(username);

  try {
    const result = await collection.insertOne(task);
    res.json({ ...task, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// READ all tasks
app.get("/tasks", async (req, res) => {
  const username = req.query.username;
  if (!username) return res.status(400).json({ error: "Username is required" });

  const collection = getUserCollection(username);
  const tasks = await collection.find().toArray();
  res.json(tasks);
});


// UPDATE a task by id
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { username, ...updates } = req.body;
  if (!username) return res.status(400).json({ error: "Username is required" });

  const collection = getUserCollection(username);

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
// DELETE a task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { username } = req.query; // send username in query param

  if (!username) return res.status(400).json({ error: "Username is required" });

  const collection = getUserCollection(username);

  try {
    await collection.deleteOne({ _id: new ObjectId(id) });
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to delete task:", err);
    res.status(500).json({ error: "Failed to delete task" });
  }
});


// DELETE all tasks before a specific date
app.delete("/tasks/before/:date", async (req, res) => {
  const { date } = req.params;
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Username is required" });

  const collection = getUserCollection(username);

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

// DELETE all tasks for a specific date
app.delete('/tasks/date/:date', async (req, res) => {
  const { date } = req.params;
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Username is required" });

  const collection = getUserCollection(username);

  try {
    const result = await collection.deleteMany({ date });
    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (err) {
    console.error("Failed to delete tasks by date:", err);
    res.status(500).json({ success: false, error: "Failed to delete tasks by date" });
  }
});

// DELETE all completed tasks for a specific date
app.delete("/tasks/clear/completed/:date", async (req, res) => {
  const { date } = req.params;
  const { username } = req.query;

  if (!username) return res.status(400).json({ error: "Username is required" });

  const collection = getUserCollection(username);

  try {
    const result = await collection.deleteMany({ status: "Completed", date });
    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (err) {
    console.error("Failed to delete completed tasks:", err);
    res.status(500).json({ success: false, error: "Failed to delete completed tasks" });
  }
});

// forgot password section
// Store OTPs temporarily in memory for simplicity
let otpStore = {};

app.post('/sendOtp', async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP

  // Store OTP with timestamp (valid for 5 mins ideally)
  otpStore[email] = { otp, createdAt: Date.now() };

  // Send email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: 'OTP for Task Manager',
    text: `Your OTP for Task Manager is: ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Failed to send OTP:', err);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

app.post('/verifyOtp', (req, res) => {
  const { email, otp } = req.body;

  if (!otpStore[email]) {
    return res.json({ success: false, message: 'OTP expired or not found' });
  }

  if (otpStore[email].otp == otp) {
    delete otpStore[email]; // Clear OTP after verification
    return res.json({ success: true, message: 'OTP verified successfully' });
  } else {
    return res.json({ success: false, message: 'Incorrect OTP' });
  }
});


app.put('/resetPassword', async (req, res) => {
  const { email, newPassword } = req.body;
  const db = client.db(dbName);

  try {
    const result = await db.collection('userinfo').updateOne(
      { email },
      { $set: { password: newPassword } }
    );

    if (result.modifiedCount > 0) {
      res.json({ success: true, message: 'Password updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Email not found' });
    }
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ success: false, message: 'Failed to reset password' });
  }
});


app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,   // user's emailaa
    to: 'vishalvishwas7082@gmail.com',  // your email
    subject: `New Contact Form Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending contact form email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});





app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
