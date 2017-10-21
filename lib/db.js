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

_mongoose2.default.Promise = require('bluebird');
var config = {
    db: {
        host: 'localhost',
        name: 'url_shortener'
    },
    webhost: 'http://localhost:3000/'
};

_mongoose2.default.connect('mongodb://' + config.db.host + '/' + config.db.name, { useMongoClient: true });

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

function addUrl(url, req) {
    checkForDups(url).then(function (shortCode) {
        if (shortCode) {
            throw new Error('URL already shortened: ' + shortCode);
        } else {
            if (url) {
                var newUrl = (0, _shortener2.default)(url);
                var newUrlEntry = new urlEntry({ original: url, shortCode: newUrl });
                newUrlEntry.save().then(function (insertedDocument) {
                    if (!insertedDocument) {
                        throw new Error('Unknown error');
                    } else {
                        console.send('URL Shortened: ' + insertedDocument.shortCode);
                    }
                }).catch(function (err) {
                    throw new Error(err);
                });
            }
        }
    }).catch(function (err) {
        throw new Error(err);
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYi5qcyJdLCJuYW1lcyI6WyJhZGRVcmwiLCJQcm9taXNlIiwicmVxdWlyZSIsImNvbmZpZyIsImRiIiwiaG9zdCIsIm5hbWUiLCJ3ZWJob3N0IiwiY29ubmVjdCIsInVzZU1vbmdvQ2xpZW50IiwidXJsU2NoZW1hIiwiU2NoZW1hIiwib3JpZ2luYWwiLCJ0eXBlIiwiU3RyaW5nIiwic2hvcnRDb2RlIiwiaW5kZXgiLCJlbnRyeVNjaGVtYSIsInVuaXF1ZSIsInVybEVudHJ5IiwibW9kZWwiLCJjaGVja0ZvckR1cHMiLCJ1cmwiLCJmaW5kT25lIiwidGhlbiIsImRvYyIsImNhdGNoIiwiZXJyIiwiRXJyb3IiLCJyZXEiLCJuZXdVcmwiLCJuZXdVcmxFbnRyeSIsInNhdmUiLCJpbnNlcnRlZERvY3VtZW50IiwiY29uc29sZSIsInNlbmQiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQW9Dd0JBLE07O0FBcEN4Qjs7OztBQUNBOzs7Ozs7QUFFQSxtQkFBU0MsT0FBVCxHQUFtQkMsUUFBUSxVQUFSLENBQW5CO0FBQ0EsSUFBTUMsU0FDTjtBQUNJQyxRQUFLO0FBQ0RDLGNBQU0sV0FETDtBQUVEQyxjQUFNO0FBRkwsS0FEVDtBQUtJQyxhQUFTO0FBTGIsQ0FEQTs7QUFTQSxtQkFBU0MsT0FBVCxnQkFBOEJMLE9BQU9DLEVBQVAsQ0FBVUMsSUFBeEMsU0FBZ0RGLE9BQU9DLEVBQVAsQ0FBVUUsSUFBMUQsRUFBa0UsRUFBRUcsZ0JBQWdCLElBQWxCLEVBQWxFOztBQUVBLElBQU1DLFlBQVksbUJBQVNDLE1BQVQsQ0FBZ0I7QUFDOUJDLGNBQVU7QUFDTkMsY0FBTUM7QUFEQSxLQURvQjtBQUk5QkMsZUFBVztBQUNQRixjQUFNQyxNQURDO0FBRVBFLGVBQU87QUFGQTtBQUptQixDQUFoQixDQUFsQjs7QUFVQSxJQUFNQyxjQUFjUCxVQUFVTSxLQUFWLENBQWdCLEVBQUVELFdBQVcsQ0FBYixFQUFnQkgsVUFBVSxDQUExQixFQUFoQixFQUErQyxFQUFFTSxRQUFRLElBQVYsRUFBL0MsQ0FBcEI7QUFDQSxJQUFNQyxXQUFXLG1CQUFTQyxLQUFULENBQWUsV0FBZixFQUE0QkgsV0FBNUIsQ0FBakI7O0FBRUEsU0FBU0ksWUFBVCxDQUFzQkMsR0FBdEIsRUFBMkI7QUFDdkIsV0FBT0gsU0FDRkksT0FERSxDQUNNLEVBQUVYLFVBQVVVLEdBQVosRUFETixFQUVGRSxJQUZFLENBRUc7QUFBQSxlQUFPQyxNQUFNQSxJQUFJVixTQUFWLEdBQXNCLEtBQTdCO0FBQUEsS0FGSCxFQUV1Q1csS0FGdkMsQ0FFNkMsVUFBQ0MsR0FBRCxFQUFTO0FBQ3JELGNBQU0sSUFBSUMsS0FBSixDQUFVRCxHQUFWLENBQU47QUFDSCxLQUpFLENBQVA7QUFLSDs7QUFFYyxTQUFTM0IsTUFBVCxDQUFnQnNCLEdBQWhCLEVBQXFCTyxHQUFyQixFQUEwQjtBQUNyQ1IsaUJBQWFDLEdBQWIsRUFBa0JFLElBQWxCLENBQXVCLHFCQUFhO0FBQ2hDLFlBQUlULFNBQUosRUFBZTtBQUNYLGtCQUFNLElBQUlhLEtBQUosNkJBQW9DYixTQUFwQyxDQUFOO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsZ0JBQUlPLEdBQUosRUFBUztBQUNMLG9CQUFNUSxTQUFTLHlCQUFRUixHQUFSLENBQWY7QUFDQSxvQkFBTVMsY0FBYyxJQUFJWixRQUFKLENBQWEsRUFBRVAsVUFBVVUsR0FBWixFQUFpQlAsV0FBV2UsTUFBNUIsRUFBYixDQUFwQjtBQUNBQyw0QkFBWUMsSUFBWixHQUFtQlIsSUFBbkIsQ0FBd0IsNEJBQW9CO0FBQ3hDLHdCQUFHLENBQUNTLGdCQUFKLEVBQXNCO0FBQ2xCLDhCQUFNLElBQUlMLEtBQUosQ0FBVSxlQUFWLENBQU47QUFDSCxxQkFGRCxNQUVPO0FBQ0hNLGdDQUFRQyxJQUFSLHFCQUErQkYsaUJBQWlCbEIsU0FBaEQ7QUFDSDtBQUVKLGlCQVBELEVBT0dXLEtBUEgsQ0FPUyxVQUFDQyxHQUFELEVBQVM7QUFDZCwwQkFBTSxJQUFJQyxLQUFKLENBQVVELEdBQVYsQ0FBTjtBQUNILGlCQVREO0FBVUg7QUFDSjtBQUNKLEtBbkJELEVBbUJHRCxLQW5CSCxDQW1CUyxVQUFDQyxHQUFELEVBQVM7QUFDZCxjQUFNLElBQUlDLEtBQUosQ0FBVUQsR0FBVixDQUFOO0FBQ0gsS0FyQkQ7QUFzQkgiLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IHNob3J0ZW4gZnJvbSAnLi9zaG9ydGVuZXInO1xuXG5tb25nb29zZS5Qcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKTtcbmNvbnN0IGNvbmZpZyA9IFxue1xuICAgIGRiIDoge1xuICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgbmFtZTogJ3VybF9zaG9ydGVuZXInLFxuICAgIH0sXG4gICAgd2ViaG9zdDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8nLFxufTtcblxubW9uZ29vc2UuY29ubmVjdChgbW9uZ29kYjovLyR7Y29uZmlnLmRiLmhvc3R9LyR7Y29uZmlnLmRiLm5hbWV9YCwgeyB1c2VNb25nb0NsaWVudDogdHJ1ZSB9KTtcblxuY29uc3QgdXJsU2NoZW1hID0gbW9uZ29vc2UuU2NoZW1hKHtcbiAgICBvcmlnaW5hbDoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgfSxcbiAgICBzaG9ydENvZGU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBpbmRleDogdHJ1ZSxcbiAgICB9XG59KTtcblxuY29uc3QgZW50cnlTY2hlbWEgPSB1cmxTY2hlbWEuaW5kZXgoeyBzaG9ydENvZGU6IDEsIG9yaWdpbmFsOiAxIH0sIHsgdW5pcXVlOiB0cnVlIH0pO1xuY29uc3QgdXJsRW50cnkgPSBtb25nb29zZS5tb2RlbCgndXJsU2NoZW1hJywgZW50cnlTY2hlbWEpO1xuXG5mdW5jdGlvbiBjaGVja0ZvckR1cHModXJsKSB7XG4gICAgcmV0dXJuIHVybEVudHJ5XG4gICAgICAgIC5maW5kT25lKHsgb3JpZ2luYWw6IHVybCB9KVxuICAgICAgICAudGhlbihkb2MgPT4gZG9jID8gZG9jLnNob3J0Q29kZSA6IGZhbHNlKS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZFVybCh1cmwsIHJlcSkge1xuICAgIGNoZWNrRm9yRHVwcyh1cmwpLnRoZW4oc2hvcnRDb2RlID0+IHtcbiAgICAgICAgaWYgKHNob3J0Q29kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVUkwgYWxyZWFkeSBzaG9ydGVuZWQ6ICR7c2hvcnRDb2RlfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1VybCA9IHNob3J0ZW4odXJsKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdVcmxFbnRyeSA9IG5ldyB1cmxFbnRyeSh7IG9yaWdpbmFsOiB1cmwsIHNob3J0Q29kZTogbmV3VXJsfSk7XG4gICAgICAgICAgICAgICAgbmV3VXJsRW50cnkuc2F2ZSgpLnRoZW4oaW5zZXJ0ZWREb2N1bWVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFpbnNlcnRlZERvY3VtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuc2VuZChgVVJMIFNob3J0ZW5lZDogJHtpbnNlcnRlZERvY3VtZW50LnNob3J0Q29kZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgfSk7XG59Il19