const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());


app.get('/api/cars', (req, res) => {
  const rawData = fs.readFileSync('../assets/cars.json');
  const cars = JSON.parse(rawData);
  res.json(cars);
});


app.post('/api/cars', (req, res) => {
  const rawData = fs.readFileSync('../assets/cars.json');
  const cars = JSON.parse(rawData);

  const newCar = req.body;
  cars.push(newCar);

  fs.writeFileSync('../assets/cars.json', JSON.stringify(cars, null, 2));

  res.json(newCar);
});

app.get('/', (req, res) => {
  const rawData = fs.readFileSync('../assets/cars.json');
  const cars = JSON.parse(rawData);
  res.send(`<pre>${JSON.stringify(cars, null, 2)}</pre>`);
});

app.put('/api/cars/:model', (req, res) => {
  const updatedCar = req.body;
  const modelToUpdate = req.params.model;
  const rawData = fs.readFileSync('../assets/cars.json');
  let cars = JSON.parse(rawData);

  const index = cars.findIndex(car => car.model === modelToUpdate);
  if (index !== -1) {
    cars[index] = updatedCar;
    fs.writeFileSync('../assets/cars.json', JSON.stringify(cars, null, 2));
    res.json({ success: true, message: 'Car updated successfully' });
  } else {
    res.status(404).json({ error: 'Car not found' });
  }
});

app.delete('/api/cars/:model', (req, res) => {
  const modelToDelete = req.params.model;
  const rawData = fs.readFileSync('../assets/cars.json');
  let cars = JSON.parse(rawData);

  const updatedCars = cars.filter(car => car.model !== modelToDelete);

  if (cars.length !== updatedCars.length) {
    fs.writeFileSync('../assets/cars.json', JSON.stringify(updatedCars, null, 2));
    res.json({ success: true, message: 'Car deleted successfully' });
  } else {
    res.status(404).json({ error: 'Car not found' });
  }
});





app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
