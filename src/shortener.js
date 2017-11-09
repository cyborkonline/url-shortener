const alphabet = 'abcdefghijkmnpqrstuvxzABCDEFGHIJKLMNPQRSTYVWXZw1234567890';
const base = alphabet.length;

export default function shorten() {
  let encoded = [];
  for (let i = 0; i < 5; i += 1) {
    let randomIndex = Math.random() * 100;
    while (randomIndex > base) {
      randomIndex = Math.random() * 100;
    }
    randomIndex = Math.floor(randomIndex);
    encoded.push(alphabet[randomIndex]);
  }
  return encoded.join('');
}