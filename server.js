const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  },
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'board.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
