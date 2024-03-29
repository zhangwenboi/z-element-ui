/** @format */

import attrsProps from './attrs';
// 驼峰转短横线
export function kebabcase(v) {
  return v.replace(/([^-])([A-Z])/g, '$1-$2').toLowerCase();
}

// 短横线转驼峰
export function humpcase(v) {
  return v.replace(/-(\w)/g, (a, b) => b.toUpperCase());
}

// 获取 prop 值 ，以支持短横线，驼峰，两种写法
export function getProp(obj, key) {
  let key1 = kebabcase(key);
  if (obj.hasOwnProperty(key1)) return obj[key1];
  let key2 = humpcase(key);
  if (obj.hasOwnProperty(key2)) return obj[key2];
}

// 数组是否存在 key

export function includesKey(keys, key) {
  return keys.includes(kebabcase(key)) || keys.includes(humpcase(key));
}

// 从目标对象获取指定属性
export function getIncludeAttrs(keys, target) {
  let obj = {};
  keys.forEach((key) => {
    let value = getProp(target, key);
    if (value !== undefined) obj[key] = value;
  });
  return obj;
}
export const getProps = (propsKeys, attrs) => {
  return getIncludeAttrs(attrsProps[propsKeys], attrs);
};
// 从目标对象排除指定属性
export function getExcludeAttrs(keys, target) {
  let obj = {};
  for (const key in target) {
    if (!includesKey(keys, key)) obj[key] = target[key];
  }
  return obj;
}

// 获取自定义的 props
export function getCustomProps(props, attrs) {
  const propsKyes = Object.keys(props);
  const defaultProps = {};
  propsKyes.forEach((k) => {
    defaultProps[k] = typeof props[k].default == 'function' ? props[k].default() : props[k].default;
  });
  return attrs ? Object.assign(defaultProps, getIncludeAttrs(propsKyes, attrs)) : defaultProps;
}

// 生成一个 uuid
export function uuid(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}
// 继承属性 关联响应式
export const extend = function (obj, target = {}, vueset, cover = false) {
  for (const key in target) {
    let a = getProp(obj, key) !== undefined && !cover;
    let b = getProp(target, key) === undefined;
    if (a || b) continue;
    vueset(obj, key, target[key]);
  }
};

export const findRef = function (context, refName) {
  let ref = null;
  if (context.$refs[refName]) {
    ref = context.$refs[refName];
  } else {
    context.$children.every((vm) => {
      ref = findRef(vm, refName);
      return ref === null;
    });
  }
  return Array.isArray(ref) && ref.length == 1 ? ref[0] : ref;
};

export const getArrItems = function (arr) {
  if (Array.isArray(arr)) {
    return arr.map((item) => {
      item.prop = item.prop || '__uuid__' + uuid();
      return item;
    });
  } else {
    return Object.keys(arr).map((key) => {
      arr[key].prop = arr[key].prop || key;
      return arr[key];
    });
  }
};
// 深度克隆Object
export const deepClone = function (obj) {
  if (typeof obj !== 'object') {
    return obj;
  }
  let newObj = obj instanceof Array ? [] : {};
  for (let key in obj) {
    newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
  }
  return newObj;
};
//创建动态样式
export const dynamicStyleRule = function (id, styleRule) {
  let styleId = 'dynamic-style-' + id;
  let styleElement = document.getElementById(styleId);

  if (styleElement) {
    styleElement.parentNode.removeChild(styleElement);
  }
  if (styleRule) {
    styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.id = styleId;
    document.getElementsByTagName('head')[0].appendChild(styleElement);

    styleElement.appendChild(document.createTextNode(styleRule));
  }
};
/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}   noTrailing     Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset)
 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {Boolean}   debounceMode   If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @return {Function}  A new, throttled, function.
 */
export function throttle(delay, noTrailing, callback, debounceMode) {
  var timeoutID;

  var lastExec = 0;

  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }
  function wrapper() {
    var self = this;
    var elapsed = Number(new Date()) - lastExec;
    var args = arguments;

    function exec() {
      lastExec = Number(new Date());
      callback.apply(self, args);
    }

    function clear() {
      timeoutID = undefined;
    }

    if (debounceMode && !timeoutID) {
      exec();
    }

    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    if (debounceMode === undefined && elapsed > delay) {
      exec();
    } else if (noTrailing !== true) {
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  }

  return wrapper;
}
/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param  {Number}   delay         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}  atBegin       Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 * @param  {Function} callback      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                  to `callback` when the debounced-function is executed.
 *
 * @return {Function} A new, debounced function.
 */
export function debounce(delay, atBegin, callback) {
  return callback === undefined ? throttle(delay, atBegin, false) : throttle(callback, delay, atBegin !== false);
}
