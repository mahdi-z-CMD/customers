// server.js
const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(express.json());

app.post('/', (req, res) => {
  const newData = req.body;

  // Read existing data from people.json
  fs.readFile('./people.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Internal Server Error');
    }

    let peopleData = [];
    try {
      peopleData = JSON.parse(data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return res.status(500).send('Internal Server Error');
    }

    // Add new data
    peopleData.push(newData);

    // Write updated data back to people.json
    fs.writeFile('./people.json', JSON.stringify(peopleData), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Internal Server Error');
      }

      res.status(200).send('User added successfully');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
