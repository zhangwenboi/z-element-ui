(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{489:function(e,a,l){"use strict";l.r(a);var t={name:"zTableDemo",data:()=>({tableColumn:[{prop:"name0",label:"第0列"},{prop:"name1",label:"第1列"},{prop:"name2",label:"第2列"},{prop:"name3",label:"第3列"},{prop:"name4",label:"第4列"}],tableData:new Array(20).fill(0).map((e,a)=>{const l={};for(let e=0;e<=5;e++)l["name"+e]=`第${e}列 ， 第${a}行`;return l})}),mounted(){console.log(this.$refs.table.$refs.elTable.resizeState)}},n=l(8),o=Object(n.a)(t,(function(){return(0,this._self._c)("zTable",{ref:"table",staticClass:"z-table",attrs:{tableColumn:this.tableColumn,tableData:this.tableData,height:300}},[this._v(" >")])}),[],!1,null,null,null);a.default=o.exports}}]);