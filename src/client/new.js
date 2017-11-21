var shortCode = window.shortCode;
document.querySelector('.local-url').innerHTML = window.origin;
document.querySelector('a').addEventListener('click', () => {
  window.open(`/${shortCode}`,'_self');
});
