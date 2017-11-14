import mongoose from 'mongoose';
import shorten from './shortener';
const config = require('../config');

mongoose.Promise = require('bluebird');
const dbURI = `mongodb://${config.db.host}/${config.db.name}`;
mongoose.connect(dbURI, { useMongoClient: true });

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

export function redirect(shortCode, res) {
  urlEntry.findOne({ shortCode })
    .then((doc) => {
      if (!doc){
        res.status(200).send('URL not found');
      } else {
        res.redirect(`https://www.${doc.original}`);
      }
    });
}
export function addUrl(url, res) {
  checkForDups(url).then(shortCode => {
    if (shortCode) {
      res.render('new.handlebars', { shortCode: shortCode });
    } else {
      if (url) {
        const newUrl = shorten(url);
        const newUrlEntry = new urlEntry({ original: url, shortCode: newUrl});
        newUrlEntry.save().then(insertedDocument => {
          if(!insertedDocument) {
            throw new Error('Unknown error');
          }
          else {
            res.shortCode = insertedDocument.shortCode;
            res.render('new.handlebars', { shortCode: insertedDocument.shortCode });
          }
          return {
            url: insertedDocument.original,
            shortCode: insertedDocument.shortCode
          };
        }).catch((err) => {
          throw new Error(err);
        });
      }
    }
  }).catch((err) => {
    throw new Error(err);
  });
}