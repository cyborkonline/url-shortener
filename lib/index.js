'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _db = require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); /* global process */
/* global __dirname */

var PORT = process.env.PORT || 3000;
app.use((0, _cors2.default)());

app.use('/', _express2.default.static(_path2.default.join(__dirname, 'client')));
app.set('view engine', 'handlebars');
app.set('views', _path2.default.join(__dirname, '../src/client'));
app.engine('handlebars', (0, _expressHandlebars2.default)({
  layoutsDir: _path2.default.join(__dirname, '../src/client')
}));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/:shortCode', function (req, res) {
  var shortCode = req.params.shortCode;
  (0, _db.redirect)(shortCode, res);
});

app.get('/new/:url', function (req, res) {
  var url = req.params.url;
  (0, _db.addUrl)(url, res);
});

app.listen(PORT, function () {
  return console.log('Server running on port ' + PORT);
}); // eslint-disable-line
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhcHAiLCJQT1JUIiwicHJvY2VzcyIsImVudiIsInVzZSIsInN0YXRpYyIsImpvaW4iLCJfX2Rpcm5hbWUiLCJzZXQiLCJlbmdpbmUiLCJsYXlvdXRzRGlyIiwiZ2V0IiwicmVxIiwicmVzIiwicmVuZGVyIiwic2hvcnRDb2RlIiwicGFyYW1zIiwidXJsIiwibGlzdGVuIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsSUFBTUEsTUFBTSx3QkFBWixDLENBUkE7QUFDQTs7QUFRQSxJQUFNQyxPQUFPQyxRQUFRQyxHQUFSLENBQVlGLElBQVosSUFBb0IsSUFBakM7QUFDQUQsSUFBSUksR0FBSixDQUFRLHFCQUFSOztBQUVBSixJQUFJSSxHQUFKLENBQVEsR0FBUixFQUFZLGtCQUFRQyxNQUFSLENBQWUsZUFBS0MsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLFFBQXJCLENBQWYsQ0FBWjtBQUNBUCxJQUFJUSxHQUFKLENBQVEsYUFBUixFQUF1QixZQUF2QjtBQUNBUixJQUFJUSxHQUFKLENBQVEsT0FBUixFQUFpQixlQUFLRixJQUFMLENBQVVDLFNBQVYsRUFBb0IsZUFBcEIsQ0FBakI7QUFDQVAsSUFBSVMsTUFBSixDQUFXLFlBQVgsRUFBeUIsaUNBQU87QUFDOUJDLGNBQVksZUFBS0osSUFBTCxDQUFVQyxTQUFWLEVBQW9CLGVBQXBCO0FBRGtCLENBQVAsQ0FBekI7O0FBS0FQLElBQUlXLEdBQUosQ0FBUSxHQUFSLEVBQWEsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDekJBLE1BQUlDLE1BQUosQ0FBVyxPQUFYO0FBQ0QsQ0FGRDs7QUFJQWQsSUFBSVcsR0FBSixDQUFRLGFBQVIsRUFBdUIsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDbkMsTUFBTUUsWUFBWUgsSUFBSUksTUFBSixDQUFXRCxTQUE3QjtBQUNBLG9CQUFTQSxTQUFULEVBQW9CRixHQUFwQjtBQUNELENBSEQ7O0FBTUFiLElBQUlXLEdBQUosQ0FBUSxXQUFSLEVBQXFCLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ2pDLE1BQU1JLE1BQU1MLElBQUlJLE1BQUosQ0FBV0MsR0FBdkI7QUFDQSxrQkFBT0EsR0FBUCxFQUFZSixHQUFaO0FBQ0QsQ0FIRDs7QUFLQWIsSUFBSWtCLE1BQUosQ0FBV2pCLElBQVgsRUFBaUI7QUFBQSxTQUFNa0IsUUFBUUMsR0FBUiw2QkFBc0NuQixJQUF0QyxDQUFOO0FBQUEsQ0FBakIsRSxDQUF1RSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBwcm9jZXNzICovXG4vKiBnbG9iYWwgX19kaXJuYW1lICovXG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZXhwaGJzIGZyb20gJ2V4cHJlc3MtaGFuZGxlYmFycyc7XG5pbXBvcnQgeyBhZGRVcmwsIHJlZGlyZWN0IH0gZnJvbSAnLi9kYic7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IFBPUlQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDA7XG5hcHAudXNlKGNvcnMoKSk7XG5cbmFwcC51c2UoJy8nLGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICdjbGllbnQnKSkpO1xuYXBwLnNldCgndmlldyBlbmdpbmUnLCAnaGFuZGxlYmFycycpO1xuYXBwLnNldCgndmlld3MnLCBwYXRoLmpvaW4oX19kaXJuYW1lLCcuLi9zcmMvY2xpZW50JykpO1xuYXBwLmVuZ2luZSgnaGFuZGxlYmFycycsIGV4cGhicyh7XG4gIGxheW91dHNEaXI6IHBhdGguam9pbihfX2Rpcm5hbWUsJy4uL3NyYy9jbGllbnQnKSxcbn0pKTtcblxuXG5hcHAuZ2V0KCcvJywgKHJlcSwgcmVzKSA9PiB7XG4gIHJlcy5yZW5kZXIoJ2luZGV4Jyk7XG59KTtcblxuYXBwLmdldCgnLzpzaG9ydENvZGUnLCAocmVxLCByZXMpID0+IHtcbiAgY29uc3Qgc2hvcnRDb2RlID0gcmVxLnBhcmFtcy5zaG9ydENvZGU7XG4gIHJlZGlyZWN0KHNob3J0Q29kZSwgcmVzKTtcbn0pO1xuXG5cbmFwcC5nZXQoJy9uZXcvOnVybCcsIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB1cmwgPSByZXEucGFyYW1zLnVybDtcbiAgYWRkVXJsKHVybCwgcmVzKTtcbn0pO1xuXG5hcHAubGlzdGVuKFBPUlQsICgpID0+IGNvbnNvbGUubG9nKGBTZXJ2ZXIgcnVubmluZyBvbiBwb3J0ICR7UE9SVH1gKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUiXX0=