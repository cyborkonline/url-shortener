const alphabet = "abcdefghijkmnpqrstuvxzABCDEFGHIJKLMNPQRSTYVWXZw1234567890"
const base = alphabet.length;

export function shorten(id) {
    let encoded = '';
    while (id){
      let remainder = id % base;
      num = Math.floor(id / base);
      encoded = alphabet[remainder].toString() + encoded;
    }
    return encoded;
}
export function decode(str){
    let decoded = 0;
    while (str){
      let index = alphabet.indexOf(str[0]);
      let power = str.length - 1;
      decoded += index * (Math.pow(base, power));
      str = str.substring(1);
    }
    return decoded;
  }