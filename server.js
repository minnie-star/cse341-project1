const express = require('express');
const bodyParser = require('body-parser');
const { connectToDatabase, getDb} = require('./data/database');
const userRoutes = require('./routes/users');

const app = express();
const port = 3000;


// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

(async () => {
  try {
    await connectToDatabase();
    app.use(express.json());
    app.use('/users', userRoutes);

    app.use('/', require('./routes/index'));

    app.listen(port, () => {
      console.log(`✅ Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Could not start server:', err.message);
  }
})();
