(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{464:function(e,t,l){e.exports=l.p+"assets/img/logo.a642dff0.png"},486:function(e,t,l){"use strict";l.r(t);var a={name:"zSelectDemo",data:()=>({loading:!1,select:"北京",select1:"北京2",select2:["上海","北京"],select3:"北京",select4:"北京",option:[{label:"上海",value:"上海"},{label:"北京",value:"北京"},{label:"上海1",value:"上海1"}],groupOption:[{label:"第一组",data:[{label:"上海1",value:"上海1"},{label:"北京2",value:"北京2"}]},{label:"第二组",data:[{label:"上海2",value:"上海2"},{label:"北京1",value:"北京1"}]}],lazeOption:()=>new Promise((e,t)=>{const l=[{label:"上海2",value:"上海2"}];setTimeout(()=>{e(l)},3e3)})}),methods:{async remoteMethod(e){""!==e?(this.loading=!0,this.option=await this.createFilter(e)):this.option=this.option,this.loading=!1},createFilter:e=>new Promise((e,t)=>{setTimeout(()=>{e([{label:"上海2",value:"上海2"},{label:"北京1",value:"北京1"}])},2e3)})}},s=l(8),o=Object(s.a)(a,(function(){var e=this,t=e._self._c;return t("div",[t("h3",[e._v("正常")]),e._v(" "),t("z-select",{attrs:{data:e.option},model:{value:e.select,callback:function(t){e.select=t},expression:"select"}}),e._v(" "),t("H3",[e._v("分组")]),e._v(" "),t("z-select",{attrs:{data:e.groupOption},model:{value:e.select1,callback:function(t){e.select1=t},expression:"select1"}}),e._v(" "),t("h3",[e._v("插槽")]),e._v(" "),t("z-select",{attrs:{data:e.option,multiple:"","collapse-tags":""},scopedSlots:e._u([{key:"option",fn:function(l){return[t("span",{staticClass:"text-red"},[e._v("想不到吧,我还能用插槽")]),e._v(" "+e._s(l.option.label)+"\n    ")]}}]),model:{value:e.select2,callback:function(t){e.select2=t},expression:"select2"}}),e._v(" "),t("h3",[e._v("过滤")]),e._v(" "),t("z-select",{attrs:{loading:e.loading,data:e.option,filterable:""},scopedSlots:e._u([{key:"empty",fn:function(){return[e._v("\n      什么都找不到,但是我可以自定义空数据时的插槽\n      "),t("br"),e._v(" "),t("img",{staticStyle:{width:"30px",height:"30px"},attrs:{src:l(464),alt:""}})]},proxy:!0}]),model:{value:e.select3,callback:function(t){e.select3=t},expression:"select3"}}),e._v(" "),t("h3",[e._v("远程过滤")]),e._v(" "),t("z-select",{attrs:{loading:e.loading,data:e.option,filterable:"","remote-method":e.remoteMethod,remote:""},model:{value:e.select3,callback:function(t){e.select3=t},expression:"select3"}}),e._v(" "),t("h3",[e._v("data数据为Promise类型")]),e._v(" "),t("z-select",{attrs:{data:e.lazeOption},scopedSlots:e._u([{key:"option",fn:function(l){return[t("span",{staticClass:"text-red"},[e._v("想不到吧,我还能用插槽")]),e._v(" "+e._s(l.option.label)+"\n    ")]}}]),model:{value:e.select4,callback:function(t){e.select4=t},expression:"select4"}}),e._v(" "),t("h3",[e._v("过滤")]),e._v(" "),t("z-select",{attrs:{loading:e.loading,data:e.option,filterable:"",multiple:"","allow-create":""},model:{value:e.select2,callback:function(t){e.select2=t},expression:"select2"}})],1)}),[],!1,null,null,null);t.default=o.exports}}]);