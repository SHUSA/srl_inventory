webpackJsonp([1],{"+BDF":function(e,t){},"42Hy":function(e,t,s){"use strict";var r=s("Xxa5"),a=s.n(r),n=s("exGp"),i=s.n(n),o=s("Dd8w"),l=s.n(o),d=s("NYxO"),c=s("mvHQ"),u=s.n(c),v=s("mtWM"),m=s.n(v),p=function(){return console.log("axios"),console.log(Object({NODE_ENV:"production",devtools:!1,debug:!1,silent:!0})),m.a.create({baseURL:Object({NODE_ENV:"production",devtools:!1,debug:!1,silent:!0}).baseURL})},f=function(e){return p().get("assays",{params:{status:e}})},h=function(e){return p().post("assays",e).catch(function(e){return JSON.parse(u()(e)).response})},_=function(e){return p().get("vendors",{params:{status:e}})},x=function(e){return p().post("vendors",e).catch(function(e){return JSON.parse(u()(e)).response})},b=function(){return p().get("orders")},g=function(){return p().post("orders").catch(function(e){return JSON.parse(u()(e)).response})},y=function(e){return p().put("orders/"+e._id,{params:{order:e}}).catch(function(e){return JSON.parse(u()(e)).response})},k=s("woOf"),j=s.n(k),w=function(e,t,s){return p().get("items",{params:{item:e,status:t,search:s}})},I=function(e){return p().get("items/list",{params:{itemIds:e}})},O=function(e,t){return p().post("items",{params:{item:e,assay:t}}).catch(function(e){return JSON.parse(u()(e)).response})},S=function(e,t,s){return p().put("items/"+e,{params:{item:t,assay:s}}).catch(function(e){return JSON.parse(u()(e)).response})},D=s("PJh5");document.getElementsByTagName("input").onwheel=function(){return!1};var N={props:["items","vendors","assays"],data:function(){var e=this;return{currentItem:null,dialog:!1,assayDialog:!1,vendorDialog:!1,alert:!1,loading:!1,search:"",alertMessage:"",errors:{assay:!1,vendor:!1,catalog:!1,item:!1,num:[]},rules:{number:function(t){var s=parseFloat(t);return!isNaN(s)&&s>=0?(e.errors.num.pop(),!0):(e.errors.num.push(""),"Please enter a valid number")},catalog:function(t){return 0===t.length?(e.errors.catalog=!0,"Please enter a catalog number"):void 0!==e.supplies.find(function(e){return e.catalogNumber.toUpperCase()===t.toUpperCase()})?e.editedIndex>-1?(e.errors.catalog=!1,!0):(e.errors.catalog=!0,"Duplicate catalog found"):(e.errors.catalog=!1,!0)},assay:function(t){return 0===t.length?(e.errors.assay=!0,"Please enter a valid name"):(e.errors.assay=!1,!0)},vendor:function(t){return 0===t.length?(e.errors.vendor=!0,"Please enter a valid name"):(e.errors.vendor=!1,!0)},item:function(t){return 0===t.length?(e.errors.item=!0,"Please enter a valid name"):(e.errors.item=!1,!0)}},headers:[{text:"Item",value:"name",width:"15%"},{text:"Assay",value:"assay"},{text:"Catalog #",value:"catalogNumber"},{text:"Desc",value:"itemDescription"},{text:"Stock",value:"currentStock"},{text:"To Order",value:"reorderQuantity"},{text:"Comment",value:"comment",width:"15%"},{text:"Last Update",value:"updatedAt"},{text:"",value:"name",sortable:!1,width:"5%"}],supplies:[],assayList:[],vendorList:[],editedAssay:{name:"",weeklyVolume:0,weeklyRuns:0,controlsPerRun:0,maxBatchSize:0,sampleReplicates:0},editedVendor:{name:""},editedIndex:-1,editedItem:{name:"",assay:"",vendor:"",catalogNumber:"",itemDescription:"",reactionsPerItem:0,currentStock:0,weeksOfSafetyStock:2,leadTimeDays:7,weeksOfReorder:8,reorderPoint:0,reorderQuantity:0},defaultItem:{name:"",assay:"",vendor:"",catalogNumber:"",itemDescription:"",reactionsPerItem:0,currentStock:0,weeksOfSafetyStock:2,leadTimeDays:7,weeksOfReorder:8,reorderPoint:0,reorderQuantity:0}}},computed:{formTitle:function(){return-1===this.editedIndex?"New Item":"Edit Item"}},watch:{dialog:function(e){e||this.close()},assayDialog:function(e){e||(this.alert=!1)},vendorDialog:function(e){e||(this.alert=!1)},items:function(){this.supplies=this.items,this.vendorList=this.vendors,this.assayList=this.assays}},mounted:function(){this.supplies=this.items,this.vendorList=this.vendors,this.assayList=this.assays},methods:{time:function(e){return D(e.updatedAt).format("MMM-DD-YYYY HH:mm:ss")},addAssay:function(){this.assayDialog=!0},addVendor:function(){this.vendorDialog=!0},expand:function(e){var t=document.getElementById(e);t.className.split(" ").includes("expanded")?t.classList.remove("expanded"):t.classList.add("expanded")},editItem:function(e){this.currentItem=e,this.editedIndex=this.supplies.indexOf(e),this.editedItem=j()({},e),this.dialog=!0},deleteItem:function(e){var t=this;return i()(a.a.mark(function s(){var r;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(r=t.supplies.indexOf(e),!confirm("Are you sure you want to deactivate "+e.name+"?")){s.next=7;break}return e.active=!1,s.next=5,S(e._id,e,null);case 5:t.supplies.splice(r,1),t.dialog=!1;case 7:t.currentItem=null;case 8:case"end":return s.stop()}},s,t)}))()},close:function(){var e=this;this.assayDialog?this.assayDialog=!1:this.vendorDialog?this.vendorDialog=!1:(this.dialog=!1,setTimeout(function(){e.editedItem=j()({},e.defaultItem),e.editedIndex=-1},300))},save:function(){var e=this;return i()(a.a.mark(function t(){var s,r,n,i;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(s=e.errors.num.length,e.alertMessage="Please fix issues",!e.assayDialog){t.next=17;break}if(!e.errors.assay&&!s){t.next=7;break}e.alert=!0,t.next=15;break;case 7:return e.loading=!0,e.alert=!1,e.editedItem.assay=e.editedAssay.name,t.t0=e.assays,t.next=13,h(e.editedAssay);case 13:t.t1=t.sent.data,t.t0.push.call(t.t0,t.t1);case 15:t.next=59;break;case 17:if(!e.vendorDialog){t.next=32;break}if(!e.errors.vendor&&!s){t.next=22;break}e.alert=!0,t.next=30;break;case 22:return e.loading=!0,e.alert=!1,e.editedItem.vendor=e.editedVendor.name,t.t2=e.vendors,t.next=28,x(e.editedVendor);case 28:t.t3=t.sent.data,t.t2.push.call(t.t2,t.t3);case 30:t.next=59;break;case 32:if(!e.errors.item&&!s){t.next=37;break}e.alert=!0,console.log(e.errors),t.next=59;break;case 37:for(n in r=e.assays.find(function(t){return t.name.toUpperCase()===e.editedItem.assay.toUpperCase()}),e.loading=!0,e.alert=!1,e.editedItem)"string"==typeof e.editedItem[n]&&(e.editedItem[n]=e.editedItem[n].trim());if(e.editedItem.catalogNumber=e.editedItem.catalogNumber.toUpperCase(),e.editedItem.currentStock=parseInt(100*e.editedItem.currentStock)/100,!(e.editedIndex>-1)){t.next=54;break}return i=e.supplies[e.editedIndex],e.editedItem.updatedAt=Date.now(),t.t4=j.a,t.t5=i,t.next=50,S(i._id,e.editedItem,r);case 50:t.t6=t.sent.data,(0,t.t4)(t.t5,t.t6),t.next=59;break;case 54:return t.t7=e.supplies,t.next=57,O(e.editedItem,r);case 57:t.t8=t.sent.data,t.t7.push.call(t.t7,t.t8);case 59:e.alert||(e.loading=!1,e.close());case 60:case"end":return t.stop()}},t,e)}))()}}},A={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-card",[s("v-card-title",[s("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[s("v-btn",{staticClass:"mb-0",attrs:{slot:"activator",color:"primary",dark:""},slot:"activator"},[e._v("New Item")]),e._v(" "),s("v-card",[s("v-card-title",[s("span",{staticClass:"headline"},[e._v(e._s(e.formTitle))])]),e._v(" "),s("v-card-text",[s("v-container",{attrs:{"grid-list-md":""}},[s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{attrs:{rules:[e.rules.item],label:"Item Name",required:""},model:{value:e.editedItem.name,callback:function(t){e.$set(e.editedItem,"name",t)},expression:"editedItem.name"}})],1),e._v(" "),s("v-flex",{attrs:{xs6:""}},[s("v-select",{attrs:{items:e.assayList,autocomplete:"",label:"Assay","item-text":"name","item-value":"name","append-icon":"note_add","append-icon-cb":e.addAssay,rules:[e.rules.assay],dense:"",required:""},model:{value:e.editedItem.assay,callback:function(t){e.$set(e.editedItem,"assay",t)},expression:"editedItem.assay"}})],1),e._v(" "),s("v-flex",{attrs:{xs6:""}},[s("v-select",{attrs:{items:e.vendorList,autocomplete:"",label:"Vendor","item-text":"name","item-value":"name","append-icon":"note_add","append-icon-cb":e.addVendor,rules:[e.rules.vendor],dense:"",required:""},model:{value:e.editedItem.vendor,callback:function(t){e.$set(e.editedItem,"vendor",t)},expression:"editedItem.vendor"}})],1),e._v(" "),s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{attrs:{rules:[e.rules.catalog],label:"Catalog Number",required:""},model:{value:e.editedItem.catalogNumber,callback:function(t){e.$set(e.editedItem,"catalogNumber",t)},expression:"editedItem.catalogNumber"}})],1),e._v(" "),s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{attrs:{label:"Item Description"},model:{value:e.editedItem.itemDescription,callback:function(t){e.$set(e.editedItem,"itemDescription",t)},expression:"editedItem.itemDescription"}})],1),e._v(" "),s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{ref:"reactionsPerItem",attrs:{"validate-on-blur":"",rules:[e.rules.number],type:"number",min:"0",hint:"Use 0 for general items.","persistent-hint":"",label:"Reactions per Item"},model:{value:e.editedItem.reactionsPerItem,callback:function(t){e.$set(e.editedItem,"reactionsPerItem",t)},expression:"editedItem.reactionsPerItem"}})],1),e._v(" "),s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{ref:"currentStock",attrs:{"validate-on-blur":"",rules:[e.rules.number],type:"number",min:"0",label:"Current Stock"},model:{value:e.editedItem.currentStock,callback:function(t){e.$set(e.editedItem,"currentStock",t)},expression:"editedItem.currentStock"}})],1),e._v(" "),s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{attrs:{disabled:"",label:"Safety Stock",value:"999"}})],1),e._v(" "),s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{ref:"safetyStock",attrs:{"validate-on-blur":"",rules:[e.rules.number],type:"number",min:"0",label:"Safety Weeks"},model:{value:e.editedItem.weeksOfSafetyStock,callback:function(t){e.$set(e.editedItem,"weeksOfSafetyStock",t)},expression:"editedItem.weeksOfSafetyStock"}})],1),e._v(" "),s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{ref:"leadtimeDays",attrs:{"validate-on-blur":"",rules:[e.rules.number],type:"number",min:"0",label:"Lead Time (Days)"},model:{value:e.editedItem.leadTimeDays,callback:function(t){e.$set(e.editedItem,"leadTimeDays",t)},expression:"editedItem.leadTimeDays"}})],1),e._v(" "),s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{ref:"weeksOfReorder",attrs:{"validate-on-blur":"",rules:[e.rules.number],type:"number",min:"0",label:"Reorder Weeks"},model:{value:e.editedItem.weeksOfReorder,callback:function(t){e.$set(e.editedItem,"weeksOfReorder",t)},expression:"editedItem.weeksOfReorder"}})],1),e._v(" "),s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{ref:"reorderPoint",attrs:{label:"Reorder Point"},model:{value:e.editedItem.reorderPoint,callback:function(t){e.$set(e.editedItem,"reorderPoint",t)},expression:"editedItem.reorderPoint"}})],1),e._v(" "),s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{ref:"reorderQuantity",attrs:{label:"Reorder Quantity"},model:{value:e.editedItem.reorderQuantity,callback:function(t){e.$set(e.editedItem,"reorderQuantity",t)},expression:"editedItem.reorderQuantity"}})],1),e._v(" "),s("v-flex",{attrs:{xs12:""}},[s("v-alert",{attrs:{value:e.alert,type:"error"}},[e._v("\n                  "+e._s(e.alertMessage)+"\n                ")])],1)],1)],1)],1),e._v(" "),s("v-card-actions",[null!=e.currentItem?s("v-btn",{attrs:{color:"red darken-1",flat:""},nativeOn:{click:function(t){e.deleteItem(e.currentItem)}}},[e._v("Delete")]):e._e(),e._v(" "),s("v-spacer"),e._v(" "),e.loading?s("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}}):e._e(),e._v(" "),s("v-btn",{attrs:{color:"blue darken-1",flat:""},nativeOn:{click:function(t){return e.close(t)}}},[e._v("Cancel")]),e._v(" "),s("v-btn",{attrs:{color:"blue darken-1",flat:""},nativeOn:{click:function(t){return e.save(t)}}},[e._v("Save")])],1)],1)],1),e._v(" "),s("v-spacer"),e._v(" "),s("v-text-field",{attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),e._v(" "),s("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.assayDialog,callback:function(t){e.assayDialog=t},expression:"assayDialog"}},[s("v-card",[s("v-card-title",[s("span",{staticClass:"headline"},[e._v("New Assay")])]),e._v(" "),s("v-card-text",[s("v-container",{attrs:{"grid-list-md":""}},[s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{attrs:{rules:[e.rules.assay],label:"Name",required:""},model:{value:e.editedAssay.name,callback:function(t){e.$set(e.editedAssay,"name",t)},expression:"editedAssay.name"}})],1),e._v(" "),s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{ref:"weeklyVolume",attrs:{"validate-on-blur":"",rules:[e.rules.number],type:"number",min:"0",label:"Weekly Volume"},model:{value:e.editedAssay.weeklyVolume,callback:function(t){e.$set(e.editedAssay,"weeklyVolume",t)},expression:"editedAssay.weeklyVolume"}})],1),e._v(" "),s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{ref:"weeklyRuns",attrs:{"validate-on-blur":"",rules:[e.rules.number],type:"number",min:"0",label:"Runs per Week"},model:{value:e.editedAssay.weeklyRuns,callback:function(t){e.$set(e.editedAssay,"weeklyRuns",t)},expression:"editedAssay.weeklyRuns"}})],1),e._v(" "),s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{ref:"controlsPerRun",attrs:{"validate-on-blur":"",rules:[e.rules.number],type:"number",min:"0",label:"Controls per Run"},model:{value:e.editedAssay.controlsPerRun,callback:function(t){e.$set(e.editedAssay,"controlsPerRun",t)},expression:"editedAssay.controlsPerRun"}})],1),e._v(" "),s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{ref:"maxBatchSize",attrs:{"validate-on-blur":"",rules:[e.rules.number],type:"number",min:"0",label:"Max Batch Size"},model:{value:e.editedAssay.maxBatchSize,callback:function(t){e.$set(e.editedAssay,"maxBatchSize",t)},expression:"editedAssay.maxBatchSize"}})],1),e._v(" "),s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{ref:"sampleReplicates",attrs:{"validate-on-blur":"",rules:[e.rules.number],type:"number",min:"0",label:"Sample Replicates"},model:{value:e.editedAssay.sampleReplicates,callback:function(t){e.$set(e.editedAssay,"sampleReplicates",t)},expression:"editedAssay.sampleReplicates"}})],1),e._v(" "),s("v-flex",{attrs:{xs12:""}},[s("v-alert",{attrs:{value:e.alert,type:"error"}},[e._v("\n                  "+e._s(e.alertMessage)+"\n                ")])],1)],1)],1)],1),e._v(" "),s("v-card-actions",[s("v-spacer"),e._v(" "),e.loading?s("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}}):e._e(),e._v(" "),s("v-btn",{attrs:{color:"blue darken-1",flat:""},nativeOn:{click:function(t){return e.close(t)}}},[e._v("Cancel")]),e._v(" "),s("v-btn",{attrs:{color:"blue darken-1",flat:""},nativeOn:{click:function(t){return e.save(t)}}},[e._v("Save")])],1)],1)],1),e._v(" "),s("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.vendorDialog,callback:function(t){e.vendorDialog=t},expression:"vendorDialog"}},[s("v-card",[s("v-card-title",[s("span",{staticClass:"headline"},[e._v("New Vendor")])]),e._v(" "),s("v-card-text",[s("v-container",{attrs:{"grid-list-md":""}},[s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"Name",rules:[e.rules.vendor],required:""},model:{value:e.editedVendor.name,callback:function(t){e.$set(e.editedVendor,"name",t)},expression:"editedVendor.name"}})],1),e._v(" "),s("v-flex",{attrs:{xs12:""}},[s("v-alert",{attrs:{value:e.alert,type:"error"}},[e._v("\n                  "+e._s(e.alertMessage)+"\n                ")])],1)],1)],1)],1),e._v(" "),s("v-card-actions",[s("v-spacer"),e._v(" "),e.loading?s("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}}):e._e(),e._v(" "),s("v-btn",{attrs:{color:"blue darken-1",flat:""},nativeOn:{click:function(t){return e.close(t)}}},[e._v("Cancel")]),e._v(" "),s("v-btn",{attrs:{color:"blue darken-1",flat:""},nativeOn:{click:function(t){return e.save(t)}}},[e._v("Save")])],1)],1)],1)],1),e._v(" "),s("v-data-table",{attrs:{headers:e.headers,items:e.items,search:e.search,"hide-actions":""},scopedSlots:e._u([{key:"items",fn:function(t){return[s("td",[e._v(e._s(t.item.name))]),e._v(" "),s("td",[e._v(e._s(t.item.assay))]),e._v(" "),s("td",[e._v(e._s(t.item.catalogNumber))]),e._v(" "),s("td",[e._v(e._s(t.item.itemDescription))]),e._v(" "),s("td",[e._v(e._s(t.item.currentStock))]),e._v(" "),s("td",[e._v(e._s(t.item.reorderQuantity))]),e._v(" "),s("td",{staticClass:"comment",attrs:{id:t.item._id},on:{click:function(s){e.expand(t.item._id)}}},[e._v(e._s(t.item.comment))]),e._v(" "),s("td",[e._v(e._s(e.time(t.item)))]),e._v(" "),s("td",{staticClass:"justify-center layout px-0"},[s("v-btn",{staticClass:"mx-0",attrs:{icon:""},on:{click:function(s){e.editItem(t.item)}}},[s("v-icon",{attrs:{color:"teal"}},[e._v("info")])],1)],1)]}}])},[s("template",{slot:"no-data"},[s("v-alert",{attrs:{color:"error",icon:"warning"}},[e._v("Nothing here!")])],1),e._v(" "),s("v-alert",{attrs:{slot:"no-results",value:!0,color:"error",icon:"warning"},slot:"no-results"},[e._v("\n      No results for "+e._s(e.search)+".\n    ")])],2)],1)},staticRenderFns:[]};var C=s("VU/8")(N,A,!1,function(e){s("d57G")},"data-v-2665d60e",null).exports,R=s("PJh5");document.getElementsByTagName("input").onwheel=function(){return!1};var P={props:["items","assays"],data:function(){var e=this;return{error:[],rules:{number:function(t){var s=parseFloat(t);return!isNaN(s)&&s>=0?(e.error.pop(),!0):(e.error.push("num"),"Please enter a valid number")},text:function(t){return t.length<=140?(e.error.pop(),!0):(e.error.push("text"),"Max 140 characters")}},alert:!1,dialog:!1,loading:!1,search:"",editedIndex:-1,editedItem:{currentStock:0,comment:""},defaultItem:{currentStock:0,comment:""},headers:[{text:"Item",value:"name",width:"15%"},{text:"Vendor",value:"vendor"},{text:"Catalog #",value:"catalogNumber"},{text:"Desc",value:"itemDescription"},{text:"Prev Stock",value:"previousStock"},{text:"Stock",value:"currentStock"},{text:"To Order",value:"toOrder"},{text:"Comment",value:"comment",width:"15%"},{text:"Last Update",value:"updatedAt"},{text:"",value:"name",sortable:!1}],supplies:[]}},watch:{dialog:function(e){e||this.close()},items:function(){this.supplies=this.items,this.supplies.map(function(e){e.toOrder=0,e.order=!1})}},mounted:function(){this.supplies=this.items,this.supplies.map(function(e){e.toOrder=0,e.order=!1})},methods:{expand:function(e){var t=document.getElementById(e);t.className.split(" ").includes("expanded")?t.classList.remove("expanded"):t.classList.add("expanded")},time:function(e){return R(e.updatedAt).format("MMM-DD-YYYY HH:mm:ss")},editItem:function(e){this.editedIndex=this.supplies.indexOf(e),this.editedItem=j()({},e),this.dialog=!0},close:function(){var e=this;this.dialog=!1,setTimeout(function(){e.editedItem=j()({},e.defaultItem),e.editedIndex=-1},300)},save:function(){var e=this;return i()(a.a.mark(function t(){var s;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(e.error.length>0)){t.next=4;break}e.alert=!0,t.next=20;break;case 4:return e.alert=!1,(s=e.editedItem).updatedAt=Date.now(),s.currentStock=parseInt(100*s.currentStock)/100,s.currentStock<=s.reorderPoint?(s.order=!0,s.toOrder=s.reorderQuantity):(s.order=!1,s.toOrder=0),s.user=!0,s.comment=s.comment.trim(),e.loading=!0,t.t0=j.a,t.t1=e.supplies[e.editedIndex],t.next=16,S(s._id,s,s.assay);case 16:t.t2=t.sent.data,(0,t.t0)(t.t1,t.t2),e.loading=!1,e.close();case 20:case"end":return t.stop()}},t,e)}))()}}},z={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-card",[s("v-card-title",[s("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[s("v-card",[s("v-card-title",[s("span",{staticClass:"headline"},[e._v("Update Inventory")])]),e._v(" "),s("v-card-text",[s("v-container",{attrs:{"grid-list-md":""}},[s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{type:"number",min:"0","validate-on-blur":"",rules:[e.rules.number],label:"Current Stock"},model:{value:e.editedItem.currentStock,callback:function(t){e.$set(e.editedItem,"currentStock",t)},expression:"editedItem.currentStock"}})],1),e._v(" "),s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{textarea:"","no-resize":"",counter:"140","validate-on-blur":"",rules:[e.rules.text],label:"Comment"},model:{value:e.editedItem.comment,callback:function(t){e.$set(e.editedItem,"comment",t)},expression:"editedItem.comment"}})],1),e._v(" "),s("v-flex",{attrs:{xs12:""}},[s("v-alert",{attrs:{value:e.alert,type:"error"}},[e._v("\n                  Please fix issues\n                ")])],1)],1)],1)],1),e._v(" "),s("v-card-actions",[s("v-spacer"),e._v(" "),e.loading?s("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}}):e._e(),e._v(" "),s("v-btn",{attrs:{color:"blue darken-1",flat:""},nativeOn:{click:function(t){return e.close(t)}}},[e._v("Cancel")]),e._v(" "),s("v-btn",{attrs:{color:"blue darken-1",flat:""},nativeOn:{click:function(t){return e.save(t)}}},[e._v("Save")])],1)],1)],1),e._v(" "),s("v-spacer"),e._v(" "),s("v-text-field",{attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),e._v(" "),s("v-data-table",{attrs:{headers:e.headers,items:e.items,search:e.search,"hide-actions":""},scopedSlots:e._u([{key:"items",fn:function(t){return[s("td",[e._v(e._s(t.item.name))]),e._v(" "),s("td",[e._v(e._s(t.item.vendor))]),e._v(" "),s("td",[e._v(e._s(t.item.catalogNumber))]),e._v(" "),s("td",[e._v(e._s(t.item.itemDescription))]),e._v(" "),s("td",[e._v(e._s(t.item.previousStock))]),e._v(" "),s("td",[e._v(e._s(t.item.currentStock))]),e._v(" "),s("td",[e._v(e._s(t.item.toOrder))]),e._v(" "),s("td",{staticClass:"comment",attrs:{id:t.item._id},on:{click:function(s){e.expand(t.item._id)}}},[e._v(e._s(t.item.comment))]),e._v(" "),s("td",[e._v(e._s(e.time(t.item)))]),e._v(" "),s("td",{staticClass:"justify-center layout px-0"},[s("v-btn",{staticClass:"mx-0",attrs:{icon:""},on:{click:function(s){e.editItem(t.item)}}},[s("v-icon",{attrs:{color:"teal"}},[e._v("edit")])],1)],1)]}}])},[s("v-alert",{attrs:{slot:"no-results",value:!0,color:"error",icon:"warning"},slot:"no-results"},[e._v("\n      No results for "+e._s(e.search)+".\n    ")])],1)],1)},staticRenderFns:[]};var U=s("VU/8")(P,z,!1,function(e){s("ct1W")},null,null).exports,T=s("PJh5"),V={props:["order","items"],data:function(){return{dialog:!1,dialog2:!1,loading:!1,completed:!1,search:"",headers:[{text:"Item",value:"name",width:"15%"},{text:"Vendor",value:"vendor"},{text:"Catalog #",value:"catalogNumber"},{text:"Desc",value:"itemDescription"},{text:"Stock",value:"currentStock"},{text:"To Order",value:"reorderQuantity"},{text:"Comment",value:"comment",width:"15%"},{text:"Last Update",value:"updatedAt"}],supplies:[],thisOrder:{}}},watch:{items:function(){this.supplies=this.items},order:function(){this.thisOrder=this.order}},mounted:function(){this.supplies=this.items,this.thisOrder=this.order},methods:{time:function(e){return T(e).format("MMM-DD-YYYY HH:mm:ss")},expand:function(e){var t=document.getElementById(e);t.className.split(" ").includes("expanded")?t.classList.remove("expanded"):t.classList.add("expanded")},close:function(){this.dialog=!1,this.dialog2=!1},createOrder:function(){var e=this;return i()(a.a.mark(function t(){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,g();case 3:e.loading=!1,e.$store.dispatch("setDrawer"),location.reload();case 6:case"end":return t.stop()}},t,e)}))()},changeOrder:function(){var e=this;return i()(a.a.mark(function t(){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,e.thisOrder.completed?e.thisOrder.completeDate=null:e.thisOrder.completeDate=Date.now(),e.thisOrder.completed=!e.thisOrder.completed,t.next=5,y(e.thisOrder);case 5:e.loading=!1,e.close(),e.$store.dispatch("setDrawer"),location.reload();case 9:case"end":return t.stop()}},t,e)}))()}}},E={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-card",[s("v-card-title",[s("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e.thisOrder.completed?s("v-btn",{staticClass:"mb-0",attrs:{slot:"activator",color:"error",dark:""},slot:"activator"},[e._v("Undo Complete")]):s("v-btn",{staticClass:"mb-0",attrs:{slot:"activator",color:"primary",dark:""},slot:"activator"},[e._v("Complete Order")]),e._v(" "),s("v-card",[s("v-card-title",[e.thisOrder.completed?s("span",{staticClass:"headline"},[e._v("Undo completed status?")]):s("span",{staticClass:"headline"},[e._v("Is the order complete?")]),e._v(" "),s("v-card-actions",[s("v-spacer"),e._v(" "),e.loading?s("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}}):e._e(),e._v(" "),s("v-btn",{attrs:{color:"error"},nativeOn:{click:function(t){return e.close(t)}}},[e._v("No")]),e._v(" "),s("v-btn",{attrs:{color:"primary"},nativeOn:{click:function(t){return e.changeOrder(t)}}},[e._v("Yes")])],1)],1)],1)],1),e._v(" "),s("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialog2,callback:function(t){e.dialog2=t},expression:"dialog2"}},[s("v-btn",{staticClass:"mb-0",attrs:{slot:"activator",color:"primary"},slot:"activator"},[e._v("New Order")]),e._v(" "),s("v-card",[s("v-card-title",[s("span",{staticClass:"headline"},[e._v("Create a new order?")])]),e._v(" "),s("v-card-actions",[s("v-spacer"),e._v(" "),e.loading?s("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}}):e._e(),e._v(" "),s("v-btn",{attrs:{color:"error"},nativeOn:{click:function(t){return e.close(t)}}},[e._v("No")]),e._v(" "),s("v-btn",{attrs:{color:"primary"},nativeOn:{click:function(t){return e.createOrder(t)}}},[e._v("Yes")])],1)],1)],1),e._v(" "),s("v-spacer"),e._v(" "),s("v-text-field",{attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),e._v(" "),e.thisOrder.completed?s("v-card",{staticClass:"ma-2"},[s("v-card-text",[e._v("Completed on "+e._s(e.time(e.thisOrder.completeDate)))])],1):e._e(),e._v(" "),s("v-data-table",{attrs:{headers:e.headers,items:e.items,search:e.search,"hide-actions":""},scopedSlots:e._u([{key:"items",fn:function(t){return[s("td",[e._v(e._s(t.item.name))]),e._v(" "),s("td",[e._v(e._s(t.item.vendor))]),e._v(" "),s("td",[e._v(e._s(t.item.catalogNumber))]),e._v(" "),s("td",[e._v(e._s(t.item.itemDescription))]),e._v(" "),s("td",[e._v(e._s(t.item.currentStock))]),e._v(" "),s("td",[e._v(e._s(t.item.reorderQuantity))]),e._v(" "),s("td",{staticClass:"comment",attrs:{id:t.item._id},on:{click:function(s){e.expand(t.item._id)}}},[e._v(e._s(t.item.comment))]),e._v(" "),s("td",[e._v(e._s(e.time(t.item.updatedAt)))])]}}])},[s("template",{slot:"no-data"},[s("v-alert",{attrs:{color:"error",icon:"warning"}},[e._v("Nothing here!")])],1),e._v(" "),s("v-alert",{attrs:{slot:"no-results",value:!0,color:"error",icon:"warning"},slot:"no-results"},[e._v("\n      No results for "+e._s(e.search)+".\n    ")])],2)],1)},staticRenderFns:[]};var L={props:["selection","search","assays","vendors"],components:{AdminInventory:C,UserInventory:U,Order:s("VU/8")(V,E,!1,function(e){s("EW6n")},"data-v-cd26b282",null).exports},data:function(){return{items:[],orders:[]}},computed:l()({},Object(d.b)(["user","admin","drawer"])),watch:{selection:function(){var e=this;return i()(a.a.mark(function t(){var s;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if("order"!==e.search){t.next=10;break}return(s=e.selection.entry).map(function(t){e.orders.push(t.item)}),t.next=5,I(e.orders);case 5:e.items=t.sent.data,e.items.map(function(e){for(var t=0;t<s.length;t++)if(s[t].item===e._id){j()(e,s[t]);break}}),e.orders=[],t.next=13;break;case 10:return t.next=12,w(e.selection,!0,e.search.toLowerCase());case 12:e.items=t.sent.data;case 13:case"end":return t.stop()}},t,e)}))()}}},M={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("v-tabs",{attrs:{dark:""}},[s("v-tab",[e._v("Main")]),e._v(" "),s("v-tab",[e._v("Coming Soon™")])],1),e._v(" "),"order"===e.search?s("order",{attrs:{order:e.selection,items:e.items}}):[e.admin?s("admin-inventory",{attrs:{items:e.items,assays:e.assays,vendors:e.vendors}}):e._e(),e._v(" "),e.user?s("user-inventory",{attrs:{items:e.items,assays:e.assays}}):e._e()]],2)},staticRenderFns:[]};var $=s("VU/8")(L,M,!1,function(e){s("7cAd")},"data-v-79fc24a2",null).exports,F=s("PJh5"),q={data:function(){return{list:[],items:[],assays:[],vendors:[],orders:[],drawerTitle:"",search:"",index:0}},components:{Tabs:$},computed:l()({},Object(d.b)(["user","admin","pageTitle","drawer"])),mounted:function(){var e=this;return i()(a.a.mark(function t(){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f(!0);case 2:return e.assays=t.sent.data,t.next=5,_(!0);case 5:return e.vendors=t.sent.data,t.next=8,b();case 8:e.orders=t.sent.data,e.user?(e.list=e.assays,e.drawerTitle="Assay"):e.admin?(e.vendors.length>0?e.list=e.vendors:e.list=[{name:"Add New Item"}],e.drawerTitle="Vendor"):(e.list=[{name:1},{name:2},{name:3}],e.drawerTitle="Demo");case 10:case"end":return t.stop()}},t,e)}))()},methods:{time:function(e){return F(e).format("MMM-DD-YYYY")},set:function(e){this.$store.dispatch("setTitle",this.list[e].name),this.$store.dispatch("setDrawer"),this.index=e,this.search=this.drawerTitle.toLowerCase(),"vendor"===this.search?this.vendors.length>0?this.list=this.vendors:this.list=[{name:"Add New Item"}]:"assay"===this.search&&(this.list=this.assays),this.items=this.list},viewOrder:function(e){this.$store.dispatch("setTitle","Week of "+this.time(this.orders[e].createdAt)),this.$store.dispatch("setDrawer"),this.index=e,this.search="order",0===this.orders.length?this.items=[{name:"Add New Order"}]:this.items=this.orders}}},Y={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-layout",[s("v-navigation-drawer",{attrs:{clipped:"",app:"",temporary:"",value:e.drawer,"hide-overlay":"",stateless:""}},[s("v-list",[s("v-list-group",[s("v-list-tile",{attrs:{slot:"activator"},slot:"activator"},[s("v-list-tile-title",[e._v(e._s(e.drawerTitle)+" Inventory")])],1),e._v(" "),e._l(e.list,function(t,r){return s("v-list-tile",{key:t.name,on:{click:function(t){e.set(r)}}},[s("v-list-tile-action",[s("v-icon",[e._v("keyboard_arrow_right")])],1),e._v(" "),s("v-list-tile-title",[e._v(e._s(t.name))])],1)})],2),e._v(" "),e.admin?[s("v-list-group",[e.admin?s("v-list-tile",{attrs:{slot:"activator"},slot:"activator"},[s("v-list-tile-title",[e._v("Orders")])],1):e._e(),e._v(" "),e._l(e.orders,function(t,r){return s("v-list-tile",{key:t.createdAt,on:{click:function(t){e.viewOrder(r)}}},[s("v-list-tile-action",[t.completed?s("v-icon",[e._v("check")]):s("v-icon",[e._v("keyboard_arrow_right")])],1),e._v(" "),s("v-list-tile-title",[e._v("Week of "+e._s(e.time(t.createdAt)))])],1)})],2),e._v(" "),s("v-list-group",[s("v-list-tile",{attrs:{slot:"activator"},slot:"activator"},[s("v-list-tile-title",[e._v("Info")])],1),e._v(" "),s("v-list-tile",[s("v-list-tile-action",[s("v-icon",[e._v("keyboard_arrow_right")])],1),e._v(" "),s("v-list-tile-title",[e._v("To be implemented")])],1)],1)]:e._e()],2)],1),e._v(" "),e.drawer?s("v-flex",{attrs:{xs12:"","offset-xs3":""}},[s("tabs",{attrs:{selection:e.items[e.index],assays:e.assays,vendors:e.vendors,search:e.search}})],1):s("v-flex",{attrs:{xs12:""}},[s("tabs",{attrs:{selection:e.items[e.index],assays:e.assays,vendors:e.vendors,search:e.search}})],1)],1)},staticRenderFns:[]};var H=s("VU/8")(q,Y,!1,function(e){s("mKq8")},"data-v-58b9ad2e",null);t.a=H.exports},"7cAd":function(e,t){},"7zck":function(e,t){},AxUS:function(e,t){},EW6n:function(e,t){},G0qU:function(e,t){},NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("7+uW"),a=s("Dd8w"),n=s.n(a),i=s("NYxO"),o=s("PJh5"),l={data:function(){return{time:o().format("MMM DD, YYYY"),title:"Molecular Inventory"}},computed:n()({},Object(i.b)(["pageTitle"])),methods:{login:function(){this.$router.push({path:"/login"})},drawer:function(){this.$store.dispatch("setDrawer")}}},d={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-toolbar",{attrs:{app:"","clipped-left":"",flat:"",dark:""}},[s("v-toolbar-title",[e._v("\n    "+e._s(e.title)+" v.a001\n  ")]),e._v(" "),s("v-spacer"),e._v(" "),s("v-toolbar-items",[s("v-btn",{attrs:{flat:""},nativeOn:{click:function(t){return e.drawer(t)}}},[s("v-icon",[e._v("menu")]),e._v("\n      "+e._s(e.pageTitle)+"\n    ")],1)],1),e._v(" "),s("v-spacer"),e._v(" "),s("v-toolbar-items",[s("v-btn",{attrs:{flat:""},on:{click:e.login}},[e._v("\n      Login\n    ")]),e._v(" "),s("v-btn",{attrs:{flat:""}},[e._v("\n      "+e._s(e.time)+"\n    ")])],1)],1)},staticRenderFns:[]};var c={name:"App",components:{PageHeader:s("VU/8")(l,d,!1,function(e){s("G0qU")},"data-v-4e486a86",null).exports}},u={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("v-app",[t("page-header"),this._v(" "),t("main",[t("v-container",{attrs:{fluid:""}},[t("router-view")],1)],1)],1)],1)},staticRenderFns:[]};var v=s("VU/8")(c,u,!1,function(e){s("+BDF")},null,null).exports,m=s("YaEn"),p=s("3EgV"),f=s.n(p),h=s("9JMe"),_=(s("7zck"),s("424j"));r.a.use(i.a);var x=new i.a.Store({strict:!0,plugins:[Object(_.a)()],state:{users:{user:!0,admin:!0,demo:!0},pageTitle:"",drawer:!0,token:null,userId:null,isUserLoggedIn:!1,isAdminLoggedIn:!1},mutations:{setUser:function(e,t){for(var s in e.users)e[s]=s===t},setTitle:function(e,t){e.pageTitle=t},setDrawer:function(e){e.drawer=!e.drawer}},actions:{setUser:function(e,t){(0,e.commit)("setUser",t)},setTitle:function(e,t){(0,e.commit)("setTitle",t)},setDrawer:function(e){(0,e.commit)("setDrawer")}}});r.a.config.productionTip=!1,r.a.use(f.a),Object(h.sync)(x,m.a),new r.a({el:"#app",router:m.a,store:x,components:{App:v},template:"<App/>"})},YaEn:function(e,t,s){"use strict";(function(e){var r=s("7+uW"),a=s("/ocq"),n=s("42Hy"),i=s("xJsL");r.a.use(a.a),t.a=new a.a({mode:"history",base:e,routes:[{path:"/",name:"index",component:n.a},{path:"/login",name:"login",component:i.a}]})}).call(t,"/")},ct1W:function(e,t){},d57G:function(e,t){},mKq8:function(e,t){},uslO:function(e,t,s){var r={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function a(e){return s(n(e))}function n(e){var t=r[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}a.keys=function(){return Object.keys(r)},a.resolve=n,e.exports=a,a.id="uslO"},xJsL:function(e,t,s){"use strict";var r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-layout",[s("v-flex",{attrs:{xs2:""}}),e._v(" "),s("v-flex",{attrs:{xs8:""}},[s("v-card",[s("v-card-title",[s("h3",{staticClass:"headline"},[e._v("Who are you?")])]),e._v(" "),s("v-card-actions",[s("v-btn",{attrs:{flat:""},on:{click:function(t){e.login("user")}}},[e._v("User")]),e._v(" "),s("v-btn",{attrs:{flat:""},on:{click:function(t){e.login("admin")}}},[e._v("Admin")]),e._v(" "),s("v-btn",{attrs:{flat:""},on:{click:function(t){e.login("demo")}}},[e._v("Demo")])],1)],1)],1),e._v(" "),s("v-flex",{attrs:{xs2:""}})],1)},staticRenderFns:[]};var a=s("VU/8")({methods:{login:function(e){this.$store.dispatch("setUser",e),this.$router.push({name:"index"})}},mounted:function(){this.$store.dispatch("setTitle","")}},r,!1,function(e){s("AxUS")},"data-v-5a6530a5",null);t.a=a.exports}},["NHnr"]);
//# sourceMappingURL=app.d805b247213b399b8ec9.js.map