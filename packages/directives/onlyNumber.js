const onlyNumber = () => {
    return {
        inserted(el, binding, vNode) {
            const node = vNode,
                defaultValue = { max: 9999999999.99, min: 0, decimal: 0 };
            binding.value = { ...defaultValue, ...binding.value };
            let content, setValue, recursion;
            recursion = (els, num, val) => {
                let stop = num === binding.value.model.length;
                num++;
                stop && (els[binding.value.model[num - 1]] = val);
                return (!stop && recursion(els[binding.value.model[num - 1]], num, val)) || false;
            };
            setValue = val => {
                recursion(node.context, 0, val);
            };
            //按键按下=>只允许输入 数字/小数点
            el.addEventListener('keypress', event => {
                const e = event || window.event,
                    inputKey = String.fromCharCode(typeof e.charCode === 'number' ? e.charCode : e.keyCode);
                content = e.target.value;
                //定义方法,阻止输入 (1非指定键， 2.已存在小数点， 3.输入小数点，且位数为0，4。输入值大于最大值)
                if (
                    (!/\d|\./.test(inputKey) && !e.ctrlKey) ||
					(content.indexOf('.') > 0 && inputKey === '.') ||
					(inputKey === '.' && binding.value.decimal === 0) ||
					e.target.value > binding.value.max
                ) {
                    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                }
            });
            // 按键弹起=>并限制最大最小
            el.addEventListener('keyup', event => {
                const e = event || window.event;
                content = (!content && 0.0) || parseFloat(e.target.value);
                let argMax = parseFloat(binding.value.max),
                    argMin = parseFloat(binding.value.min);
                if (content > argMax) {
                    setValue(argMax);
                    content = argMax;
                }
                // if (content < argMin) {
                //     setValue(argMin);
                //     content = argMin;
                // }
            });
            //失去焦点=>保留指定位小数
            el.addEventListener('focus', event => {
                const e = event || window.event;
                if (!isNaN(Number(e.target.value)) && Number(e.target.value) !== 0) {
                    content = (!content && 0.0) || parseFloat(e.target.value || 0);
                    setValue(content.toFixed(parseFloat(binding.value.decimal)));
                } else if (!isNaN(parseFloat(e.target.value))) {
                    setValue(parseFloat(e.target.value));
                } else {
                    setValue('');
                }
            });
        }
    };
};
export default onlyNumber;
