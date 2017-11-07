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
        randomIndex = Math.floor(randomIndex);
        encoded.push(alphabet[randomIndex]);
    }
    return encoded.join('');
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zaG9ydGVuZXIuanMiXSwibmFtZXMiOlsic2hvcnRlbiIsImFscGhhYmV0IiwiYmFzZSIsImxlbmd0aCIsImVuY29kZWQiLCJpIiwicmFuZG9tSW5kZXgiLCJNYXRoIiwicmFuZG9tIiwiZmxvb3IiLCJwdXNoIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBR3dCQSxPO0FBSHhCLElBQU1DLFdBQVcsMkRBQWpCO0FBQ0EsSUFBTUMsT0FBT0QsU0FBU0UsTUFBdEI7O0FBRWUsU0FBU0gsT0FBVCxHQUFtQjtBQUM5QixRQUFJSSxVQUFVLEVBQWQ7QUFDQSxTQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxDQUFwQixFQUF1QkEsS0FBSyxDQUE1QixFQUErQjtBQUMzQixZQUFJQyxjQUFjQyxLQUFLQyxNQUFMLEtBQWdCLEdBQWxDO0FBQ0EsZUFBT0YsY0FBY0osSUFBckIsRUFBMkI7QUFDdkJJLDBCQUFjQyxLQUFLQyxNQUFMLEtBQWdCLEdBQTlCO0FBQ0g7QUFDREYsc0JBQWNDLEtBQUtFLEtBQUwsQ0FBV0gsV0FBWCxDQUFkO0FBQ0FGLGdCQUFRTSxJQUFSLENBQWFULFNBQVNLLFdBQVQsQ0FBYjtBQUNIO0FBQ0QsV0FBT0YsUUFBUU8sSUFBUixDQUFhLEVBQWIsQ0FBUDtBQUNIIiwiZmlsZSI6InNob3J0ZW5lci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFscGhhYmV0ID0gJ2FiY2RlZmdoaWprbW5wcXJzdHV2eHpBQkNERUZHSElKS0xNTlBRUlNUWVZXWFp3MTIzNDU2Nzg5MCc7XG5jb25zdCBiYXNlID0gYWxwaGFiZXQubGVuZ3RoO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaG9ydGVuKCkge1xuICAgIGxldCBlbmNvZGVkID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpICs9IDEpIHtcbiAgICAgICAgbGV0IHJhbmRvbUluZGV4ID0gTWF0aC5yYW5kb20oKSAqIDEwMDtcbiAgICAgICAgd2hpbGUgKHJhbmRvbUluZGV4ID4gYmFzZSkge1xuICAgICAgICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLnJhbmRvbSgpICogMTAwO1xuICAgICAgICB9XG4gICAgICAgIHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihyYW5kb21JbmRleCk7XG4gICAgICAgIGVuY29kZWQucHVzaChhbHBoYWJldFtyYW5kb21JbmRleF0pO1xuICAgIH1cbiAgICByZXR1cm4gZW5jb2RlZC5qb2luKCcnKTtcbn0iXX0=