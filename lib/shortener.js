'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = shorten;
var alphabet = 'abcdefghijkmnpqrstuvxzABCDEFGHIJKLMNPQRSTYVWXZw1234567890';
var base = alphabet.length;

function shorten() {
    var encoded = [];
    for (var i = 0; i < 5; i += 1) {
        var randomIndex = Math.random() * 100;
        while (randomIndex > base) {
            randomIndex = Math.random() * 100;
        }
        encoded.push(alphabet[randomIndex]);
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zaG9ydGVuZXIuanMiXSwibmFtZXMiOlsic2hvcnRlbiIsImFscGhhYmV0IiwiYmFzZSIsImxlbmd0aCIsImVuY29kZWQiLCJpIiwicmFuZG9tSW5kZXgiLCJNYXRoIiwicmFuZG9tIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBR3dCQSxPO0FBSHhCLElBQU1DLFdBQVcsMkRBQWpCO0FBQ0EsSUFBTUMsT0FBT0QsU0FBU0UsTUFBdEI7O0FBRWUsU0FBU0gsT0FBVCxHQUFtQjtBQUM5QixRQUFJSSxVQUFVLEVBQWQ7QUFDQSxTQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxDQUFwQixFQUF1QkEsS0FBSyxDQUE1QixFQUErQjtBQUMzQixZQUFJQyxjQUFjQyxLQUFLQyxNQUFMLEtBQWdCLEdBQWxDO0FBQ0EsZUFBT0YsY0FBY0osSUFBckIsRUFBMkI7QUFDdkJJLDBCQUFjQyxLQUFLQyxNQUFMLEtBQWdCLEdBQTlCO0FBQ0g7QUFDREosZ0JBQVFLLElBQVIsQ0FBYVIsU0FBU0ssV0FBVCxDQUFiO0FBQ0g7QUFHSiIsImZpbGUiOiJzaG9ydGVuZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhbHBoYWJldCA9ICdhYmNkZWZnaGlqa21ucHFyc3R1dnh6QUJDREVGR0hJSktMTU5QUVJTVFlWV1hadzEyMzQ1Njc4OTAnO1xuY29uc3QgYmFzZSA9IGFscGhhYmV0Lmxlbmd0aDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hvcnRlbigpIHtcbiAgICBsZXQgZW5jb2RlZCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSArPSAxKSB7XG4gICAgICAgIGxldCByYW5kb21JbmRleCA9IE1hdGgucmFuZG9tKCkgKiAxMDA7XG4gICAgICAgIHdoaWxlIChyYW5kb21JbmRleCA+IGJhc2UpIHtcbiAgICAgICAgICAgIHJhbmRvbUluZGV4ID0gTWF0aC5yYW5kb20oKSAqIDEwMDtcbiAgICAgICAgfVxuICAgICAgICBlbmNvZGVkLnB1c2goYWxwaGFiZXRbcmFuZG9tSW5kZXhdKTtcbiAgICB9XG4gICAgXG5cbn0iXX0=