const express = require('express');
const app = express();

app.use(express.json());

// JSON file se keys load karo
const keys = {
  oneday: ["1DAY-ABCDE-FGHIJ-KLMNO", "1DAY-PQRST-UVWXY-Z1234", "1DAY-56789-ABCDE-FGHIJ"],
  thirtyday: ["30DAY-WXYZ1-23456-789AB", "30DAY-CDEFG-HIJKL-MNOPQ", "30DAY-RSTUV-WXYZA-BCDEF"],
  sixtyday: ["60DAY-HIJKL-MNOPQ-RSTUV", "60DAY-WXYZA-BCDEF-GHIJK", "60DAY-LMNOP-QRSTU-VWXYZ"]
};

// API to get key
app.post('/api/get-key', (req, res) => {
  const { duration } = req.body;
  
  let keyType;
  if (duration === 1) keyType = 'oneday';
  else if (duration === 30) keyType = 'thirtyday';
  else if (duration === 60) keyType = 'sixtyday';
  else return res.json({ success: false, message: 'Invalid duration' });
  
  if (keys[keyType].length > 0) {
    const key = keys[keyType].shift(); // First key remove karo
    res.json({ 
      success: true, 
      key: key,
      remaining: keys[keyType].length
    });
  } else {
    res.json({ 
      success: false, 
      message: 'No keys available for this duration' 
    });
  }
});

// API to check available keys
app.post('/api/check-keys', (req, res) => {
  const { duration } = req.body;
  
  let keyType;
  if (duration === 1) keyType = 'oneday';
  else if (duration === 30) keyType = 'thirtyday';
  else if (duration === 60) keyType = 'sixtyday';
  else return res.json({ available: 0 });
  
  res.json({ available: keys[keyType].length });
});

// Serve static files
app.use(express.static('.'));

module.exports = app;