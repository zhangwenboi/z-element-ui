const timeInterval = val => {
    const timeDiffVal = new Date().valueOf() - new Date(val).valueOf();
    const timeDiff = Math.abs(timeDiffVal) / 1000;
    const time = [
        { time: 3600 * 24 * 365, unit: '年' },
        { time: 3600 * 24 * 30, unit: '月' },
        { time: 3600 * 24, unit: '天' },
        { time: 3600, unit: '小时' },
        { time: 60, unit: '分钟' },
        { time: 1, unit: '秒' }
    ];
    for (let i = 0; i < time.length; i++) {
        if (timeDiff > time[i].time) {
            return Math.floor(timeDiff / time[i].time) + time[i].unit + (timeDiffVal > 0 ? '前' : '后');
        }
    }
};
// 手机中间四位加****
const encryptionPhone = val => {
    val = String(val);
    return val.replace(val.substr(3, 4), '****');
};
// 货币三位分隔
const moneyFormat = (money, isInt = true) => {
    const float = isInt ? '' : '.00';
    if (money) {
        money = String(money);
        let left = money.split('.')[0],
            right = money.split('.')[1],
            temp;
        right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + 0) : float;
        temp = left
            .split('')
            .reverse()
            .join('')
            .match(/(\d{1,3})/g);
        return (Number(money) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
    } else if (money === 0) {
        return '0' + float;
    }
    return '';
};
// 数值0-9，添加'0'+value
const addZero = val => {
    return val < 10 ? '0' + val : val;
};

// 时间戳和中国标准时间 => 格式化时间的具体年月日时分秒
const timeLongToString = value => {
    const date = new Date();
    if (value) {
        date.setTime(value);
    }
    let year = date.getFullYear(),
        month = addZero(date.getMonth() + 1),
        day = addZero(date.getDate()),
        hour = addZero(date.getHours()),
        minute = addZero(date.getMinutes()),
        second = addZero(date.getSeconds()),
        weekend = date.getDay();
    return {
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        second: second,
        weekend: weekend
    };
};
//中国标准时间和格式化时间 => 时间戳
const timeStringToLong = date => {
    let timestamp = Date.parse(date);
    return timestamp;
};
// 时间戳和中国标准时间 => 格式化时间
const timeFormat = (value, type = 'yyMMdd hhMMss', separator = '-') => {
    if (!value) {
        return '';
    }
    let timeJson = timeLongToString(value),
        dateTime = '',
        year = timeJson.year,
        month = timeJson.month,
        day = timeJson.day,
        hour = timeJson.hour,
        minute = timeJson.minute,
        second = timeJson.second;
    switch (type) {
    case 'yy':
        dateTime = year;
        break;
    case 'yyMM':
        dateTime = year + separator + month;
        break;
    case 'yyMMdd':
        dateTime = year + separator + month + separator + day;
        break;
    case 'yyMMdd hhMMss':
        dateTime = year + separator + month + separator + day + ' ' + hour + ':' + minute + ':' + second;
        break;
    case 'yyMMdd hhMM':
        dateTime = year + separator + month + separator + day + ' ' + hour + ':' + minute;
        break;
    case 'MMdd hhMM':
        dateTime = month + separator + day + ' ' + hour + ':' + minute;
        break;
    case 'hhMMss':
        dateTime = hour + ':' + minute + ':' + second;
        break;
    case 'hhMM':
        dateTime = hour + ':' + minute;
        break;
    }
    return dateTime;
};
const filters = { encryptionPhone, timeInterval, moneyFormat, addZero, timeStringToLong, timeFormat };
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
    // 判断是否安装
    if (install.installed) return;
    // 遍历注册全局组件
    Object.keys(filters).forEach(e => {
        Vue.filter(e, filters[e]);
    });
};
// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
    install
};
