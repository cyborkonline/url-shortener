/* global process */
/* global __dirname */
import express from 'express';
import cors from 'cors';
import path from 'path';
import exphbs from 'express-handlebars';
import { addUrl, redirect } from './db';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'../src/client'));
app.engine('handlebars', exphbs({
  defaultLayout: 'index',
  layoutsDir: path.join(__dirname,'../src/client'),
}));


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/:shortCode', (req, res) => {
  const shortCode = req.params.shortCode;
  redirect(shortCode, res);
});


app.get('/new/:url', (req, res) => {
  const url = req.params.url;
  addUrl(url, res);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // eslint-disable-line