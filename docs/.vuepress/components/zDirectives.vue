<!-- @format -->

<template>
  <div>
    <h2>v-outside</h2>
    <div class="flex">
      <span v-outside="{ handler: handleOutsideClick, include: include }" class="outside-box gray-sq" @click="active = true">
        {{ active ? ' true ' : ' false ' }}
      </span>
      <span v-show="active" class="outside-box gray-sq" ref="outside-box">include element</span>
    </div>
    <h2>v-copy</h2>
    <p>绑定到一个元素上,添加一个点击复制功能,将传递的数据复制到剪切板</p>
    <div>
      <input type="text" v-model="text" />
      <button v-copy="text">copy</button>
    </div>
    <h2>v-limit</h2>
    <p>给输入框添加输入限制,支持以下修饰符</p>
    <div>
      <p><code>v-limit.chinese</code> 只能输入中文</p>
      <el-input v-limit.chinese v-model="chinese" placeholder="只能输入中文"></el-input>
      <p><code>v-limit.number</code> 只能输入正整数</p>
      <el-input v-limit.number v-model="positiveInter" placeholder="只能输入正整数"></el-input>
      <p><code>v-limit.letter</code> 只能输入字母</p>
      <input v-limit.letter type="text" />
      <p><code>v-limit.special</code> 只能输入特殊字符</p>
      <input v-limit.special type="text" />
      <p><code>v-limit.float</code> 只能输入数字,包括小数(默认保留两位小数)</p>
      <el-input v-limit.float v-model="float" placeholder="只能输入数字,包括小数 保留两位小数"></el-input>

      <el-input v-limit.float="{ max: 100, min: 5, decimal: 6 }" v-model="floatFixed6" placeholder="最大100,最小5, 保留6位小数"></el-input>
    </div>

    <h2>v-enter</h2>
    <div>
      <p>在聚焦的同时摁下 <code>enter</code> 之后触发绑定的事件</p>
      <input v-enter="enterSuccess" type="text" />
    </div>
    <h2>v-drag</h2>
    <p>拖拽指令,需要将给要拖拽的元素包裹一个父级元素 并且设置父级元素设置相对定位 <code>position:relative</code></p>
    <div class="gray-sq relative">
      <div v-drag class="drag-dom" style="width: 50px; height: 100px; margin: 20px; background-color: aqua"></div>
    </div>
    <h2>v-dialogDrag</h2>
    <p>给<code>el-dialog</code>添加可拖拽的功能</p>

    <el-dialog v-dialogDrag title="添加" :visible.sync="dialogVisible" width="50%">
      <span>这是一个dialog</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-button type="primary" @click="() => (dialogVisible = true)"> open </el-button>
    <h2>v-contextmenu</h2>
    <p>右键菜单指令,可以传入vnode 或者 数组</p>
    <pre style="color: beige">
          // 数组
          {
            menu: [
              {
                label: '菜单1',
                click: () => {
                  console.log('菜单1');
                }
              },
              {
                label: '菜单2',
                click: () => {
                  console.log('菜单2');
                }
              }
            ]
          }
        </pre
    >
    <div style="display: flex">
      <div class="gray-sq relative outside-box" v-contextmenu="menuList">默认 样式 传递数组</div>
      <div class="gray-sq relative outside-box" v-contextmenu="handleContextmenu">自定义vnode</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'zDirectives',
  data() {
    return {
      active: false,
      include: null,
      text: 'copy text',
      dialogVisible: false,
      chinese: '没有什么不同',
      float: null,
      floatFixed6: null,
      positiveInter: null,
      menuList: [
        {
          label: '菜单1',
          click: () => {
            console.log('菜单1');
          }
        },
        {
          label: '菜单2',
          click: () => {
            console.log('菜单2');
          }
        }
      ]
    };
  },
  mounted() {
    this.include = this.$refs['outside-box'];
  },
  methods: {
    handleOutsideClick() {
      this.active = false;
    },
    enterSuccess() {
      this.$message.success('enter success');
    },
    handleContextmenu() {
      const commit = (e) => {
        this.$message.success('click commit');
      };
      return (
        <div class="contextmenu">
          <div key="123" onclick={commit} class="">
            点击
          </div>
          <div>点击1</div>
          <div>点击2</div>
        </div>
      );
    }
  }
};
</script>
<style scoped>
.flex {
  display: flex;
}
.outside-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
}
.contextmenu {
  width: 100px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px #ccc;
  padding: 10px;
}
.contextmenu div {
  padding: 5px 10px;
  color: black;
  border-radius: 4px;
}
.contextmenu div:hover {
  background-color: #2fb650;
  color: #fff;
}

.gray-sq {
  width: 200px;
  height: 200px;
  margin: 10px;
  background-color: #ccc;
}
.drag-dom {
  position: fixed;
}
.relative {
  position: relative;
}
</style>
