(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{480:function(e,t,r){"use strict";r.r(t);var o={name:"zDescFormDemo",data(){const e=this.$createElement;return{form:{check_in:"9:30"},formList:[{prop:"age",label:"年龄",required:!0,render:({vmodel:t})=>e("el-input",{attrs:{placeholder:"请输入年龄"},model:{value:t.age,callback:e=>{this.$set(t,"age",e)}}})},{prop:"check_in",render:"el-time-select",label:"使用el-time-select",option:{"picker-options":{start:"08:30",step:"00:15",end:"10:30"},style:{width:"100%"}}},{prop:"number",label:"数字"},{prop:"name",label:"姓名"}]}},methods:{getFormData(){console.log(this.form)}}},n=r(8),l=Object(n.a)(o,(function(){var e=this,t=e._self._c;return t("div",[t("z-desc-form",{ref:"descForm",attrs:{items:e.formList,column:2},scopedSlots:e._u([{key:"title",fn:function(){return[e._v(" Description ")]},proxy:!0},{key:"append",fn:function(){return[t("el-descriptions-item",{attrs:{label:"操作"}},[t("el-button",{attrs:{type:"primary",plain:""},on:{click:e.getFormData}},[e._v(" submit ")])],1)]},proxy:!0}]),model:{value:e.form,callback:function(t){e.form=t},expression:"form"}})],1)}),[],!1,null,"efc0b544",null);t.default=l.exports}}]);