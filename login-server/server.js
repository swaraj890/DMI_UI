const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5002;

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Username and password required' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
