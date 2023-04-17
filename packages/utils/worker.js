/** @format */
self.onmessage = (e) => {
  const len = e.length;
  for (let i = 0; i < len; i++) {
    // console.log(i);
    e[i]['$v_checked'] = false;
  }
  postMessage(e);
};
