(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{328:function(e,l,t){},463:function(e,l,t){"use strict";t(328)},484:function(e,l,t){"use strict";t.r(l);var a={name:"zGridFormDemo",data(){const e=this.$createElement;return{form:{age1:"20"},textModel:!1,rules:{name:[{required:!0,message:"请输入姓名",trigger:"blur"},{min:2,max:5,message:"长度在 2 到 5 个字符",trigger:"blur"}]},formList:[{prop:"name",render:"el-input","label-width":"0",option:{class:"border"},slots:{suffix:()=>e("i",["尾部"]),prepend:()=>"Http:/"},on:{input:e=>{console.log("input",e)},change:e=>{console.log("change",e)}},defaultValue:1},{prop:"check_in",render:"el-time-select",label:"使用el-time-select",class:"border",span:12,option:{"picker-options":{start:"08:30",step:"00:15",end:"10:30"},style:{width:"100%"},placeholder:"选择打卡时间1"}},{prop:"switch",label:"开关",span:12,class:"border",isTag:!1,render:"将isTag设置为false将会被直接渲染"},{prop:"chekbox",label:"使用z-checkbox",render:"z-checkbox",span:8,class:"border",option:{multiple:!0,data:[{label:"18",value:"18",disabled:!0},{label:"19",value:"19"},{label:"20",value:"20"}]},defaultValue:["20"]},{prop:"custom-select",label:"引入自定义组件",render:"zCustomtDemo",class:"border",span:8},{prop:"age",label:"年龄",render:"z-select",span:8,class:"border",option:{data:[19,20,21],placeholder:"请输入年龄"},defaultValue:20},{prop:"age12",label:"年龄1",render:"z-radio",class:"border",option:{data:()=>new Promise(e=>{setTimeout(()=>{e([{label:"18",value:"18",disabled:!0},{label:"19",value:"19"},{label:"20",value:"20"}])},1e3)}),placeholder:"请输入年龄"},defaultValue:"20"}]}},methods:{getData(){console.log(this.$refs.zGridForm,this.form)},checkType(){this.textModel=!this.textModel,console.log(this.form)}}},r=(t(463),t(8)),o=Object(r.a)(a,(function(){var e=this,l=e._self._c;return l("div",[l("el-button",{attrs:{type:"primary",plain:""},on:{click:e.getData}},[e._v(" 获取数据 ")]),e._v(" "),l("el-button",{attrs:{type:"primary",plain:""},on:{click:e.checkType}},[e._v(" 切换模式 ")]),e._v(" "),l("z-grid-form",{ref:"zGridForm",attrs:{rules:e.rules,items:e.formList,"label-width":"140px",textModel:e.textModel},model:{value:e.form,callback:function(l){e.form=l},expression:"form"}})],1)}),[],!1,null,"6ad4fd01",null);l.default=o.exports}}]);