const express = require('express');
const { connectToDatabase, getDb} = require('./data/database');
const userRoutes = require('./routes/users');

const app = express();
const port = 3000;

app.use('/', require('./routes/index'));

(async () => {
  try {
    await connectToDatabase();
    app.use('/users', userRoutes);

    app.listen(port, () => {
      console.log(`✅ Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Could not start server:', err.message);
  }
})();
