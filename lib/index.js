'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global process */
/* global __dirname */
var app = (0, _express2.default)();
var PORT = process.env.PORT || 3000;
app.use((0, _cors2.default)());

app.get('/', function (req, res) {
    res.set('content-type', 'text/html');
    res.send(_fs2.default.readFileSync(__dirname + '/index.html', 'utf8'));
    res.end();
});

app.get('/new/:url', function (request, response) {
    var url = request.params.url;
    (0, _db2.default)(url, response);
});

app.listen(PORT, function () {
    return console.log('Server running on port ' + PORT);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJQT1JUIiwicHJvY2VzcyIsImVudiIsInVzZSIsImdldCIsInJlcSIsInJlcyIsInNldCIsInNlbmQiLCJyZWFkRmlsZVN5bmMiLCJfX2Rpcm5hbWUiLCJlbmQiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJ1cmwiLCJwYXJhbXMiLCJsaXN0ZW4iLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFMQTtBQUNBO0FBTUEsSUFBTUEsTUFBTSx3QkFBWjtBQUNBLElBQU1DLE9BQU9DLFFBQVFDLEdBQVIsQ0FBWUYsSUFBWixJQUFvQixJQUFqQztBQUNBRCxJQUFJSSxHQUFKLENBQVEscUJBQVI7O0FBR0FKLElBQUlLLEdBQUosQ0FBUSxHQUFSLEVBQWEsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDdkJBLFFBQUlDLEdBQUosQ0FBUSxjQUFSLEVBQXVCLFdBQXZCO0FBQ0FELFFBQUlFLElBQUosQ0FBUyxhQUFHQyxZQUFILENBQWdCQyxZQUFVLGFBQTFCLEVBQXdDLE1BQXhDLENBQVQ7QUFDQUosUUFBSUssR0FBSjtBQUNILENBSkQ7O0FBTUFaLElBQUlLLEdBQUosQ0FBUSxXQUFSLEVBQXFCLFVBQUNRLE9BQUQsRUFBVUMsUUFBVixFQUF1QjtBQUN4QyxRQUFNQyxNQUFNRixRQUFRRyxNQUFSLENBQWVELEdBQTNCO0FBQ0Esc0JBQU9BLEdBQVAsRUFBWUQsUUFBWjtBQUNILENBSEQ7O0FBS0FkLElBQUlpQixNQUFKLENBQVdoQixJQUFYLEVBQWlCO0FBQUEsV0FBTWlCLFFBQVFDLEdBQVIsNkJBQXNDbEIsSUFBdEMsQ0FBTjtBQUFBLENBQWpCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIHByb2Nlc3MgKi9cbi8qIGdsb2JhbCBfX2Rpcm5hbWUgKi9cbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IGFkZFVybCBmcm9tICcuL2RiJztcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgUE9SVCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMDtcbmFwcC51c2UoY29ycygpKTtcblxuXG5hcHAuZ2V0KCcvJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgcmVzLnNldCgnY29udGVudC10eXBlJywndGV4dC9odG1sJyk7XG4gICAgcmVzLnNlbmQoZnMucmVhZEZpbGVTeW5jKF9fZGlybmFtZSsnL2luZGV4Lmh0bWwnLCd1dGY4JykpO1xuICAgIHJlcy5lbmQoKTtcbn0pO1xuXG5hcHAuZ2V0KCcvbmV3Lzp1cmwnLCAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICBjb25zdCB1cmwgPSByZXF1ZXN0LnBhcmFtcy51cmw7XG4gICAgYWRkVXJsKHVybCwgcmVzcG9uc2UpXG59KTtcblxuYXBwLmxpc3RlbihQT1JULCAoKSA9PiBjb25zb2xlLmxvZyhgU2VydmVyIHJ1bm5pbmcgb24gcG9ydCAke1BPUlR9YCkpIl19