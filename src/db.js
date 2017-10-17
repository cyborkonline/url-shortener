import mongoose from 'mongoose';

const Schema = mongoose.schema

const CounterSchema = Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default: 0
    }
});
const counter = mongoose.model('counter', CounterSchema);
const urlSchema = new Schema({
    _id: {
        type: Number,
        index: true
    },
    long_url: String,
    created_at: Date
  });

  urlSchema.pre('save', function(next){
    var doc = this;
    counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
        if (error)
            return next(error);
        doc._id = counter.seq;
        doc.created_at = new Date();
        next();
    });
  });
export const UrlCounter = mongoose.model('Url', urlSchema);
