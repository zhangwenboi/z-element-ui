/** @format */

const limit = () => {
  return {
    inserted(element, binding, vNode) {
      // 获取修饰符
      const { modifiers } = binding;

      // 获取input元素
      const inputDom = element.querySelector('input');
      let el = inputDom || element;

      const setValue = (value) => {
        if (el.tagName === 'INPUT') {
          el.value = value;
          // 更新v-model绑定的值
          vNode.data.model?.callback(value);
        } else {
          el.innerText = value;
        }
      };

      // 限制输入的正则
      const regs = {
        number: /\d/g,
        letter: /[a-zA-Z]/g,
        chinese: /[\u4e00-\u9fa5]/g,
        special: /[~!@#$%^&*()_+<>?:"{},.\/;'[\]]/g,
        float: /^\d+\.?\d*$/g
      };

      // 限制输入的键
      const limitKeys = Object.keys(modifiers);

      function limitFunc(e) {
        let v = el.value || el.innerText || null;

        e = e || window.event;
        let charcode = e.keyCode;

        const key = limitKeys[0] ?? 'number';
        if (regs[key] && charcode > 9 && !e.ctrlKey) {
          v = v?.match(regs[key])?.join('') || null;
        }

        setValue(v);
      }

      el.addEventListener('keyup', limitFunc);
      el.addEventListener('compositionend', limitFunc);
      el.__vueLimit__ = limitFunc;

      if (modifiers.float) {
        const defaultValue = { max: 9999999999.99, min: 0, decimal: 2 };

        const bindValue = { ...defaultValue, ...binding.value };
        let content;

        // 失去焦点=>保留指定位小数
        const formatValue = (event) => {
          const e = event || window.event;
          if (!isNaN(Number(e.target.value)) && Number(e.target.value) !== 0) {
            content = (!content && 0.0) || parseFloat(e.target.value || 0);
            if (content > bindValue.max) {
              content = bindValue.max;
            } else if (content < bindValue.min) {
              content = bindValue.min;
            }
            setValue(content.toFixed(parseFloat(bindValue.decimal)));
          } else if (!isNaN(parseFloat(e.target.value))) {
            setValue(parseFloat(e.target.value));
          } else {
            setValue('');
          }
        };

        el.__formatValue__ = formatValue;

        // 失去焦点=>保留指定位小数
        el.addEventListener('blur', formatValue);
      }
    },
    unbind() {
      el.removeEventListener('keyup', el.__vueLimit__);
      el.removeEventListener('compositionend', el.__vueLimit__);
      el.removeEventListener('blur', el.__formatValue__);
      delete el.__vueLimit__;
      delete el.__formatValue__;
    }
  };
};
export default limit;
