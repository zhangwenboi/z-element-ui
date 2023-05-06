let findEle = (parent, type) => {
    return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type);
};

function filterNum(arg) {
    return arg > 0 ? new RegExp(`^\\d+(?:\\.\\d{0,${arg}})?$`) : new RegExp(`^\\d+$`);
}

function reducerObj(object) {
    if (typeof object !== 'object') throw Error('param is expected object');
    let data = object;

    function split(keyStr) {
        return keyStr.split('.');
    }

    function hasOwn(result, key) {
        if (result.hasOwnProperty(key)) {
            return result[key];
        }
        throw Error(key + ' is not exist');
    }

    return {
        value: data,
        get(keyStr) {
            let keys = split(keyStr);
            return keys.reduce((result, key, idx, arr) => {
                return hasOwn(result, key);
            }, data);
        },
        set(keyStr, val) {
            let keys = split(keyStr);
            let d = null,
                preKey;
            let oldVal = keys.reduce((result, key, idx, arr) => {
                d = result;
                preKey = key;

                return hasOwn(result, key);
            }, data);

            d[preKey] = val;

            return {
                val: d[preKey],
                oldVal
            };
        }
    };
}

const enter = () => {
    return {
        bind: function (el, options, vnode) {
            let $inp = findEle(el, 'input');
            // 默认
            let filter = options.arg;

            let reg = filterNum(filterNum);

            //可以动态 设置 过滤位数
            Object.defineProperty($inp, 'filterReg', {
                get() {
                    return reg;
                },
                set(val) {
                    filter = val;
                    reg = filterNum(val);
                },
                enumerable: true,
                configurable: true
            });

            el.$inp = $inp;
            // 读写生成器
            let reducer = reducerObj(vnode.context);
            $inp.handle = function () {
                let numberOnly = this.getAttribute('enter');
                if (numberOnly > 0 && filter !== numberOnly) this.filterReg = numberOnly;
                if (this.value.length && !this.filterReg.test(this.value)) {
                    $inp.value = reducer.get(options.expression);
                } else {
                    reducer.set(options.expression, this.value);
                }
                return false;
            };

            $inp.addEventListener('input', $inp.handle);
        },
        // update(...ddd) {
        // },
        unbind: function (el) {
            el.$inp.removeEventListener('input', el.$inp.handle);
        }
    };
};
export default enter;
