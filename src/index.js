import * as babel from 'babel-core';
import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())


app.get('/', function (req, res) {
    res.set('content-type','text/html');
    res.send(fs.readFileSync(__dirname+'/index.html','utf8'));
    res.end();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))