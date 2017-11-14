const jsdom = require('jsdom');
const { JSDOM } = jsdom;
// eslint-disable-next-line
GLOBAL.document = new JSDOM().window.document;
// eslint-disable-next-line
document = GLOBAL.document;

const button = document.querySelector('.btn');
if (button) {
  button.addEventListener('click',() => {
    const value = document.querySelector('.form-control').value;
    //console.log('hey,hey', value);
  });

}
