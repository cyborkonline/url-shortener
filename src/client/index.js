document.querySelector('.btn').addEventListener('click',() => {
  const value = document.querySelector('.form-control').value;
  window.open(`/new/${value}`,'_self');
});