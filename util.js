function debounce(fn, delay) {
  let timer = null;
  return function (args) {
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn(regs);
    }, delay);
  };
}
