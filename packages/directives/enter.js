/** @format */

export default () => {
  return {
    inserted(el, binding) {
      // 在聚焦的同时输入回车键，会触发两次事件，所以需要防抖
      let timer = null;
      function enterFunc(e) {
        e = e || window.event;
        if (e.keyCode === 13) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            console.log(binding.value);
            binding.value && binding.value();
          }, 100);
        }
      }
      el.addEventListener('keyup', enterFunc);
      el.__vueEnter__ = enterFunc;
    },
    unbind(el) {
      el.removeEventListener('keyup', enterFunc);
      delete el.__vueEnter__;
    }
  };
};
