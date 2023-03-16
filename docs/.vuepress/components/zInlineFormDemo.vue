<!-- @format -->

<template>
  <z-inline-form class="m-20" v-model="form" :items="formList" ref="zInlineForm" :inline="true" label-width="140px" size="mini">
    <template #prepend>
      <div class="m-20">
        <span style="font-size: large; font-weight: 600"> Inline Form </span>
      </div>
    </template>
  </z-inline-form>
</template>
<script>
export default {
  name: 'zInlineFormDemo',
  data() {
    return {
      form: { check_in: '9:30' },
      formList: [
        {
          prop: 'age',
          label: '年龄',
          required: true
        },
        {
          prop: 'check_in',
          render: 'el-time-select',
          label: '使用el-time-select',
          option: {
            'picker-options': {
              start: '08:30',
              step: '00:15',
              end: '10:30'
            },
            style: { width: '100%' }
          }
        },
        {
          prop: 'number',
          label: '数字'
        },
        {
          prop: 'name',
          label: '姓名'
        }
      ]
    };
  }
};
</script>
<style scoped></style>
