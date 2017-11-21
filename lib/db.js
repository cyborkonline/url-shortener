'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redirect = redirect;
exports.addUrl = addUrl;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _shortener = require('./shortener');

var _shortener2 = _interopRequireDefault(_shortener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../config');

_mongoose2.default.Promise = require('bluebird');
var dbURI = 'mongodb://' + config.db.host + '/' + config.db.name;
_mongoose2.default.connect(dbURI, { useMongoClient: true });

var urlSchema = _mongoose2.default.Schema({
  original: {
    type: String
  },
  shortCode: {
    type: String,
    index: true
  }
});

var entrySchema = urlSchema.index({ shortCode: 1, original: 1 }, { unique: true });
var urlEntry = _mongoose2.default.model('urlSchema', entrySchema);

function checkForDups(url) {
  return urlEntry.findOne({ original: url }).then(function (doc) {
    return doc ? doc.shortCode : false;
  }).catch(function (err) {
    throw new Error(err);
  });
}

function redirect(shortCode, res) {
  urlEntry.findOne({ shortCode: shortCode }).then(function (doc) {
    if (!doc) {
      res.status(200).send('URL not found');
    } else {
      res.redirect('https://www.' + doc.original);
    }
  });
}
function addUrl(url, res) {
  checkForDups(url).then(function (shortCode) {
    if (shortCode) {
      res.render('new', { shortCode: shortCode });
    } else {
      if (url) {
        var newUrl = (0, _shortener2.default)(url);
        var newUrlEntry = new urlEntry({ original: url, shortCode: newUrl });
        newUrlEntry.save().then(function (insertedDocument) {
          if (!insertedDocument) {
            throw new Error('Unknown error');
          } else {
            res.shortCode = insertedDocument.shortCode;
            res.render('new', { shortCode: insertedDocument.shortCode });
          }
          return {
            url: insertedDocument.original,
            shortCode: insertedDocument.shortCode
          };
        }).catch(function (err) {
          throw new Error(err);
        });
      }
    }
  }).catch(function (err) {
    throw new Error(err);
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYi5qcyJdLCJuYW1lcyI6WyJyZWRpcmVjdCIsImFkZFVybCIsImNvbmZpZyIsInJlcXVpcmUiLCJQcm9taXNlIiwiZGJVUkkiLCJkYiIsImhvc3QiLCJuYW1lIiwiY29ubmVjdCIsInVzZU1vbmdvQ2xpZW50IiwidXJsU2NoZW1hIiwiU2NoZW1hIiwib3JpZ2luYWwiLCJ0eXBlIiwiU3RyaW5nIiwic2hvcnRDb2RlIiwiaW5kZXgiLCJlbnRyeVNjaGVtYSIsInVuaXF1ZSIsInVybEVudHJ5IiwibW9kZWwiLCJjaGVja0ZvckR1cHMiLCJ1cmwiLCJmaW5kT25lIiwidGhlbiIsImRvYyIsImNhdGNoIiwiZXJyIiwiRXJyb3IiLCJyZXMiLCJzdGF0dXMiLCJzZW5kIiwicmVuZGVyIiwibmV3VXJsIiwibmV3VXJsRW50cnkiLCJzYXZlIiwiaW5zZXJ0ZWREb2N1bWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUE2QmdCQSxRLEdBQUFBLFE7UUFVQUMsTSxHQUFBQSxNOztBQXZDaEI7Ozs7QUFDQTs7Ozs7O0FBQ0EsSUFBTUMsU0FBU0MsUUFBUSxXQUFSLENBQWY7O0FBRUEsbUJBQVNDLE9BQVQsR0FBbUJELFFBQVEsVUFBUixDQUFuQjtBQUNBLElBQU1FLHVCQUFxQkgsT0FBT0ksRUFBUCxDQUFVQyxJQUEvQixTQUF1Q0wsT0FBT0ksRUFBUCxDQUFVRSxJQUF2RDtBQUNBLG1CQUFTQyxPQUFULENBQWlCSixLQUFqQixFQUF3QixFQUFFSyxnQkFBZ0IsSUFBbEIsRUFBeEI7O0FBRUEsSUFBTUMsWUFBWSxtQkFBU0MsTUFBVCxDQUFnQjtBQUNoQ0MsWUFBVTtBQUNSQyxVQUFNQztBQURFLEdBRHNCO0FBSWhDQyxhQUFXO0FBQ1RGLFVBQU1DLE1BREc7QUFFVEUsV0FBTztBQUZFO0FBSnFCLENBQWhCLENBQWxCOztBQVVBLElBQU1DLGNBQWNQLFVBQVVNLEtBQVYsQ0FBZ0IsRUFBRUQsV0FBVyxDQUFiLEVBQWdCSCxVQUFVLENBQTFCLEVBQWhCLEVBQStDLEVBQUVNLFFBQVEsSUFBVixFQUEvQyxDQUFwQjtBQUNBLElBQU1DLFdBQVcsbUJBQVNDLEtBQVQsQ0FBZSxXQUFmLEVBQTRCSCxXQUE1QixDQUFqQjs7QUFFQSxTQUFTSSxZQUFULENBQXNCQyxHQUF0QixFQUEyQjtBQUN6QixTQUFPSCxTQUNKSSxPQURJLENBQ0ksRUFBRVgsVUFBVVUsR0FBWixFQURKLEVBRUpFLElBRkksQ0FFQztBQUFBLFdBQU9DLE1BQU1BLElBQUlWLFNBQVYsR0FBc0IsS0FBN0I7QUFBQSxHQUZELEVBRXFDVyxLQUZyQyxDQUUyQyxVQUFDQyxHQUFELEVBQVM7QUFDdkQsVUFBTSxJQUFJQyxLQUFKLENBQVVELEdBQVYsQ0FBTjtBQUNELEdBSkksQ0FBUDtBQUtEOztBQUVNLFNBQVM1QixRQUFULENBQWtCZ0IsU0FBbEIsRUFBNkJjLEdBQTdCLEVBQWtDO0FBQ3ZDVixXQUFTSSxPQUFULENBQWlCLEVBQUVSLG9CQUFGLEVBQWpCLEVBQ0dTLElBREgsQ0FDUSxVQUFDQyxHQUFELEVBQVM7QUFDYixRQUFJLENBQUNBLEdBQUwsRUFBUztBQUNQSSxVQUFJQyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUIsZUFBckI7QUFDRCxLQUZELE1BRU87QUFDTEYsVUFBSTlCLFFBQUosa0JBQTRCMEIsSUFBSWIsUUFBaEM7QUFDRDtBQUNGLEdBUEg7QUFRRDtBQUNNLFNBQVNaLE1BQVQsQ0FBZ0JzQixHQUFoQixFQUFxQk8sR0FBckIsRUFBMEI7QUFDL0JSLGVBQWFDLEdBQWIsRUFBa0JFLElBQWxCLENBQXVCLHFCQUFhO0FBQ2xDLFFBQUlULFNBQUosRUFBZTtBQUNiYyxVQUFJRyxNQUFKLENBQVcsS0FBWCxFQUFrQixFQUFFakIsV0FBV0EsU0FBYixFQUFsQjtBQUNELEtBRkQsTUFFTztBQUNMLFVBQUlPLEdBQUosRUFBUztBQUNQLFlBQU1XLFNBQVMseUJBQVFYLEdBQVIsQ0FBZjtBQUNBLFlBQU1ZLGNBQWMsSUFBSWYsUUFBSixDQUFhLEVBQUVQLFVBQVVVLEdBQVosRUFBaUJQLFdBQVdrQixNQUE1QixFQUFiLENBQXBCO0FBQ0FDLG9CQUFZQyxJQUFaLEdBQW1CWCxJQUFuQixDQUF3Qiw0QkFBb0I7QUFDMUMsY0FBRyxDQUFDWSxnQkFBSixFQUFzQjtBQUNwQixrQkFBTSxJQUFJUixLQUFKLENBQVUsZUFBVixDQUFOO0FBQ0QsV0FGRCxNQUdLO0FBQ0hDLGdCQUFJZCxTQUFKLEdBQWdCcUIsaUJBQWlCckIsU0FBakM7QUFDQWMsZ0JBQUlHLE1BQUosQ0FBVyxLQUFYLEVBQWtCLEVBQUVqQixXQUFXcUIsaUJBQWlCckIsU0FBOUIsRUFBbEI7QUFDRDtBQUNELGlCQUFPO0FBQ0xPLGlCQUFLYyxpQkFBaUJ4QixRQURqQjtBQUVMRyx1QkFBV3FCLGlCQUFpQnJCO0FBRnZCLFdBQVA7QUFJRCxTQVpELEVBWUdXLEtBWkgsQ0FZUyxVQUFDQyxHQUFELEVBQVM7QUFDaEIsZ0JBQU0sSUFBSUMsS0FBSixDQUFVRCxHQUFWLENBQU47QUFDRCxTQWREO0FBZUQ7QUFDRjtBQUNGLEdBeEJELEVBd0JHRCxLQXhCSCxDQXdCUyxVQUFDQyxHQUFELEVBQVM7QUFDaEIsVUFBTSxJQUFJQyxLQUFKLENBQVVELEdBQVYsQ0FBTjtBQUNELEdBMUJEO0FBMkJEIiwiZmlsZSI6ImRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCBzaG9ydGVuIGZyb20gJy4vc2hvcnRlbmVyJztcbmNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpO1xuXG5tb25nb29zZS5Qcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcbmNvbnN0IGRiVVJJID0gYG1vbmdvZGI6Ly8ke2NvbmZpZy5kYi5ob3N0fS8ke2NvbmZpZy5kYi5uYW1lfWA7XG5tb25nb29zZS5jb25uZWN0KGRiVVJJLCB7IHVzZU1vbmdvQ2xpZW50OiB0cnVlIH0pO1xuXG5jb25zdCB1cmxTY2hlbWEgPSBtb25nb29zZS5TY2hlbWEoe1xuICBvcmlnaW5hbDoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgfSxcbiAgc2hvcnRDb2RlOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGluZGV4OiB0cnVlLFxuICB9XG59KTtcblxuY29uc3QgZW50cnlTY2hlbWEgPSB1cmxTY2hlbWEuaW5kZXgoeyBzaG9ydENvZGU6IDEsIG9yaWdpbmFsOiAxIH0sIHsgdW5pcXVlOiB0cnVlIH0pO1xuY29uc3QgdXJsRW50cnkgPSBtb25nb29zZS5tb2RlbCgndXJsU2NoZW1hJywgZW50cnlTY2hlbWEpO1xuXG5mdW5jdGlvbiBjaGVja0ZvckR1cHModXJsKSB7XG4gIHJldHVybiB1cmxFbnRyeVxuICAgIC5maW5kT25lKHsgb3JpZ2luYWw6IHVybCB9KVxuICAgIC50aGVuKGRvYyA9PiBkb2MgPyBkb2Muc2hvcnRDb2RlIDogZmFsc2UpLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVkaXJlY3Qoc2hvcnRDb2RlLCByZXMpIHtcbiAgdXJsRW50cnkuZmluZE9uZSh7IHNob3J0Q29kZSB9KVxuICAgIC50aGVuKChkb2MpID0+IHtcbiAgICAgIGlmICghZG9jKXtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoJ1VSTCBub3QgZm91bmQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcy5yZWRpcmVjdChgaHR0cHM6Ly93d3cuJHtkb2Mub3JpZ2luYWx9YCk7XG4gICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYWRkVXJsKHVybCwgcmVzKSB7XG4gIGNoZWNrRm9yRHVwcyh1cmwpLnRoZW4oc2hvcnRDb2RlID0+IHtcbiAgICBpZiAoc2hvcnRDb2RlKSB7XG4gICAgICByZXMucmVuZGVyKCduZXcnLCB7IHNob3J0Q29kZTogc2hvcnRDb2RlIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodXJsKSB7XG4gICAgICAgIGNvbnN0IG5ld1VybCA9IHNob3J0ZW4odXJsKTtcbiAgICAgICAgY29uc3QgbmV3VXJsRW50cnkgPSBuZXcgdXJsRW50cnkoeyBvcmlnaW5hbDogdXJsLCBzaG9ydENvZGU6IG5ld1VybH0pO1xuICAgICAgICBuZXdVcmxFbnRyeS5zYXZlKCkudGhlbihpbnNlcnRlZERvY3VtZW50ID0+IHtcbiAgICAgICAgICBpZighaW5zZXJ0ZWREb2N1bWVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVycm9yJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzLnNob3J0Q29kZSA9IGluc2VydGVkRG9jdW1lbnQuc2hvcnRDb2RlO1xuICAgICAgICAgICAgcmVzLnJlbmRlcignbmV3JywgeyBzaG9ydENvZGU6IGluc2VydGVkRG9jdW1lbnQuc2hvcnRDb2RlIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdXJsOiBpbnNlcnRlZERvY3VtZW50Lm9yaWdpbmFsLFxuICAgICAgICAgICAgc2hvcnRDb2RlOiBpbnNlcnRlZERvY3VtZW50LnNob3J0Q29kZVxuICAgICAgICAgIH07XG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gIH0pO1xufSJdfQ==