<!-- @format -->

<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'KicTheme',
  props: {
    data: {
      type: Array,
      default: () => [
        {
          primary: '#409eff',
          success: '#67c23a',
          info: '#909399',
          warning: '#e6a23c',
          danger: '#f56c6c'
        }
      ]
    },
    active: { type: Number, default: 0 }
  },
  watch: {
    active(val) {
      this.toggleTheme(val);
    }
  },
  methods: {
    toggleTheme(index) {
      const data = this.data[index];
      for (let key in data) {
        const transList = [100, 95, 90, 85, 80, 50, 40, 20, 10];
        transList.forEach((e) => {
          const name = `--color-${key}${e === 100 ? '' : '-' + e}`;
          document.body.style.setProperty(name, this.mix(data[key], e));
        });
      }
    },
    hexify(color) {
      let values = color
        .replace(/rgba?\(/, '')
        .replace(/\)/, '')
        .replace(/[\s+]/g, '')
        .split(',');
      let a = parseFloat(values[3] || 1),
        r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
        g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
        b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
      return '#' + ('0' + r.toString(16)).slice(-2) + ('0' + g.toString(16)).slice(-2) + ('0' + b.toString(16)).slice(-2);
    },
    mix(color1, weight = 100) {
      let color = 'rgb(';
      for (let i = 1; i <= 5; i += 2) {
        color += parseInt(color1.substr(i, 2), 16) + ',';
      }
      const rgbaVal = color + weight / 100 + ')';
      return this.hexify(rgbaVal);
    }
  }
};
</script>
