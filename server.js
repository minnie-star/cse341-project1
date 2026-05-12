const express = require('express');
const bodyParser = require('body-parser');
const { connectToDatabase, getDb} = require('./data/database');
const userRoutes = require('./routes/users');

const app = express();
const port = 3000;


// Middleware to parse JSON request bodies
app.use(bodyParser.json());

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
