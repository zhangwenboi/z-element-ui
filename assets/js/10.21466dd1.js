(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{330:function(e,t,a){},468:function(e,t,a){"use strict";a(330)},491:function(e,t,a){"use strict";a.r(t);a(95);var r={name:"zSlotsFormDemo",data(){const e=this.$createElement;return{form:{age:"23"},transformData:[],rules:{age:[{required:!0,message:"请输入姓名",trigger:"blur"},{min:2,max:5,message:"长度在 2 到 5 个字符",trigger:"blur"}]},formList:[{prop:"age",label:"年龄",render:({vmodel:t})=>(console.log("🚀 ~ vmodel:",t.age),e("el-input",{attrs:{placeholder:"请输入年龄"},model:{value:t.age,callback:e=>{this.$set(t,"age",e)}}}))},{prop:"gender",label:"性别",render:({vmodel:t})=>e("el-radio-group",{model:{value:t.gender,callback:e=>{this.$set(t,"gender",e)}}},[e("el-radio",{attrs:{label:"男"}},[" 男 "]),e("el-radio",{attrs:{label:"女"}},[" 女 "])]),defaultValue:"男"}]}},mounted(){console.log(this.getData())},methods:{submit(){console.log(this.$refs.zSlotsForm),this.$refs.zSlotsForm.validate(e=>{this.$message.success("验证成功",e)},e=>{this.$message.error("验证失败",e)})},async getData(){this.$createElement;const{data:e}=await new Promise(e=>{setTimeout(()=>{const t=[];for(let e=1;e<=15;e++)t.push({key:e,label:"备选项 "+e,disabled:e%4==0});e({data:t})},3e3)});return this.$set(this.formList[1],"option",{data:e,filterable:!0,"left-default-checked":[2,4],"right-default-checked":[1,3],"render-content":(e,t)=>e("span",[t.key," - ",t.label])}),console.log(this.formList[1]),e}}},s=(a(468),a(8)),l=Object(s.a)(r,(function(){var e=this,t=e._self._c;return t("z-grid-form",{ref:"zSlotsForm",attrs:{rules:e.rules,items:e.formList,"label-width":"140px"},scopedSlots:e._u([{key:"prepend",fn:function(){return[t("div",{staticClass:"m-20"},[t("span",{staticStyle:{"font-size":"large","font-weight":"600"}},[e._v("标题 ")]),e._v(" "),t("el-tag",[e._v("使用prepend插槽")])],1)]},proxy:!0},{key:"append",fn:function(){return[t("el-col",{staticClass:"text-right",attrs:{span:24}},[t("el-tag",[e._v("使用append插槽")]),e._v(" "),t("el-button",{attrs:{type:"danger",plain:""},on:{click:function(t){return e.submit()}}},[e._v(" 提交 ")])],1)]},proxy:!0}]),model:{value:e.form,callback:function(t){e.form=t},expression:"form"}})}),[],!1,null,"6e315030",null);t.default=l.exports}}]);