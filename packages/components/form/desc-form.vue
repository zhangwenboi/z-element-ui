<!-- @format -->

<template>
  <el-form :model="form" :rules="rules" ref="elForm" v-bind="formAttrs()">
    <template v-if="isDynamic">
      <el-descriptions ref="ElDescriptions" v-bind="descriptionAttrs()" :border="border" :title="title" v-for="(row, rowIndex) in dynamicData" :key="row.__uuid__">
        <slot name="title" slot="title" v-bind="{ row, rowIndex }"></slot>
        <slot name="extra" slot="extra" v-bind="{ row, rowIndex }"></slot>
        <slot name="prepend" v-bind="{ row, rowIndex }"></slot>
        <template v-for="(item, colIndex) in items">
          <el-descriptions-item v-if="getVif(item, colIndex, row, rowIndex)" v-bind="descriptionItemAttrs(item)" label="" :key="item.prop">
            <render-component v-if="item.label" :render="item.label" slot="label" />
            <form-item v-show="getVshow(item, colIndex, row, rowIndex)" label="" label-width="0px" v-bind="getFormItemAttrs(item, colIndex, row, rowIndex)" />
          </el-descriptions-item>
        </template>
        <slot name="append" v-bind="{ row, rowIndex }"></slot>
      </el-descriptions>
    </template>
    <template v-else>
      <el-descriptions ref="ElDescriptions" v-bind="descriptionAttrs()" :border="border" :title="title">
        <slot name="title" slot="title"></slot>
        <slot name="extra" slot="extra"></slot>
        <slot name="prepend"></slot>
        <template v-for="(item, colIndex) in items">
          <el-descriptions-item v-if="getVif(item, colIndex)" v-bind="descriptionItemAttrs(item)" :key="item.prop">
            <template slot="label">
              <render-component v-if="item.label" :render="item.label" :class="item.required && 'required'" />
            </template>
            <form-item v-show="getVshow(item, colIndex)" label="" label-width="0px" v-bind="getFormItemAttrs(item, colIndex)" />
          </el-descriptions-item>
        </template>
        <slot name="append"></slot>
      </el-descriptions>
    </template>
  </el-form>
</template>
<script>
import formMixin from './formMixin';
import { getProps } from '../../utils/utils';
export default {
  name: 'descriptionForm',
  mixins: [formMixin],
  props: {
    border: {
      typoe: Boolean,
      default: true
    },
    title: {
      type: [String, Function]
    }
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this.items, this.$attrs, this.$props);
  },
  methods: {
    descriptionItemAttrs(e) {
      return getProps('descriptionItem', e);
    },
    descriptionAttrs() {
      return getProps('description', this.$attrs);
    }
  }
};
</script>
<style scoped>
::v-deep.el-form-item {
  margin-bottom: 0px;
}
.required::after {
  content: '*';
  color: #f56c6c;
  margin-left: 4px;
}
::v-deep.el-form-item__content {
  line-height: inherit;
  font-size: inherit;
}
</style>
