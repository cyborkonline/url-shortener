import mongoose from 'mongoose';
import shorten from './shortener';

mongoose.Promise = require('bluebird');
const config = 
{
    db : {
        host: 'localhost',
        name: 'url_shortener',
    },
    webhost: 'http://localhost:3000/',
};

mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`, { useMongoClient: true });

const urlSchema = mongoose.Schema({
    original: {
        type: String,
    },
    shortCode: {
        type: String,
        index: true,
    }
});

const entrySchema = urlSchema.index({ shortCode: 1, original: 1 }, { unique: true });
const urlEntry = mongoose.model('urlSchema', entrySchema);

function checkForDups(url) {
    return urlEntry
        .findOne({ original: url })
        .then(doc => doc ? doc.shortCode : false).catch((err) => {
            throw new Error(err);
        });
}

export default function addUrl(url, req) {
    checkForDups(url).then(shortCode => {
        if (shortCode) {
            throw new Error(`URL already shortened: ${shortCode}`);
        } else {
            if (url) {
                const newUrl = shorten(url);
                const newUrlEntry = new urlEntry({ original: url, shortCode: newUrl});
                newUrlEntry.save().then(insertedDocument => {
                    if(!insertedDocument) {
                        throw new Error('Unknown error');
                    } else {
                        console.send(`URL Shortened: ${insertedDocument.shortCode}`);
                    }

                }).catch((err) => {
                    throw new Error(err);
                });
            }
        }
    }).catch((err) => {
        throw new Error(err);
    });
}