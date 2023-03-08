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
      item.prop = item.prop || '_uid_' + uuid();
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
