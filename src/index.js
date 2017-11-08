/* global process */
/* global __dirname */
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { addUrl, redirect } from './db';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());


app.get('/', (req, res) => {
    res.set('content-type','text/html');
    res.send(fs.readFileSync(__dirname+'/index.html','utf8'));
    res.end();
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