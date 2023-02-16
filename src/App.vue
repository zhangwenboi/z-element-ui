<!-- @format -->

<template>
  <div id="app">
    <main>
      <zForm />
      <z-theme :url="'/variables-min.css'" :color="{ primary: '#687877', success: '#FA541C', info: '#1890FF', warning: '#722ED1', danger: '#EB2F96' }"> </z-theme>
      <zEditTable :form="form"></zEditTable>
      <div class="btn-chalk"></div>
      <el-row>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </el-row>

      <el-row>
        <el-button plain>朴素按钮</el-button>
        <el-button type="primary" plain>主要按钮</el-button>
        <el-button type="success" plain>成功按钮</el-button>
        <el-button type="info" plain>信息按钮</el-button>
        <el-button type="warning" plain>警告按钮</el-button>
        <el-button type="danger" plain>危险按钮</el-button>
      </el-row>

      <el-row>
        <el-button round>圆角按钮</el-button>
        <el-button type="primary" round>主要按钮</el-button>
        <el-button type="success" round>成功按钮</el-button>
        <el-button type="info" round>信息按钮</el-button>
        <el-button type="warning" round>警告按钮</el-button>
        <el-button type="danger" round>危险按钮</el-button>
      </el-row>

      <el-row>
        <el-button icon="el-icon-search" circle></el-button>
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="success" icon="el-icon-check" circle></el-button>
        <el-button type="info" icon="el-icon-message" circle></el-button>
        <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-row>
    </main>
  </div>
</template>

<script>
import zForm from '../packages/components/form/index.vue';

export default {
  name: 'App',
  components: {
    zForm
  },
  data() {
    const randomTableColumn = () => {
      return new Array(300).fill(0).map((e, i) => ({ prop: `name${i}`, label: `第${i}列` }));
    };
    const randomTableData = () => {
      return new Array(20).fill(0).map((item, index) => {
        const obj = {};
        for (let i = 0; i <= 300; i++) {
          obj[`name${i}`] = `第${i}列 ， 第${item}行`;
        }
        return obj;
      });
    };
    const randomItems = () => {
      return new Array(300).fill(0).map((e, i) => {
        return {
          prop: `name${i}`,
          type: 'input',
          option: {
            placeholder: '请输入'
          }
        };
      });
    };
    return {
      form: {
        tableData:
          randomTableData() ||
          new Array(20).fill(0).map((item, index) => {
            return {
              date: `2016-05-02`,
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
              _view_: false
            };
          }),
        tableColumn: randomTableColumn() || [
          { prop: 'date', label: '测试1' },
          { prop: 'name', label: '测试2' },
          { prop: 'address', label: '测试3' }
        ],
        rules: {
          name: [{ required: true, message: '请输入名称', trigger: 'change' }]
        },
        items: randomItems() || [
          {
            prop: 'date',
            type: 'input',
            option: {
              placeholder: '请输入'
            }
          },
          {
            prop: 'name',
            type: 'select',
            require: true,
            option: {
              placeholder: '请输入',
              clearable: true,
              list: new Promise((resolve) => {
                setTimeout(() => {
                  resolve([
                    {
                      label: '上海',
                      value: '上海'
                    },
                    {
                      label: '北京',
                      value: '北京'
                    }
                  ]);
                }, 20000);
              })
            }
          },
          {
            prop: 'address',
            type: 'select',
            option: {
              placeholder: '请输入',
              clearable: true,
              filter: true,
              multiple: true,
              multipleLimit: 1,
              list: [
                {
                  label: 'da',
                  list: [
                    {
                      label: '上海',
                      value: '上海'
                    },
                    {
                      label: '北京',
                      value: '北京'
                    }
                  ]
                },
                {
                  label: '北京',
                  list: [
                    {
                      label: '上海',
                      value: '上海'
                    },
                    {
                      label: '北京',
                      value: '北京'
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    };
  }
};
</script>
<style>
.btn-chalk {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  background-color: var(--color-primary-50);
}
</style>
