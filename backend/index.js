const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://admin:admin@cluster0.ihe3p.mongodb.net/?appName=Cluster0')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const authRoutes = require('./routes/auth');
const purchaseRoutes = require('./routes/purchases');
const transferRoutes = require('./routes/transfers');
const assignmentRoutes = require('./routes/assignments');

app.use('/api/auth', authRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/assignments', assignmentRoutes);


app.get('/', (req, res) => {
  res.send('API Running');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});