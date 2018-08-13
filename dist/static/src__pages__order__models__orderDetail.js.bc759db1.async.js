webpackJsonp([5],{GbnL:function(e,t,r){"use strict";function a(e){var t=e.page,r=e.order_status,a=e.find_str,n=new FormData;return n.append("page",t),n.append("limit",y.b),n.append("order_status",r),n.append("find_str",a),Object(b.a)("".concat(y.a,"/home/order/order-list"),{method:"POST",body:n})}function n(){return Object(b.a)("".concat(y.a,"/home/select/customer"),{method:"POST"})}function o(e){var t=e.customer_id,r=new FormData;return r.append("customer_id",t),Object(b.a)("".concat(y.a,"/home/select/site"),{method:"POST",body:r})}function d(){return Object(b.a)("".concat(y.a,"/home/select/supplier"),{method:"POST"})}function c(e){var t=e.supplier_id,r=new FormData;return r.append("supplier_id",t),Object(b.a)("".concat(y.a,"/home/select/goods"),{method:"POST",body:r})}function s(e){var t=e.values,r=new FormData;return h()(t).forEach(function(e,a){r.append(e,t[e])}),Object(b.a)("".concat(y.a,"/home/order/add-order"),{method:"POST",body:r})}function u(e){var t=e.id,r=new FormData;return r.append("id",t),Object(b.a)("".concat(y.a,"/home/order/order-info"),{method:"POST",body:r})}function i(e){var t=new FormData;return h()(e).forEach(function(r,a){t.append(r,e[r])}),Object(b.a)("".concat(y.a,"/home/order/modify-order"),{method:"POST",body:t})}function p(e){var t=e.id,r=new FormData;return r.append("id",t),Object(b.a)("".concat(y.a,"/home/order/pay"),{method:"POST",body:r})}function l(e){var t=e.id,r=new FormData;return r.append("id",t),Object(b.a)("".concat(y.a,"/home/order/cancel-order"),{method:"POST",body:r})}function f(e){var t=new FormData;return h()(e).forEach(function(r,a){t.append(r,e[r])}),Object(b.a)("".concat(y.a,"/home/order/settled"),{method:"POST",body:t})}Object.defineProperty(t,"__esModule",{value:!0}),t.getOrderList=a,t.fetchCustom=n,t.fetchSite=o,t.fetchSupplier=d,t.fetchGoods=c,t.addOrder=s,t.orderInfo=u,t.modifyOrder=i,t.doPay=p,t.cancelOrder=l,t.doResult=f;var m=r("oXS2"),h=r.n(m),b=r("vLgD"),y=r("oiih")},QdHS:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("irdN"),n=r.n(a),o=(r("QX4N"),r("Gj0I")),d=(r("UQ5M"),r("/qCn")),c=r("zIwb"),s=r.n(c),u=r("GbnL"),i=r("7xWd");r.n(i);t.default={namespace:"orderDetail",state:{editable:!1,isSuccess:"success",step:0,detailForm:"",modifyForm:"",modifyId:""},subscriptions:{setup:function(e){var t=e.dispatch;return e.history.listen(function(e){var r=e.pathname;e.query,"/order/orderDetail"===r&&t({type:"save",payload:{editable:!1}})})}},effects:{orderInfo:s.a.mark(function e(t,r){var a,n,o,d,c;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.payload,n=r.call,o=r.put,e.next=4,n(u.orderInfo,a);case 4:if(d=e.sent,c=d.data,1!==c.code){e.next=15;break}return e.next=9,o({type:"order/fetchSelect"});case 9:return e.next=11,o({type:"order/fetchSite",payload:{customer_id:c.data.order.cust_id}});case 11:return e.next=13,o({type:"order/fetchGoods",payload:{supplier_id:c.data.order.supp_id}});case 13:return e.next=15,o({type:"save",payload:{detailForm:c.data.order,step:c.data.order.order_status}});case 15:case"end":return e.stop()}},e,this)}),modifyForm:s.a.mark(function e(t,r){var a,n,c,i,p,l,f,m,h,b;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.payload,n=r.call,c=r.put,i=r.select,e.next=4,i(function(e){return e.orderDetail.modifyForm});case 4:return p=e.sent,e.next=7,i(function(e){return e.orderDetail.modifyId});case 7:if(l=e.sent,f=null,m=!1,p.validateFields(function(e,t){e?m=!0:(delete t.cust_id2,delete t.cust_id3,delete t.delivery,delete t.goods_adress,delete t.goods_contact,delete t.goods_delivery,delete t.goods_source,delete t.adress,delete t.goods_mobile,delete t.lianxidianhua,delete t.qiyuanchandi,delete t.shuliang,delete t.site_id2,delete t.site_id3,delete t.supp_id2,delete t.supp_id3,delete t.xiaoshouyuan,t.recv_time=t.recv_time.format("YYYY-MM-DD hh:00:00"),t.id=l,f=t)}),!m){e.next=14;break}return d.a.warning("\u9a8c\u8bc1\u4e0d\u901a\u8fc7\uff01\u8bf7\u68c0\u67e5\u5b57\u6bb5\u662f\u5426\u7b26\u5408\u8981\u6c42\uff01"),e.abrupt("return",!1);case 14:return e.next=16,n(u.modifyOrder,f);case 16:if(h=e.sent,b=h.data,-1!==b.code){e.next=20;break}return e.abrupt("return",!1);case 20:if(1!==b.code){e.next=26;break}return e.next=23,c({type:"save",payload:{editable:!1}});case 23:o.a.success({message:"\u6e29\u99a8\u63d0\u793a",description:"\u8ba2\u5355\u5df2\u4fee\u6539\uff0c\u8bf7\u786e\u8ba4\u652f\u4ed8",duration:6}),e.next=27;break;case 26:d.a.error(b.msg);case 27:case"end":return e.stop()}},e,this)}),doPay:s.a.mark(function e(t,r){var a,n,o,c,i;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.payload,n=r.call,o=r.put,e.next=4,n(u.doPay,a);case 4:if(c=e.sent,i=c.data,-1!==i.code){e.next=8;break}return e.abrupt("return",!1);case 8:if(1!==i.code){e.next=14;break}return d.a.success(i.msg),e.next=12,o({type:"save",payload:{isSuccess:"success"}});case 12:e.next=17;break;case 14:return d.a.error(i.msg),e.next=17,o({type:"save",payload:{isSuccess:"error"}});case 17:case"end":return e.stop()}},e,this)}),cancelOrder:s.a.mark(function e(t,r){var a,n,o,c,p;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.payload,n=r.call,o=r.put,e.next=4,n(u.cancelOrder,a);case 4:if(c=e.sent,p=c.data,-1!==p.code){e.next=8;break}return e.abrupt("return",!1);case 8:if(1!==p.code){e.next=14;break}return d.a.success(p.msg),e.next=12,o(i.routerRedux.push({pathname:"/order"}));case 12:e.next=15;break;case 14:d.a.error(p.msg);case 15:case"end":return e.stop()}},e,this)}),doResult:s.a.mark(function e(t,r){var a,n,o,c,p;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.payload,n=r.call,o=r.put,e.next=4,n(u.doResult,a);case 4:if(c=e.sent,p=c.data,-1!==p.code){e.next=8;break}return e.abrupt("return",!1);case 8:if(1!==p.code){e.next=13;break}return e.next=11,o(i.routerRedux.push({pathname:"/order"}));case 11:e.next=14;break;case 13:d.a.error(p.msg);case 14:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,t){return n()({},e,t.payload)}}}}});