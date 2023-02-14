<!-- @format -->

<template>
  <div>
    <slot>
      <el-color-picker
        :predefine="['#F5222D', '#FA541C', '#FADB14', '#3EAF7C', '#13C2C2', '#1890FF', '#722ED1', '#EB2F96']"
        class="theme-picker"
        popper-class="theme-picker-dropdown"
        @change="changeColor"
      />
    </slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chalk: localStorage.getItem('THEME_CHALK') || '', // content of theme-chalk css
      originalColorObj: JSON.parse(localStorage.getItem('ORIGIN_COLORS')) || {
        primary: '#409EFF',
        success: '#67C23A',
        info: '#909399',
        warning: '#E6A23C',
        danger: '#F56C6C'
      }
    };
  },
  props: {
    //多颜色配置
    color: {
      type: [Object, String]
    },
    //主题请求地址
    url: {
      type: String,
      default: 'https://unpkg.com/element-ui@2.15.13/lib/theme-chalk/index.css'
    },
    //是否开启主题缓存
    caches: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    color: {
      handler(val) {
        this.changeTheme(typeof val === 'string' ? { ...this.originalColorObj, primary: val } : val);
      },
      immediate: true
    }
  },
  methods: {
    //根据选择改变primary颜色
    changeColor(primary) {
      console.log(this.originalColorObj, primary);
      this.changeTheme({ ...this.originalColorObj, primary });
    },
    //改变所有的颜色
    async changeTheme(colorValue) {
      console.log('🚀 ~ colorValue', colorValue);

      const originalObject = this.originalColorObj;
      const getColorList = (color) => {
        const colorList = [];
        const colorCluster = this.getThemeCluster(color.replace('#', ''));
        colorCluster.forEach((color) => {
          colorList.push(color);
        });
        return colorList;
      };
      const processColorList = (object) => {
        return ['primary', 'success', 'info', 'warning', 'danger'].flatMap((type) => getColorList(object[type]));
      };

      if (!this.chalk) {
        await this.getCSSString(this.url, 'chalk');
      }
      const originColorList = processColorList(originalObject);
      const newColorList = processColorList(colorValue);
      console.log('🚀 ~ originColorList, newColorList', this.originalColorObj, colorValue);
      this.setColors(this.chalk, colorValue, originColorList, newColorList);
    },
    setColors(style, colorValue, originColorList, newColorList) {
      const newStyle = this.updateStyle(style, originColorList, newColorList);
      this.setStyle(newStyle);
      this.chalk = newStyle;
      this.caches && this.setCaches(newStyle, colorValue);
      this.$nextTick(() => {
        this.originalColorObj = colorValue;
      });
    },
    setCaches(newStyle, originColors) {
      localStorage.setItem('THEME_CHALK', newStyle);
      localStorage.setItem('ORIGIN_COLORS', JSON.stringify(originColors));
    },
    //创建style标签 将最新属性写入
    setStyle(newStyle) {
      let styleTag = document.getElementById('chalk-style');
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.setAttribute('id', 'chalk-style');
        document.head.appendChild(styleTag);
      }
      styleTag.innerText = newStyle;
    },
    //更新style
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style;
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]);
      });
      return newStyle;
    },
    getCSSString(url, variable) {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '');
            resolve();
          }
        };
        xhr.open('GET', url);
        xhr.send();
      });
    },
    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        if (tint === 0) {
          return [red, green, blue].join(',');
        } else {
          red += Math.round(tint * (255 - red));
          green += Math.round(tint * (255 - green));
          blue += Math.round(tint * (255 - blue));
          red = red.toString(16);
          green = green.toString(16);
          blue = blue.toString(16);
          return `#${red}${green}${blue}`;
        }
      };

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);
        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);

        return `#${red}${green}${blue}`;
      };
      const clusters = [theme];
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
      }
      clusters.push(shadeColor(theme, 0.1));
      return clusters;
    }
  }
};
</script>

<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
