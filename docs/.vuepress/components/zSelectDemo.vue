<template>
  <div>
    <h3>正常</h3>
    <z-select v-model="select" :data="option"></z-select>
    <H3>分组</H3>
    <z-select v-model="select1" :data="groupOption"></z-select>
    <h3>插槽</h3>
    <z-select v-model="select2" :data="option" multiple collapse-tags>
      <template #option="scope">
        <span class="text-red">想不到吧,我还能用插槽</span> {{ scope.option.label }}
      </template>
    </z-select>
    <h3>过滤</h3>
    <z-select :loading="loading" v-model="select3" :data="option" filterable></z-select>
    <h3>远程过滤</h3>
    <z-select :loading="loading" v-model="select3" :data="option" filterable :remote-method="remoteMethod"
      remote></z-select>
    <h3>懒加载</h3>
    <z-select v-model="select4" :data="lazeOption">
      <template #option="scope">
        <span class="text-red">想不到吧,我还能用插槽</span> {{ scope.option.label }}
      </template>
    </z-select>
    <h3>过滤</h3>
    <z-select :loading="loading" v-model="select2" :data="option" filterable multiple allow-create></z-select>
  </div>
</template>

<script>
export default {
  name: 'zSelectDemo',
  data() {
    return {
      loading: false,
      select: '北京',
      select1: '北京2',
      select2: ['上海', '北京'],
      select3: '北京',
      select4: '北京',
      option: [
        {
          label: '上海',
          value: '上海'
        },
        {
          label: '北京',
          value: '北京'
        },
        {
          label: '上海1',
          value: '上海1'
        }
      ],
      groupOption: [
        {
          label: '第一组',
          data: [
            {
              label: '上海1',
              value: '上海1'
            },
            {
              label: '北京2',
              value: '北京2'
            }
          ]
        },
        {
          label: '第二组',
          data: [
            {
              label: '上海2',
              value: '上海2'
            },
            {
              label: '北京1',
              value: '北京1'
            }
          ]
        }
      ],
      lazeOption: () => {
        return new Promise((resolve, reject) => {
          const options = [
            {
              label: '上海2',
              value: '上海2'
            },

          ]
          setTimeout(() => {
            resolve(options)
          }, 3000)
        })
      }
    }
  },
  methods: {
    async remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        this.option = await this.createFilter(query)
      } else {
        this.option = this.option
      }
      this.loading = false
    },
    createFilter(query) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            {
              label: '上海2',
              value: '上海2'
            },
            {
              label: '北京1',
              value: '北京1'
            }
          ])
        }, 2000)
      })

    }
  }
}
</script>