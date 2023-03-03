<!-- @format -->

<template>
  <el-form :model="form" :rules="rules" ref="elForm" v-bind="formAttrs">
    <el-row v-bind="rowAttrs" ref="elRow">
      <el-col v-for="(item, index) in items" :key="item.prop" v-bind="colAttrs(item)">
        <z-form-item
          :prop="item.prop"
          :label="item.label"
          :render="item.render"
          :option="item.option"
          :defaultValue="item.defaultValue"
          :form="form"
          :isTag="item.isTag"
          :on="item.on"
          :slots="item.slots"
          v-bind="formItemAttrs(item)"
        />
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { getIncludeAttrs, findRef } from '../../utils/utils';
import { row, col, form as formAttr, formItem } from '../../utils/attrs';
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
export default {
  name: 'zGridFormDemo',
  data() {
    return {
      resizeLayoutProps: null
    };
  },
  props: {
    form: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    items: {
      type: Array,
      default: () => []
    },
    gutter: {
      type: Number,
      default: 20
    },
    responsive: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    },
    align: {
      type: String
    },
    justify: {
      type: String
    },
    type: {
      type: String
    },
    responsiveMethod: {
      type: Function,
      default: (width) => {
        let span = 24;
        if (width >= 500 && width < 900) span = 12;
        if (width >= 900 && width < 1200) span = 8;
        if (width >= 1200 && width < 1600) span = 6;
        if (width >= 1600) span = 4;
        return { span };
      }
    }
  },
  computed: {
    formAttrs() {
      return getIncludeAttrs(formAttr, { ...this.$props, ...this.$attrs });
    },
    formItemAttrs() {
      return (e) => {
        return getIncludeAttrs(formItem, e);
      };
    },
    rowAttrs() {
      return getIncludeAttrs(row, this.$props);
    },
    colAttrs() {
      return (e) => {
        return getIncludeAttrs(col, { ...this.resizeLayoutProps, ...e });
      };
    }
  },
  mounted() {
    if (this.responsive) {
      addResizeListener(this.$el, this.resize);
    }
  },
  beforeDestroy() {
    removeResizeListener(this.$el, this.resize);
  },
  methods: {
    resize() {
      let width = findRef(this, 'elRow').$el.clientWidth;
      if (!this.responsive || width == 0) return;
      this.resizeLayoutProps = this.responsiveMethod(width);
      this.$emit('resize', width);
    }
  }
};
</script>
<style scoped></style>
