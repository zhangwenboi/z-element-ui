<!-- @format -->

<template>
  <el-form :model="form" :rules="rules" ref="elForm" v-bind="formAttrs">
    <template v-if="isDynamic">
      <el-descriptions
        ref="ElDescriptions"
        v-bind="$attrs"
        :value="undefined"
        :border="border"
        v-for="(row, rowIndex) in dynamicData"
        :key="row.__uuid__"
      >
        <slot name="title" slot="title" v-bind="{ row, rowIndex }"></slot>
        <slot name="extra" slot="extra" v-bind="{ row, rowIndex }"></slot>
        <slot name="prepend" v-bind="{ row, rowIndex }"></slot>
        <el-descriptions-item
          v-for="(item, colIndex) in items"
          v-if="getVif({ item, colIndex, row, rowIndex })"
          v-bind="getLayoutItemAttrs(item)"
          label=""
          :key="item.prop"
        >
          <render-component
            v-if="item.label"
            :render="item.label"
            :class="getRequiredAsteriskClass(item, rowIndex)"
            slot="label"
          />
          <z-form-item
            v-show="getVshow({ item, colIndex, row, rowIndex })"
            label=""
            label-width="0px"
            v-bind="getFormItemAttrs({ item, colIndex, row, rowIndex })"
            :component="getComponentAttrs({ item, colIndex, row, rowIndex })"
          />
        </el-descriptions-item>
        <slot name="append" v-bind="{ row, rowIndex }"></slot>
      </el-descriptions>
    </template>
    <template v-else>
      <el-descriptions
        ref="ElDescriptions"
        v-bind="$attrs"
        :value="undefined"
        :border="border"
      >
        <slot name="title" slot="title"></slot>
        <slot name="extra" slot="extra"></slot>
        <slot name="prepend"></slot>
        <el-descriptions-item
          v-for="(item, colIndex) in items"
          v-if="getVif({ item, colIndex, row, rowIndex })"
          v-bind="getLayoutItemAttrs(item)"
          label=""
          :key="item.prop"
        >
          <render-component
            v-if="item.label"
            :render="item.label"
            :class="getRequiredAsteriskClass(item, rowIndex)"
            slot="label"
          />
          <z-form-item
            v-show="getVshow({ item, colIndex, row, rowIndex })"
            label=""
            label-width="0px"
            v-bind="getFormItemAttrs({ item, colIndex, row, rowIndex })"
            :component="getComponentAttrs({ item, colIndex, row, rowIndex })"
          />
        </el-descriptions-item>
        <slot name="append"></slot>
      </el-descriptions>
    </template>
  </el-form>
</template>
<script>
import formMixin from './formMixin';
import renderComponent from '../render-component';
import zFormItem from '../form-item';
export default {
  name: 'zDescFormDemo',
  mixins: [formMixin],
  comments: {
    renderComponent,
    zFormItem
  },
  props: {
    border: {
      typoe: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  }
};
</script>
<style scoped></style>
