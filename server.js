const path = require('path');
const cors = require('cors');
const fs = require('fs')
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const dataFile = path.join(__dirname, 'data', 'expenses.json');

// Enable CORS for specific origins
const corsOptions = {
  origin: 'http://localhost:3000', //origin for reactApp
};

//Middlewares
app.use(cors(corsOptions)); //enables CORS support
app.use(express.json()); //this enables express.js to automatically parse json req body
app.use(express.static('public'));

// Define an API endpoint to retrieve expenses
app.get('/api/expenses', (req, res) => {
  // Read the data from your JSON file
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      //display the json at endpoint
      res.json(JSON.parse(data));
    }
  });
});

// api endpoint to update expenses
app.post('/api/expenses', (req, res) => {
  const newExpense = req.body;
  
  // Read the existing data
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      const expenses = JSON.parse(data);
      // Add the new expense to the expenses array
      expenses.push(newExpense);

      expenses[expenses.length - 1].id = (JSON.parse(expenses[expenses.length - 2].id) + 1); //adds a sequential id
      // Write the updated data back to the file
      fs.writeFile(dataFile, JSON.stringify(expenses), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Server error');
        } else {
          res.status(201).json(newExpense);
        }
      });
    }
  });
});


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
