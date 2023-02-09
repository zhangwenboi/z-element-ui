<!-- @format -->

<template>
  <div>
    <item-select v-model="name" :list="['1', '3', '4']">
      <template #option="scope">
        <compon :render="idom2" v-bind="scope"> </compon>
      </template>
    </item-select>
  </div>
</template>

<script lang="jsx">
import { h } from 'vue';
import renderComponent from './render-component.vue';
import itemSelect from './form-item/items/select.vue';
import compon from './compon';
export default {
  name: 'zSwitch',
  components: { renderComponent, itemSelect, compon },
  props: {},
  data() {
    return {
      name: ''
    };
  },
  methods: {
    idom: () => {
      const style = {
        color: 'red'
      };
      return <i style={style}>123</i>;
    },
    idom2: ({ option, index }) => {
      const label = option.label;

      return (
        <span>
          <span style="float: left">{label}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{option.value}</span>
        </span>
      );
    }
  }
};
</script>
