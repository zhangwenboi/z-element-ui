<!-- @format -->

<template>
  <el-select v-model="Value" class="z-select" v-loading="optionsLoading" v-bind="$attrs" v-on="funcs"
    :placeholder="$attrs.placeholder || '请选择'">
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <template #empty>
      <slot name="empty"></slot>
    </template>
    <template #default>
      <slot>
        <div class="z-filter-item" v-if="filter">
          <el-input v-model="filterText" placeholder="输入关键字进行过滤" size="mini" clearable></el-input>
        </div>
        <el-option class="z-empty-option" v-if="filter && filterOptions?.length == 0" :label="filterEmptyText"
          :value="filterEmptyText" disabled>
        </el-option>
        <template v-if="isGroup">
          <el-option-group v-for="group in filterOptions" :key="group.label" v-bind="filterAttr(group, 'group')">
            <el-option v-for="(option, index) of group.data || []" :key="option.value"
              v-bind="filterAttr(option, 'option')">
              <slot name="option" :option="option" :index="index" :group="group"></slot>
            </el-option>
          </el-option-group>
        </template>
        <template v-else>
          <el-option v-for="(option, index) of filterOptions" :key="option.value" v-bind="filterAttr(option, 'option')">
            <!-- 在slot上绑定参数，在函数形式渲染的时候就会将这些当作参数传入函数。例如下面的方式就会被(e)=>{return(<div> 123 </div>)} e接受-->
            <slot name="option" :option="option" :index="index"></slot>
          </el-option>
        </template>
      </slot>
    </template>
  </el-select>
</template>

<script>
import optionMixin from './optionsMinxin';
import { getProp, getIncludeAttrs } from '../../../utils/utils';

const optionPropsKeys = ['value', 'label', 'disabled', 'style', 'class'];
const groupPropsKeys = ['label', 'disabled', 'style', 'class'];
export default {
  name: 'zSelect',
  mixins: [optionMixin],
  components: {},
  props: {
    value: { type: [Array, Number, String], default: '' },
    filter: Boolean,
    loadingText: {
      type: String,
      default: '加载中...'
    },
    noDataText: {
      type: String,
      default: '无数据'
    },
    noMatchText: {
      type: String,
      default: '无匹配数据'
    }
  },
  data() {
    return { filterText: '' };
  },
  watch: {
    watch() {
      if (!this.$attrs.remote) {
        this.$nextTick(this.setSelected);
      }
    }
  },
  computed: {
    isGroup() {
      return this.proxyOptions.some((v) => {
        return Array.isArray(v?.data) && v.data?.length > 0;
      });
    },
    filterOptions() {
      let value = this.filterText.trim();
      return value == '' ? this.proxyOptions : this.handleFilterNode(JSON.parse(JSON.stringify(this.proxyOptions)), value);
    },
    filterEmptyText() {
      if (this.proxyOptions.length == 0) {
        return this.noDataText;
      } else if (this.filterOptions.length == 0) {
        return this.noMatchText;
      } else {
        return '';
      }
    },
    funcs() {
      let funcitonList = {};
      for (const key in this.$attrs) {
        if (
          Object.hasOwnProperty.call(this.$attrs, key) &&
          typeof this.$attrs[key] === 'function'
        ) {
          funcitonList[key] = this.$attrs[key];
        }
      }
      return funcitonList;
    }
  },
  methods: {
    filterAttr(attrs, type) {
      return getIncludeAttrs(type == 'option' ? optionPropsKeys : groupPropsKeys, attrs);
    },
    handleFilterNode(options = [], value) {
      return options.filter((data) => {
        if (value === '') return true;
        let isMatching = String(data.label).indexOf(value) !== -1;
        if (!isMatching && this.isGroup && data.data.length > 0) {
          data.data = this.handleFilterNode(data.data, value);
          return data.data.length > 0;
        }
        return isMatching;
      });
    }
  }
};
</script>

<style>
.z-select .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
}

.z-select .el-loading-mask .el-loading-spinner {
  top: 0px;
  margin-top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.z-select .circular {
  width: 16px !important;
  height: 16px !important;
}

.z-filter-item {
  padding: 0px 10px;
  margin-bottom: 10px;
}

.z-empty-option {
  text-align: center;
}
</style>
