<!-- @format -->

<template>
  <el-form :model="form" :rules="rules" ref="elForm" v-bind="formAttrs()">
    <template v-if="isDynamic">
      <el-row v-bind="rowAttrs()" ref="elRow" v-for="(row, rowIndex) in dynamicData" :key="row.__uuid__">
        <slot name="prepend" v-bind="{ row, rowIndex }"></slot>
        <el-col v-for="(item, index) in items" :key="item.prop + row.__uuid__" v-bind="colAttrs(item)">
          <z-form-item v-bind="getFormItemAttrs(item, index, row, rowIndex)" />
        </el-col>
        <slot name="append" v-bind="{ row, rowIndex }"></slot>
      </el-row>
    </template>
    <template v-else>
      <el-row v-bind="rowAttrs()" ref="elRow">
        <slot name="prepend"></slot>
        <el-col v-for="(item, index) in items" :key="item.prop" v-bind="colAttrs(item)">
          <z-form-item v-bind="getFormItemAttrs(item, index)" />
        </el-col>
        <slot name="append"></slot>
      </el-row>
    </template>
  </el-form>
</template>
<script>
import { row, col } from '../../utils/attrs';
import formMixin from './formMixin';
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
export default {
  name: 'zGridFormDemo',
  data() {
    return {
      resizeLayoutProps: null
    };
  },
  mixins: [formMixin],
  props: {
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
      let width = this.findRef(this, 'elRow').$el.clientWidth;
      if (!this.responsive || width == 0) return;
      this.resizeLayoutProps = this.responsiveMethod(width);
      this.$emit('resize', width);
    },
    rowAttrs() {
      return this.getIncludeAttrs(row, this.$props);
    },
    colAttrs(e) {
      return this.getIncludeAttrs(col, { ...this.resizeLayoutProps, ...e });
    }
  }
};
</script>
<style scoped></style>
