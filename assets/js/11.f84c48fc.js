(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{331:function(e,t,l){},469:function(e,t,l){"use strict";l(331)},495:function(e,t,l){"use strict";l.r(t);var r={name:"zTextModelFormDemo",data(){const e=this.$createElement;return{form:{check_in:"9:30"},textModel:!1,rules:{name:[{required:!0,message:"请输入姓名",trigger:"blur"},{min:2,max:5,message:"长度在 2 到 5 个字符",trigger:"blur"}]},formList:[{prop:"age",label:"年龄",render:({vmodel:t})=>(console.log(t,this.form),e("el-input",{attrs:{placeholder:"请输入年龄"},model:{value:t.age,callback:e=>{this.$set(t,"age",e)}}})),format:({value:t})=>e("div",{style:{fontWeight:600}},["年龄是 ",e("span",{class:"text-red"},[t])," ,而且我使用了jsx"]),class:"border"},{prop:"check_in",render:"el-time-select",label:"使用el-time-select",class:"border",span:12,format:({value:e})=>"现在的时间是"+e,option:{"picker-options":{start:"08:30",step:"00:15",end:"10:30"},class:"text-red",style:{width:"100%"},placeholder:"选择打卡时间1"}}]}},methods:{checkType(){this.textModel=!this.textModel}}},s=(l(469),l(8)),o=Object(s.a)(r,(function(){var e=this,t=e._self._c;return t("div",[t("el-button",{staticStyle:{"margin-bottom":"20px"},attrs:{type:"success",plain:""},on:{click:e.checkType}},[e._v(" 切换模式 ")]),e._v(" "),t("z-grid-form",{ref:"zTextModelForm",attrs:{rules:e.rules,items:e.formList,"label-width":"140px",textModel:e.textModel},model:{value:e.form,callback:function(t){e.form=t},expression:"form"}})],1)}),[],!1,null,"4157fc1c",null);t.default=o.exports}}]);