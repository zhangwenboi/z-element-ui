(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{482:function(e,a,t){"use strict";t.r(a);const l=(e,a=0)=>new Array(e).fill(0).map((t,l)=>({date:"2016-05-02",name:"王小虎"+(a*e+l),address:["上海1"],_view_:!1}));var i={name:"zEditTableDemo",data(){const e=this.$createElement;return{paginationOption:{total:200,disabled:!1},tableColumn:[{prop:"date",label:"测试1"},{prop:"name",label:"测试2","label-class-name":"text-center"},{prop:"address",label:"测试3","class-name":"text-red",format:e=>e.scope.row.address.join(",")}],tableData:l(5),rules:{name:[{required:!0,message:"请输入名称",trigger:"change"}]},items:[{prop:"date",render:a=>e("el-date-picker",{style:"width:100%",attrs:{"value-format":"yyyy-MM-dd"},model:{value:a.scope.row.date,callback:e=>{this.$set(a.scope.row,"date",e)}}}),isTag:!0,option:{placeholder:"请输入"}},{prop:"name",render:"z-select",isTag:!0,require:!0,option:{placeholder:"请输入",clearable:!0,data:new Promise(e=>{setTimeout(()=>{e([{label:"上海",value:"上海"},{label:"北京",value:"北京"}])},4e3)})}},{prop:"address",render:"z-select",option:{placeholder:"请输入",clearable:!0,filter:!0,multiple:!0,multipleLimit:1,data:[{label:"group1",data:[{label:"上海1",value:"上海1"},{label:"北京1",value:"北京1"}]},{label:"group2",data:[{label:"上海2",value:"上海2"},{label:"北京2",value:"北京2"}]}]}}],loading:!1}},methods:{saveTable({row:e,loading:a}){a(!0),new Promise(a=>{setTimeout(()=>{a(e)},1e3)}).then(t=>{a(!1),e.address=e.address.join()})},deleteTable({row:e,loading:a}){this.paginationOption.disabled=!0,a(!0),new Promise(a=>{setTimeout(()=>{a(e)},2e3)}).then(e=>{this.tableData=this.tableData.filter(a=>a!==e),this.paginationOption.total--,this.paginationOption.disabled=!1,a(!1)})},handlePageChange(e){this.loading=!0,new Promise(a=>{setTimeout(()=>{a(l(5,e-1))},1e3)}).then(e=>{this.tableData=e,this.loading=!1})}}},n=t(8),o=Object(n.a)(i,(function(){var e=this;return(0,e._self._c)("zEditTable",e._b({directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{tableColumn:e.tableColumn,items:e.items,frontPagination:!1,rules:e.rules},on:{"save-table":e.saveTable,"delete-table":e.deleteTable,"page-change":e.handlePageChange},model:{value:e.tableData,callback:function(a){e.tableData=a},expression:"tableData"}},"zEditTable",e.paginationOption,!1))}),[],!1,null,null,null);a.default=o.exports}}]);