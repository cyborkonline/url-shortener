'use strict';

var _babelCore = require('babel-core');

var babel = _interopRequireWildcard(_babelCore);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var app = (0, _express2.default)();
var PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
  return res.send('Hello World');
});

app.listen(PORT, function () {
  return console.log('server running');
});
