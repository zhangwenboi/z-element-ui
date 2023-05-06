<!-- @format -->

<template>
  <div>
    <h2>v-outside</h2>
    <div class="flex">
      <span v-outside="{ handler: handleOutsideClick, include: include }" class="outside-box" @click="active = true">
        {{ active ? ' true ' : ' false ' }}
      </span>
      <span v-show="active" class="outside-box" ref="outside-box">include element</span>
    </div>
    <h2>v-copy</h2>
    <div>
      <input type="text" v-model="text" />
      <button v-copy="text">copy</button>
    </div>
    <h2>v-limit</h2>
    <div>
      <p><code>v-limit.chinese</code> 只能输入中文</p>
      <input v-limit.chinese type="text" />
      <p><code>v-limit.number</code> 只能输入数字</p>
      <input v-limit.number type="text" />
      <p><code>v-limit.letter</code> 只能输入字母</p>
      <input v-limit.letter type="text" />
      <p><code>v-limit.special</code> 只能输入特殊字符</p>
      <input v-limit.special type="text" />
    </div>
    <h2>v-enter</h2>
    <div>
      <p>在聚焦的同时摁下 <code>enter</code> 之后触发绑定的事件</p>
      <input v-enter="enterSuccess" type="text" />
    </div>
    <h2>v-drag</h2>
    <div class="outside-box">
      <span v-drag>drag me</span>
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
      text: 'copy text'
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
    }
  }
};
</script>
<style scoped>
.flex {
  display: flex;
}
.outside-box {
  width: 200px;
  height: 200px;
  margin: 10px;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
}
</style>
