'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = addUrl;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _shortener = require('./shortener');

var _shortener2 = _interopRequireDefault(_shortener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../config');

_mongoose2.default.Promise = require('bluebird');
var dbURI = 'mongodb://' + config.db.host + '/' + config.db.name;
console.log(dbURI);
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

function addUrl(url, res) {
    checkForDups(url).then(function (shortCode) {
        if (shortCode) {
            res.status(200).send('URL already shortened: ' + shortCode);
        } else {
            if (url) {
                var newUrl = (0, _shortener2.default)(url);
                var newUrlEntry = new urlEntry({ original: url, shortCode: newUrl });
                newUrlEntry.save().then(function (insertedDocument) {
                    if (!insertedDocument) {
                        throw new Error('Unknown error');
                    } else {
                        res.status(200).send('URL successfully shortened: http://www.example.com/' + insertedDocument.shortCode);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYi5qcyJdLCJuYW1lcyI6WyJhZGRVcmwiLCJjb25maWciLCJyZXF1aXJlIiwiUHJvbWlzZSIsImRiVVJJIiwiZGIiLCJob3N0IiwibmFtZSIsImNvbnNvbGUiLCJsb2ciLCJjb25uZWN0IiwidXNlTW9uZ29DbGllbnQiLCJ1cmxTY2hlbWEiLCJTY2hlbWEiLCJvcmlnaW5hbCIsInR5cGUiLCJTdHJpbmciLCJzaG9ydENvZGUiLCJpbmRleCIsImVudHJ5U2NoZW1hIiwidW5pcXVlIiwidXJsRW50cnkiLCJtb2RlbCIsImNoZWNrRm9yRHVwcyIsInVybCIsImZpbmRPbmUiLCJ0aGVuIiwiZG9jIiwiY2F0Y2giLCJlcnIiLCJFcnJvciIsInJlcyIsInN0YXR1cyIsInNlbmQiLCJuZXdVcmwiLCJuZXdVcmxFbnRyeSIsInNhdmUiLCJpbnNlcnRlZERvY3VtZW50Il0sIm1hcHBpbmdzIjoiOzs7OztrQkE4QndCQSxNOztBQTlCeEI7Ozs7QUFDQTs7Ozs7O0FBQ0EsSUFBTUMsU0FBU0MsUUFBUSxXQUFSLENBQWY7O0FBRUEsbUJBQVNDLE9BQVQsR0FBbUJELFFBQVEsVUFBUixDQUFuQjtBQUNBLElBQU1FLHVCQUFxQkgsT0FBT0ksRUFBUCxDQUFVQyxJQUEvQixTQUF1Q0wsT0FBT0ksRUFBUCxDQUFVRSxJQUF2RDtBQUNBQyxRQUFRQyxHQUFSLENBQVlMLEtBQVo7QUFDQSxtQkFBU00sT0FBVCxDQUFpQk4sS0FBakIsRUFBd0IsRUFBRU8sZ0JBQWdCLElBQWxCLEVBQXhCOztBQUVBLElBQU1DLFlBQVksbUJBQVNDLE1BQVQsQ0FBZ0I7QUFDOUJDLGNBQVU7QUFDTkMsY0FBTUM7QUFEQSxLQURvQjtBQUk5QkMsZUFBVztBQUNQRixjQUFNQyxNQURDO0FBRVBFLGVBQU87QUFGQTtBQUptQixDQUFoQixDQUFsQjs7QUFVQSxJQUFNQyxjQUFjUCxVQUFVTSxLQUFWLENBQWdCLEVBQUVELFdBQVcsQ0FBYixFQUFnQkgsVUFBVSxDQUExQixFQUFoQixFQUErQyxFQUFFTSxRQUFRLElBQVYsRUFBL0MsQ0FBcEI7QUFDQSxJQUFNQyxXQUFXLG1CQUFTQyxLQUFULENBQWUsV0FBZixFQUE0QkgsV0FBNUIsQ0FBakI7O0FBRUEsU0FBU0ksWUFBVCxDQUFzQkMsR0FBdEIsRUFBMkI7QUFDdkIsV0FBT0gsU0FDRkksT0FERSxDQUNNLEVBQUVYLFVBQVVVLEdBQVosRUFETixFQUVGRSxJQUZFLENBRUc7QUFBQSxlQUFPQyxNQUFNQSxJQUFJVixTQUFWLEdBQXNCLEtBQTdCO0FBQUEsS0FGSCxFQUV1Q1csS0FGdkMsQ0FFNkMsVUFBQ0MsR0FBRCxFQUFTO0FBQ3JELGNBQU0sSUFBSUMsS0FBSixDQUFVRCxHQUFWLENBQU47QUFDSCxLQUpFLENBQVA7QUFLSDs7QUFFYyxTQUFTN0IsTUFBVCxDQUFnQndCLEdBQWhCLEVBQXFCTyxHQUFyQixFQUEwQjtBQUNyQ1IsaUJBQWFDLEdBQWIsRUFBa0JFLElBQWxCLENBQXVCLHFCQUFhO0FBQ2hDLFlBQUlULFNBQUosRUFBZTtBQUNYYyxnQkFBSUMsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLDZCQUErQ2hCLFNBQS9DO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsZ0JBQUlPLEdBQUosRUFBUztBQUNMLG9CQUFNVSxTQUFTLHlCQUFRVixHQUFSLENBQWY7QUFDQSxvQkFBTVcsY0FBYyxJQUFJZCxRQUFKLENBQWEsRUFBRVAsVUFBVVUsR0FBWixFQUFpQlAsV0FBV2lCLE1BQTVCLEVBQWIsQ0FBcEI7QUFDQUMsNEJBQVlDLElBQVosR0FBbUJWLElBQW5CLENBQXdCLDRCQUFvQjtBQUN4Qyx3QkFBRyxDQUFDVyxnQkFBSixFQUFzQjtBQUNsQiw4QkFBTSxJQUFJUCxLQUFKLENBQVUsZUFBVixDQUFOO0FBQ0gscUJBRkQsTUFHSztBQUNEQyw0QkFBSUMsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLHlEQUEyRUksaUJBQWlCcEIsU0FBNUY7QUFDSDtBQUNELDJCQUFPO0FBQ0hPLDZCQUFLYSxpQkFBaUJ2QixRQURuQjtBQUVIRyxtQ0FBV29CLGlCQUFpQnBCO0FBRnpCLHFCQUFQO0FBSUgsaUJBWEQsRUFXR1csS0FYSCxDQVdTLFVBQUNDLEdBQUQsRUFBUztBQUNkLDBCQUFNLElBQUlDLEtBQUosQ0FBVUQsR0FBVixDQUFOO0FBQ0gsaUJBYkQ7QUFjSDtBQUNKO0FBQ0osS0F2QkQsRUF1QkdELEtBdkJILENBdUJTLFVBQUNDLEdBQUQsRUFBUztBQUNkLGNBQU0sSUFBSUMsS0FBSixDQUFVRCxHQUFWLENBQU47QUFDSCxLQXpCRDtBQTBCSCIsImZpbGUiOiJkYi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgc2hvcnRlbiBmcm9tICcuL3Nob3J0ZW5lcic7XG5jb25zdCBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKTtcblxubW9uZ29vc2UuUHJvbWlzZSA9IHJlcXVpcmUoJ2JsdWViaXJkJyk7XG5jb25zdCBkYlVSSSA9IGBtb25nb2RiOi8vJHtjb25maWcuZGIuaG9zdH0vJHtjb25maWcuZGIubmFtZX1gO1xuY29uc29sZS5sb2coZGJVUkkpO1xubW9uZ29vc2UuY29ubmVjdChkYlVSSSwgeyB1c2VNb25nb0NsaWVudDogdHJ1ZSB9KTtcblxuY29uc3QgdXJsU2NoZW1hID0gbW9uZ29vc2UuU2NoZW1hKHtcbiAgICBvcmlnaW5hbDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgfSxcbiAgICBzaG9ydENvZGU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBpbmRleDogdHJ1ZSxcbiAgICB9XG59KTtcblxuY29uc3QgZW50cnlTY2hlbWEgPSB1cmxTY2hlbWEuaW5kZXgoeyBzaG9ydENvZGU6IDEsIG9yaWdpbmFsOiAxIH0sIHsgdW5pcXVlOiB0cnVlIH0pO1xuY29uc3QgdXJsRW50cnkgPSBtb25nb29zZS5tb2RlbCgndXJsU2NoZW1hJywgZW50cnlTY2hlbWEpO1xuXG5mdW5jdGlvbiBjaGVja0ZvckR1cHModXJsKSB7XG4gICAgcmV0dXJuIHVybEVudHJ5XG4gICAgICAgIC5maW5kT25lKHsgb3JpZ2luYWw6IHVybCB9KVxuICAgICAgICAudGhlbihkb2MgPT4gZG9jID8gZG9jLnNob3J0Q29kZSA6IGZhbHNlKS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZFVybCh1cmwsIHJlcykge1xuICAgIGNoZWNrRm9yRHVwcyh1cmwpLnRoZW4oc2hvcnRDb2RlID0+IHtcbiAgICAgICAgaWYgKHNob3J0Q29kZSkge1xuICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoYFVSTCBhbHJlYWR5IHNob3J0ZW5lZDogJHtzaG9ydENvZGV9YCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VXJsID0gc2hvcnRlbih1cmwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1VybEVudHJ5ID0gbmV3IHVybEVudHJ5KHsgb3JpZ2luYWw6IHVybCwgc2hvcnRDb2RlOiBuZXdVcmx9KTtcbiAgICAgICAgICAgICAgICBuZXdVcmxFbnRyeS5zYXZlKCkudGhlbihpbnNlcnRlZERvY3VtZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWluc2VydGVkRG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1cygyMDApLnNlbmQoYFVSTCBzdWNjZXNzZnVsbHkgc2hvcnRlbmVkOiBodHRwOi8vd3d3LmV4YW1wbGUuY29tLyR7aW5zZXJ0ZWREb2N1bWVudC5zaG9ydENvZGV9YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogaW5zZXJ0ZWREb2N1bWVudC5vcmlnaW5hbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0Q29kZTogaW5zZXJ0ZWREb2N1bWVudC5zaG9ydENvZGVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICB9KTtcbn0iXX0=