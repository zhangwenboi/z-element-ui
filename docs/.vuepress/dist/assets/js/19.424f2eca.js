(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{480:function(e,a,l){"use strict";l.r(a);const t=(e,a=0)=>new Array(e).fill(0).map((l,t)=>({date:"2016-05-02",name:"王小虎"+(a*e+t),address:["上海1"],_view_:!1}));var n={name:"zEditTableDemo",data:()=>({tableColumn:[{prop:"date",label:"测试1"},{prop:"name",label:"测试2","label-class-name":"text-center"},{prop:"address",label:"测试3","label-class-name":"text-red","class-name":"text-green",format:e=>e.scope.row.address.join(",")}],tableData:t(5),rules:{name:[{required:!0,message:"请输入名称",trigger:"change"}]},items:[{prop:"date",render:"el-input"},{prop:"name",render:"el-input"},{prop:"address",render:"z-select",option:{placeholder:"请输入",clearable:!0,filter:!0,multiple:!0,multipleLimit:1,data:[{label:"group1",data:[{label:"上海1",value:"上海1"},{label:"北京1",value:"北京1"}]},{label:"group2",data:[{label:"上海2",value:"上海2"},{label:"北京2",value:"北京2"}]}]}}],loading:!1}),methods:{handlePageChange(e){this.loading=!0,new Promise(a=>{setTimeout(()=>{a(t(5,e-1))},1e3)}).then(e=>{this.tableData=e,this.loading=!1})}}},r=l(8),s=Object(r.a)(n,(function(){var e=this;return(0,e._self._c)("zEditTable",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{tableColumn:e.tableColumn,items:e.items,rules:e.rules},on:{"page-change":e.handlePageChange},model:{value:e.tableData,callback:function(a){e.tableData=a},expression:"tableData"}})}),[],!1,null,null,null);a.default=s.exports}}]);