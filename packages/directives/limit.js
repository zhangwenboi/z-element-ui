/** @format */

const limit = () => {
  return {
    bind(el, binding) {
      const { value, modifiers } = binding;
      const regs = {
        number: /\d/g,
        letter: /[a-zA-Z]/g,
        chinese: /[\u4e00-\u9fa5]/g,
        special: /[~!@#$%^&*()_+<>?:"{},.\/;'[\]]/g
      };
      const limitKeys = Object.keys(modifiers);

      function limitFunc(e) {
        let value = el.value;
        e = e || window.event;
        let charcode = e.keyCode;
        const key = limitKeys[0];
        if (regs[key] && !regs[key].test(e.key) && charcode > 9 && !e.ctrlKey) {
          e.preventDefault();
          value = value.match(regs[key])?.join('') || '';
          el.value = value;
        }
      }
      function replaceValue() {
        let value = el.value;
        if (regs[limitKeys[0]]) {
          value = value.match(regs[limitKeys[0]])?.join('') || '';
        }
        el.value = value;
      }
      el.__vueLimit__ = limitFunc;
      el.addEventListener('keyup', limitFunc);
      el.addEventListener('compositionend', replaceValue);
    },
    unbind(el, binding) {
      el.removeEventListener('keyup', el.__vueLimit__);
      delete el.__vueLimit__;
    }
  };
};
export default limit;
