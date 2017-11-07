/* global process */
/* global __dirname */
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import addUrl from './db';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());


app.get('/', (req, res) => {
    res.set('content-type','text/html');
    res.send(fs.readFileSync(__dirname+'/index.html','utf8'));
    res.end();
});

app.get('/new/:url', (request, response) => {
    const url = request.params.url;
    addUrl(url, response);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // eslint-disable-line