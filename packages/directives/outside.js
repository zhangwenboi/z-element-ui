/** @format
 * desc: 点击元素外部触发事件
 * @param {Function} binding.value 点击元素外部触发的事件
 * @param {Object}  {handler:事件处理函数,include?:包含元素}
 * @example <div v-outside="handleOutsideClick"></div>
 * @example <div v-outside="{handler:handleOutsideClick,include:includeElement}"></div>
 */

export default () => {
  let include = null;
  return {
    bind(el, binding) {
      function documentHandler(e) {
        if (binding.modifiers.stop) {
          e.stopPropagation();
        }
        if (binding.modifiers.prevent) {
          e.preventDefault();
        }

        if (el.contains(e.target)) {
          return false;
        }
        if (typeof binding.value !== 'function') {
          const { handler } = binding.value;

          if (typeof handler !== 'function') {
            throw new Error('binding.value.handler is not a function');
          }

          let isInclude = false;
          if (include) {
            if (Array.isArray(include)) {
              isInclude = include.some((item) => item.contains(e.target));
            } else {
              isInclude = include.contains(e.target);
            }
          }
          if (!isInclude) {
            handler(e);
          }
        } else if (binding.expression) {
          binding.value(e);
        } else {
          throw new Error('binding.value is not a function');
        }
      }
      el.__vueClickOutside__ = documentHandler;
      document.addEventListener('click', documentHandler);
    },
    update(el, binding) {
      if (binding.value.include) {
        include = binding.value.include;
      }
    },
    unbind(el, binding) {
      document.removeEventListener('click', el.__vueClickOutside__);
      delete el.__vueClickOutside__;
    }
  };
};
