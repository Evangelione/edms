webpackJsonp([8],{GbnL:function(e,r,t){"use strict";function a(e){var r=e.page,t=e.order_status,a=e.find_str,n=new FormData;return n.append("page",r),n.append("limit",8),n.append("order_status",t),n.append("find_str",a),Object(x.a)("".concat(b.a,"/home/order/order-list"),{method:"POST",body:n})}function n(){return Object(x.a)("".concat(b.a,"/home/select/customer"),{method:"POST"})}function o(e){var r=e.customer_id,t=new FormData;return t.append("customer_id",r),Object(x.a)("".concat(b.a,"/home/select/site"),{method:"POST",body:t})}function s(){return Object(x.a)("".concat(b.a,"/home/select/supplier"),{method:"POST"})}function c(e){var r=e.supplier_id,t=new FormData;return t.append("supplier_id",r),Object(x.a)("".concat(b.a,"/home/select/goods"),{method:"POST",body:t})}function d(e){var r=e.values,t=new FormData;return y()(r).forEach(function(e,a){t.append(e,r[e])}),Object(x.a)("".concat(b.a,"/home/order/add-order"),{method:"POST",body:t})}function u(e){var r=e.id,t=new FormData;return t.append("id",r),Object(x.a)("".concat(b.a,"/home/order/order-info"),{method:"POST",body:t})}function i(e){var r=e.form,t=new FormData;return y()(r).forEach(function(e,a){t.append(e,r[e])}),Object(x.a)("".concat(b.a,"/home/order/modify-order"),{method:"POST",body:t})}function p(e){var r=e.form,t=new FormData;return y()(r).forEach(function(e,a){t.append(e,r[e])}),Object(x.a)("".concat(b.a,"/home/order/confirm-order"),{method:"POST",body:t})}function f(e){var r=e.id,t=new FormData;return t.append("id",r),Object(x.a)("".concat(b.a,"/home/order/pay"),{method:"POST",body:t})}function l(e){var r=e.id,t=new FormData;return t.append("id",r),Object(x.a)("".concat(b.a,"/home/order/cancel-order"),{method:"POST",body:t})}function m(e){var r=new FormData;return y()(e).forEach(function(t,a){r.append(t,e[t])}),Object(x.a)("".concat(b.a,"/home/order/settled"),{method:"POST",body:r})}Object.defineProperty(r,"__esModule",{value:!0}),r.getOrderList=a,r.fetchCustom=n,r.fetchSite=o,r.fetchSupplier=s,r.fetchGoods=c,r.addOrder=d,r.orderInfo=u,r.modifyOrder=i,r.confirmOrder=p,r.doPay=f,r.cancelOrder=l,r.doResult=m;var h=t("oXS2"),y=t.n(h),x=t("vLgD"),b=t("oiih")},QdHS:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=t("irdN"),n=t.n(a),o=(t("QX4N"),t("Gj0I")),s=(t("UQ5M"),t("/qCn")),c=t("zIwb"),d=t.n(c),u=t("GbnL");r.default={namespace:"orderDetail",state:{editable:!1,isSuccess:"success",step:0,detailForm:"",modifyForm:"",modifyId:""},subscriptions:{setup:function(e){var r=e.dispatch;return e.history.listen(function(e){var t=e.pathname;e.query,"/order/orderDetail"===t&&r({type:"save",payload:{editable:!1}})})}},effects:{orderInfo:d.a.mark(function e(r,t){var a,n,o,s,c;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.payload,n=t.call,o=t.put,e.next=4,n(u.orderInfo,a);case 4:if(s=e.sent,c=s.data,1!==c.code){e.next=15;break}return e.next=9,o({type:"order/fetchSelect"});case 9:return e.next=11,o({type:"order/fetchSite",payload:{customer_id:c.data.order.cust_id}});case 11:return e.next=13,o({type:"order/fetchGoods",payload:{supplier_id:c.data.order.supp_id}});case 13:return e.next=15,o({type:"save",payload:{detailForm:c.data.order,step:c.data.order.order_status}});case 15:case"end":return e.stop()}},e,this)}),modifyForm:d.a.mark(function e(r,t){var a,n,c,i,p,f,l,m,h,y;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.payload,n=t.call,c=t.put,i=t.select,e.next=4,i(function(e){return e.orderDetail.modifyForm});case 4:return p=e.sent,e.next=7,i(function(e){return e.orderDetail.modifyId});case 7:if(f=e.sent,l=null,m=!1,p.validateFields(function(e,r){e?m=!0:(delete r.cust_id2,delete r.cust_id3,delete r.delivery,delete r.goods_adress,delete r.goods_contact,delete r.goods_delivery,delete r.goods_source,delete r.adress,delete r.goods_mobile,delete r.lianxidianhua,delete r.qiyuanchandi,delete r.shuliang,delete r.site_id2,delete r.site_id3,delete r.supp_id2,delete r.supp_id3,delete r.xiaoshouyuan,r.recv_time=r.recv_time.format("YYYY-MM-DD hh:00:00"),r.id=f,l=r)}),!m){e.next=14;break}return s.a.warning("\u9a8c\u8bc1\u4e0d\u901a\u8fc7\uff01\u8bf7\u68c0\u67e5\u5b57\u6bb5\u662f\u5426\u7b26\u5408\u8981\u6c42\uff01"),e.abrupt("return",!1);case 14:return e.next=16,n(u.modifyOrder,l);case 16:if(h=e.sent,y=h.data,-1!==y.code){e.next=20;break}return e.abrupt("return",!1);case 20:if(1!==y.code){e.next=26;break}return e.next=23,c({type:"save",payload:{editable:!1}});case 23:o.a.success({message:"\u6e29\u99a8\u63d0\u793a",description:"\u8ba2\u5355\u5df2\u4fee\u6539\uff0c\u8bf7\u786e\u8ba4\u652f\u4ed8",duration:6}),e.next=27;break;case 26:s.a.error(y.msg);case 27:case"end":return e.stop()}},e,this)}),doPay:d.a.mark(function e(r,t){var a,n,o,c,i;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.payload,n=t.call,o=t.put,e.next=4,n(u.doPay,a);case 4:if(c=e.sent,i=c.data,-1!==i.code){e.next=8;break}return e.abrupt("return",!1);case 8:if(1!==i.code){e.next=14;break}return s.a.success(i.msg),e.next=12,o({type:"save",payload:{isSuccess:"success"}});case 12:e.next=17;break;case 14:return s.a.error(i.msg),e.next=17,o({type:"save",payload:{isSuccess:"error"}});case 17:case"end":return e.stop()}},e,this)}),cancelOrder:d.a.mark(function e(r,t){var a,n,o,c,i,p,f,l,m;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.payload,n=t.call,o=t.put,c=t.select,e.next=4,n(u.cancelOrder,a);case 4:return i=e.sent,p=i.data,e.next=8,c(function(e){return e.order.find_str});case 8:return f=e.sent,e.next=11,c(function(e){return e.order.order_status});case 11:return l=e.sent,e.next=14,c(function(e){return e.order.page});case 14:if(m=e.sent,-1!==p.code){e.next=17;break}return e.abrupt("return",!1);case 17:if(1!==p.code){e.next=23;break}return s.a.success(p.msg),e.next=21,o({type:"order/fetch",payload:{find_str:f,order_status:l,page:m}});case 21:e.next=24;break;case 23:s.a.error(p.msg);case 24:case"end":return e.stop()}},e,this)}),doResult:d.a.mark(function e(r,t){var a,n,o,c,i,p,f,l,m;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.payload,n=t.call,o=t.put,c=t.select,e.next=4,n(u.doResult,a);case 4:return i=e.sent,p=i.data,e.next=8,c(function(e){return e.order.find_str});case 8:return f=e.sent,e.next=11,c(function(e){return e.order.order_status});case 11:return l=e.sent,e.next=14,c(function(e){return e.order.page});case 14:if(m=e.sent,-1!==p.code){e.next=17;break}return e.abrupt("return",!1);case 17:if(1!==p.code){e.next=23;break}return s.a.success(p.msg),e.next=21,o({type:"order/fetch",payload:{find_str:f,order_status:l,page:m}});case 21:e.next=24;break;case 23:s.a.error(p.msg);case 24:case"end":return e.stop()}},e,this)}),modifySave:d.a.mark(function e(r,t){var a,n,o,c,i,p,f,l,m;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.payload.form,n=t.call,o=t.put,c=t.select,e.next=4,n(u.modifyOrder,{form:a});case 4:return i=e.sent,p=i.data,e.next=8,c(function(e){return e.order.find_str});case 8:return f=e.sent,e.next=11,c(function(e){return e.order.order_status});case 11:return l=e.sent,e.next=14,c(function(e){return e.order.page});case 14:if(m=e.sent,-1!==p.code){e.next=17;break}return e.abrupt("return",!1);case 17:if(1!==p.code){e.next=23;break}return s.a.success(p.msg),e.next=21,o({type:"order/fetch",payload:{find_str:f,order_status:l,page:m}});case 21:e.next=24;break;case 23:s.a.error(p.msg);case 24:case"end":return e.stop()}},e,this)}),confirmOrder:d.a.mark(function e(r,t){var a,n,o,c,i,p,f,l,m;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.payload.form,n=t.call,o=t.put,c=t.select,e.next=4,n(u.confirmOrder,{form:a});case 4:return i=e.sent,p=i.data,e.next=8,c(function(e){return e.order.find_str});case 8:return f=e.sent,e.next=11,c(function(e){return e.order.order_status});case 11:return l=e.sent,e.next=14,c(function(e){return e.order.page});case 14:if(m=e.sent,-1!==p.code){e.next=17;break}return e.abrupt("return",!1);case 17:if(1!==p.code){e.next=23;break}return s.a.success(p.msg),e.next=21,o({type:"order/fetch",payload:{find_str:f,order_status:l,page:m}});case 21:e.next=24;break;case 23:s.a.error(p.msg);case 24:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,r){return n()({},e,r.payload)}}}}});