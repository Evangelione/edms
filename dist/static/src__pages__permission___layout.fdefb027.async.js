webpackJsonp([16,18],{"/mHU":function(e,t,a){"use strict";function n(){}Object.defineProperty(t,"__esModule",{value:!0});var r=a("Dd8w"),i=a.n(r),l=a("bOdI"),o=a.n(l),s=a("+6Bu"),c=a.n(s),d=a("Zrlr"),p=a.n(d),u=a("wxAW"),m=a.n(u),h=a("zwoO"),f=a.n(h),y=a("Pf15"),g=a.n(y),v=a("GiK3"),b=a.n(v),E=a("KSGD"),k=a.n(E),x=a("HW6M"),w=function(e){function t(e){p()(this,t);var a=f()(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));C.call(a);var n=!1;return n="checked"in e?!!e.checked:!!e.defaultChecked,a.state={checked:n},a}return g()(t,e),m()(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.autoFocus,a=e.disabled;t&&!a&&this.focus()}},{key:"componentWillReceiveProps",value:function(e){"checked"in e&&this.setState({checked:!!e.checked})}},{key:"setChecked",value:function(e){this.props.disabled||("checked"in this.props||this.setState({checked:e}),this.props.onChange(e))}},{key:"focus",value:function(){this.node.focus()}},{key:"blur",value:function(){this.node.blur()}},{key:"render",value:function(){var e,t=this.props,a=t.className,n=t.prefixCls,r=t.disabled,l=t.loadingIcon,s=t.checkedChildren,d=t.unCheckedChildren,p=c()(t,["className","prefixCls","disabled","loadingIcon","checkedChildren","unCheckedChildren"]),u=this.state.checked,m=x((e={},o()(e,a,!!a),o()(e,n,!0),o()(e,n+"-checked",u),o()(e,n+"-disabled",r),e));return b.a.createElement("button",i()({},p,{type:"button",role:"switch","aria-checked":u,disabled:r,className:m,ref:this.saveNode,onKeyDown:this.handleKeyDown,onClick:this.toggle,onMouseUp:this.handleMouseUp}),l,b.a.createElement("span",{className:n+"-inner"},u?s:d))}}]),t}(v.Component),C=function(){var e=this;this.toggle=function(){var t=e.props.onClick,a=!e.state.checked;e.setChecked(a),t(a)},this.handleKeyDown=function(t){37===t.keyCode?e.setChecked(!1):39===t.keyCode&&e.setChecked(!0)},this.handleMouseUp=function(t){e.node&&e.node.blur(),e.props.onMouseUp&&e.props.onMouseUp(t)},this.saveNode=function(t){e.node=t}};w.propTypes={className:k.a.string,prefixCls:k.a.string,disabled:k.a.bool,checkedChildren:k.a.any,unCheckedChildren:k.a.any,onChange:k.a.func,onMouseUp:k.a.func,onClick:k.a.func,tabIndex:k.a.number,checked:k.a.bool,defaultChecked:k.a.bool,autoFocus:k.a.bool,loadingIcon:k.a.node},w.defaultProps={prefixCls:"rc-switch",checkedChildren:null,unCheckedChildren:null,className:"",defaultChecked:!1,onChange:n,onClick:n},t.default=w},"5sPT":function(e,t,a){"use strict";function n(e){var t=e.page,a=e.find_auth,n=e.find_str,r=new FormData;return r.append("page",t),r.append("limit",p.c),r.append("find_auth",a),r.append("find_str",n),Object(d.a)("".concat(p.a,"/admin/user/user-list"),{method:"POST",body:r})}function r(e){var t=e.file,a=new FormData;return a.append(t.filename,t.file),Object(d.a)(t.action,{method:"POST",body:a})}function i(e){var t=e.form,a=new FormData;return c()(t).forEach(function(e,n){a.append(e,t[e])}),Object(d.a)("".concat(p.a,"/admin/user/add-user"),{method:"POST",body:a})}function l(e){var t=e.form,a=new FormData;return c()(t).forEach(function(e,n){a.append(e,t[e])}),Object(d.a)("".concat(p.a,"/admin/user/modify-user"),{method:"POST",body:a})}function o(e){var t=e.id,a=new FormData;return a.append("id",t.id),Object(d.a)("".concat(p.a,"/admin/user/forbidden"),{method:"POST",body:a})}Object.defineProperty(t,"__esModule",{value:!0}),t.getPermissionList=n,t.postAvatar=r,t.insertUser=i,t.modifyUser=l,t.forbiddenControl=o;var s=a("qO4g"),c=a.n(s),d=a("vLgD"),p=a("oiih")},DSNT:function(e,t,a){e.exports=a("/mHU")},EaCm:function(e,t,a){"use strict";a.d(t,"b",function(){return l}),a.d(t,"a",function(){return o}),a.d(t,"c",function(){return s}),a.d(t,"d",function(){return c});var n=(a("baa2"),a("FC3+")),r=a("GiK3"),i=(a.n(r),a("V++0")),l=(a.n(i),{name:"^[\\u4e00-\\u9fa5]+$",number:"^[0-9.]*$",account:"^[A-Za-z0-9]{1,30}$",password:"^(\\w){6,16}$",phone:"^[1][3-9][0-9]{9}$"}),o=(a("4cW9"),a("2EOW"),a("4cW9"),a("4cW9"),a("4cW9"),n.a.createFromIconfontCN({scriptUrl:"//at.alicdn.com/t/font_867488_bylrczpel5m.js"})),s=[{name:"icon-icon-test3",value:"\u5168\u90e8",status:"",count:"qb"},{name:"icon-icon-test5",value:"\u5f85\u786e\u8ba4",status:"0",count:"dqr"},{name:"icon-icon-test9",value:"\u5f85\u652f\u4ed8",status:"1",count:"dzf"},{name:"icon-icon-test1",value:"\u5f85\u53d1\u8d27",status:"2",count:"dfh"},{name:"icon-icon-test",value:"\u5f85\u6536\u8d27",status:"3",count:"dsh"},{name:"icon-icon-test2",value:"\u5f85\u7ed3\u7b97",status:"4",count:"djs"},{name:"icon-icon-test7",value:"\u5df2\u5b8c\u6210",status:"5",count:"ywc"},{name:"icon-icon-test6",value:"\u5df2\u53d6\u6d88",status:"6",count:"yqx"}],c=["\u8d38\u6613\u5546","\u8fd0\u8d38\u5546","\u6db2\u5382","\u63a5\u6536\u7ad9"]},M1go:function(e,t){},TUcx:function(e,t,a){"use strict";function n(e){var t=e.permission,a=t.list,n=t.total;return{list:a,page:t.page,total:n,currentTab:t.currentTab,find_auth:t.find_auth,find_str:t.find_str,loading:e.loading.models.permission}}Object.defineProperty(t,"__esModule",{value:!0});var r=(a("GKDd"),a("BJfm")),i=(a("HCp1"),a("GWr5")),l=(a("jIi2"),a("hRRF")),o=(a("crfj"),a("zwGx")),s=(a("LHBr"),a("A+AJ")),c=(a("yQBS"),a("qA/u")),d=a("GiK3"),p=a.n(d),u=a("S6G3"),m=(a.n(u),a("z5+k")),h=a("YA4M"),f=a("7xWd"),y=(a.n(f),a("oiih")),g=a("Amik"),v=a("8O4S"),b=c.a.TabPane,E=s.a.Search;t.default=Object(u.connect)(n)(function(e){function t(e,t){if(C)return!1;d({type:"permission/save",payload:{currentTab:e}}),d({type:"permission/fetch",payload:{find_auth:t,find_str:N}})}function a(e,t){d({type:"permission/save",payload:{editForm:t}}),d(f.routerRedux.push({pathname:"/permission/operateUser",query:{type:e}}))}function n(e){d(f.routerRedux.push({pathname:"/permission",query:{page:e}}))}function s(e){d({type:"permission/fetch",payload:{find_str:e,find_auth:T}})}var d=e.dispatch,u=e.location,k=e.list,x=e.page,w=e.total,C=e.loading,_=e.currentTab,T=e.find_auth,N=e.find_str,O=[{title:"\u5934\u50cf",dataIndex:"head_img",key:"head_img",align:"center",render:function(e,t,a){return p.a.createElement("div",{className:"avatar"},p.a.createElement("img",{src:e,alt:""}))}},{title:"\u59d3\u540d",dataIndex:"name",key:"name",align:"center"},{title:"\u624b\u673a\u53f7",dataIndex:"mobile",key:"mobile",align:"center"},{title:"\u8d26\u53f7",dataIndex:"account",key:"account",align:"center"},{title:"\u89d2\u8272",dataIndex:"role",key:"role",align:"center"},{title:"\u6743\u9650",dataIndex:"auth",key:"auth",align:"center",render:function(e,t,a){var n="";return 0!=(e-0&1)&&(n+="\u6211\u7684\u8ba2\u5355,"),0!=(e-0&2)&&(n+="\u6211\u7684\u7269\u6d41,"),0!=(e-0&4)&&(n+="\u6211\u7684\u8d26\u52a1,"),0!=(e-0&8)&&(n+="\u6211\u7684\u5ba2\u6237,"),0!=(e-0&16)&&(n+="\u6211\u7684\u4f9b\u5e94\u5546,"),0!=(e-0&32)&&(n+="\u6211\u7684\u516c\u53f8,"),0!=(e-0&64)&&(n+="app\u8fd0\u8425\u6570\u636e,"),n.endsWith(",")&&(n=n.slice(0,n.length-1)),p.a.createElement("div",{className:"txt-overflow",title:n},n)}},{title:"\u521b\u5efa\u65f6\u95f4",dataIndex:"creation_time",key:"creation_time",align:"center",width:120,render:function(e,t,a){if(e){var n=g.a(e),r=g.b(e);return p.a.createElement("div",null,p.a.createElement("div",null,r),p.a.createElement("div",{style:{fontSize:14,color:"#ccc"}},n))}return p.a.createElement("div",null,"--")}},{title:"\u64cd\u4f5c",align:"center",key:"createdAt",render:function(e,t,n){return p.a.createElement("div",null,p.a.createElement(o.a,{className:"blueBorder",onClick:a.bind(null,"edit",t),size:"small"},"\u7f16\u8f91"))}},{title:"\u72b6\u6001",align:"center",key:"status1",render:function(e,t,a){return p.a.createElement("div",null,"1"===t.forbidden?p.a.createElement(m.a,{state:"disableAccount",id:t.id,type:"\u7981\u7528",foruser:!0},p.a.createElement(o.a,{style:{background:"#EA7878",borderColor:"#EA7878",height:28,padding:"0 15px"},type:"primary",size:"small"},"\u7981\u7528")):p.a.createElement(m.a,{state:"disableAccount",id:t.id,type:"\u542f\u7528",foruser:!0},p.a.createElement(o.a,{style:{background:"#59C694",borderColor:"#59C694",height:28,padding:"0 15px"},type:"primary",size:"small"},"\u542f\u7528")))}}];return p.a.createElement(v.a,null,"/permission"===u.pathname?p.a.createElement("div",null,p.a.createElement("div",{className:"searchBox"},p.a.createElement(E,{style:{width:260,marginLeft:10},placeholder:"\u8f93\u5165\u5173\u952e\u5b57\u8fdb\u884c\u67e5\u8be2",onSearch:s})),p.a.createElement(c.a,null,p.a.createElement(b,{tab:"\u7528\u6237\u6743\u9650\u8bbe\u7f6e",key:"1"},p.a.createElement(l.a,null,p.a.createElement("div",{className:"toolBar",style:{top:20}},p.a.createElement(o.a,{className:"blueBorder",icon:"plus",onClick:a.bind(null,"insert")},"\u65b0\u589e\u7528\u6237")),p.a.createElement("div",{className:"changeList"},p.a.createElement("div",{onClick:t.bind(null,"quanbu",""),className:"quanbu"===_?"blueBG ":"grayBG"},p.a.createElement("span",{className:"quanbu"===_?"quanbuBlue ":"quanbuGray"}),p.a.createElement("span",{style:{paddingLeft:8}},"\u5168\u90e8")),p.a.createElement("div",{onClick:t.bind(null,"wodedingdan","1"),className:"wodedingdan"===_?"blueBG ":"grayBG"},p.a.createElement("span",{className:"wodedingdan"===_?"daizhifuBlue ":"daizhifuGray"}),p.a.createElement("span",{style:{paddingLeft:8}},"\u6211\u7684\u8ba2\u5355")),p.a.createElement("div",{onClick:t.bind(null,"wodewuliu","2"),className:"wodewuliu"===_?"blueBG ":"grayBG"},p.a.createElement("span",{className:"wodewuliu"===_?"daifahuoBlue ":"daifahuoGray"}),p.a.createElement("span",{style:{paddingLeft:8}},"\u6211\u7684\u7269\u6d41")),p.a.createElement("div",{onClick:t.bind(null,"wodezhangwu","4"),className:"wodezhangwu"===_?"blueBG ":"grayBG"},p.a.createElement("span",{className:"wodezhangwu"===_?"daishouhuoBlue ":"daishouhuoGray"}),p.a.createElement("span",{style:{paddingLeft:8}},"\u6211\u7684\u8d26\u52a1")),p.a.createElement("div",{onClick:t.bind(null,"wodekehu","8"),className:"wodekehu"===_?"blueBG ":"grayBG"},p.a.createElement("span",{className:"wodekehu"===_?"daijiesuanBlue ":"daijiesuanGray"}),p.a.createElement("span",{style:{paddingLeft:8}},"\u6211\u7684\u5ba2\u6237")),p.a.createElement("div",{onClick:t.bind(null,"wodegongyingshang","16"),className:"wodegongyingshang"===_?"blueBG ":"grayBG"},p.a.createElement("span",{className:"wodegongyingshang"===_?"yijiesuanBlue ":"yijiesuanGray"}),p.a.createElement("span",{style:{paddingLeft:8}},"\u6211\u7684\u4f9b\u5e94\u5546")),p.a.createElement("div",{onClick:t.bind(null,"wodegongsi","32"),className:"wodegongsi"===_?"blueBG ":"grayBG"},p.a.createElement("span",{className:"wodegongsi"===_?"yijiesuanBlue ":"yijiesuanGray"}),p.a.createElement("span",{style:{paddingLeft:8}},"\u6211\u7684\u516c\u53f8")))))),p.a.createElement(l.a,{style:{marginTop:5}},p.a.createElement(i.a,{columns:O,dataSource:k,rowKey:function(e){return e.id},pagination:!1,loading:C}),p.a.createElement(r.a,{className:"ant-table-pagination",total:w,current:x,pageSize:y.c,onChange:n}))):"/permission/operateUser"===u.pathname?p.a.createElement(h.default,null):"")})},YA4M:function(e,t,a){"use strict";function n(e){var t=e.permission;return{imgUrl:t.imgUrl,editForm:t.editForm}}Object.defineProperty(t,"__esModule",{value:!0});var r=(a("jIi2"),a("hRRF")),i=(a("crfj"),a("zwGx")),l=(a("vtiu"),a("b5vB"),a("Dd8w")),o=a.n(l),s=a("bOdI"),c=a.n(s),d=a("Zrlr"),p=a.n(d),u=a("wxAW"),m=a.n(u),h=a("zwoO"),f=a.n(h),y=a("Pf15"),g=a.n(y),v=a("GiK3"),b=a.n(v),E=a("KSGD"),k=a("DSNT"),x=a.n(k),w=a("HW6M"),C=a.n(w),_=a("JkBm"),T=a("J7eb"),N=a("FC3+"),O=function(e){function t(){p()(this,t);var e=f()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.saveSwitch=function(t){e.rcSwitch=t},e}return g()(t,e),m()(t,[{key:"focus",value:function(){this.rcSwitch.focus()}},{key:"blur",value:function(){this.rcSwitch.blur()}},{key:"render",value:function(){var e,t=this.props,a=t.prefixCls,n=t.size,r=t.loading,i=t.className,l=void 0===i?"":i,s=C()(l,(e={},c()(e,a+"-small","small"===n),c()(e,a+"-loading",r),e)),d=r?v.createElement(N.a,{type:"loading",className:a+"-loading-icon"}):null;return v.createElement(T.a,{insertExtraNode:!0},v.createElement(x.a,o()({},Object(_.a)(this.props,["loading"]),{className:s,ref:this.saveSwitch,loadingIcon:d})))}}]),t}(v.Component),F=O;O.defaultProps={prefixCls:"ant-switch"},O.propTypes={prefixCls:E.string,size:E.oneOf(["small","default","large"]),className:E.string};var S=(a("faxx"),a("FV1P")),P=(a("LHBr"),a("A+AJ")),B=(a("JYrs"),a("QoDT")),H=a("lt8z"),G=a.n(H),D=(a("sRCI"),a("vnWH")),j=(a("scXE"),a("DYcq")),I=(a("taDj"),a("lVw4")),q=(a("baa2"),a("qO4g")),L=a.n(q),A=a("Z60a"),z=a.n(A),M=a("j/rp"),U=a.n(M),R=a("C9uT"),V=a.n(R),W=a("T/v0"),K=a.n(W),J=a("tNLN"),Y=a.n(J),Z=(a("gZEk"),a("8rR3")),$=a("S6G3"),Q=a("81yA"),X=a("rp7U"),ee=a.n(X),te=a("oiih"),ae=a("7xWd"),ne=a("EaCm"),re=Z.a.Item,ie=function(e){function t(e){var a;return z()(this,t),a=K()(this,Y()(t).call(this,e)),a.handleCancel=function(){return a.setState({previewVisible:!1})},a.handlePreview=function(e){a.setState({previewImage:e.url||e.thumbUrl,previewVisible:!0})},a.handleChange=function(e){var t=e.fileList;return a.setState({fileList:t})},a.saveForm=function(){a.props.form.validateFields(function(e,t){if(!e){var n=0;!0===t.wddd?n+=1:n+=0,!0===t.wdwl?n+=2:n+=0,!0===t.wdzw?n+=4:n+=0,!0===t.wdkh?n+=8:n+=0,!0===t.wdgys?n+=16:n+=0,!0===t.wdgs?n+=32:n+=0,!0===t.app?n+=64:n+=0,0===a.state.fileList.length?t.head_img="":t.head_img=a.props.imgUrl?a.props.imgUrl:a.state.fileList[0].url,delete t.wddd,delete t.wdwl,delete t.wdzw,delete t.wdkh,delete t.wdgys,delete t.wdgs,delete t.app,t.auth=n.toString(),void 0===t.pwd&&(t.pwd=""),"insert"===a.props.location.query.type?a.props.dispatch({type:"permission/insertAdmin",payload:t}):(t.id=a.props.editForm.id,a.props.dispatch({type:"permission/modifyAdmin",payload:t}))}})},a.cacelForm=function(){a.props.form.resetFields(),a.props.dispatch(ae.routerRedux.push({pathname:"/permission"}))},a.onRemove=function(){if(!1===a.state.editable)return!1},a.customRequest=function(e){a.props.dispatch({type:"permission/postAvatar",payload:e})},a.state={editable:!0,previewVisible:!1,previewImage:"",fileList:[{uid:-1,name:"avatar.png",status:"done",url:a.props.editForm.head_img}]},a}return V()(t,[{key:"componentDidMount",value:function(){"edit"===this.props.location.query.type?L()(this.props.editForm).length||this.props.dispatch(ae.routerRedux.push({pathname:"/permission"})):this.setState({fileList:[]})}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator,t=this.state,a=t.previewVisible,n=t.previewImage,l=t.fileList,o={labelCol:{span:2},wrapperCol:{span:5}},s={labelCol:{span:12},wrapperCol:{span:12}},c=b.a.createElement("div",null,b.a.createElement(N.a,{type:"plus"}),b.a.createElement("div",{className:"ant-upload-text"},"\u4ec5\u652f\u6301JPG\u3001PNG\u683c\u5f0f\uff0c\u6587\u4ef6\u5c0f\u4e8e2MB")),d="edit"===this.props.location.query.type?"\u7f16\u8f91":"\u65b0\u589e";return b.a.createElement("div",null,b.a.createElement("div",null,b.a.createElement(Q.a,null,d,"\u7528\u6237"),b.a.createElement(r.a,null,b.a.createElement(Z.a,null,b.a.createElement("div",{className:"itemTitle"},"1.\u7528\u6237\u4fe1\u606f"),b.a.createElement(I.a,null),b.a.createElement(S.a,{style:{marginTop:35}},b.a.createElement(B.a,{span:24},b.a.createElement(re,G()({label:"\u5934\u50cf"},o),e("head_img")(b.a.createElement("div",null,b.a.createElement(j.a,{action:"".concat(te.a,"/admin/user/img"),listType:"picture-card",name:"UserForm[img]",fileList:l,onPreview:this.handlePreview,onChange:this.handleChange,onRemove:this.onRemove,customRequest:this.customRequest},l.length>=1?null:c),b.a.createElement(D.a,{visible:a,footer:null,onCancel:this.handleCancel},b.a.createElement("img",{alt:"example",style:{width:"100%"},src:n})))))),b.a.createElement(B.a,{span:24},b.a.createElement(re,G()({label:"\u59d3\u540d"},o),e("name",{initialValue:this.props.editForm.name?this.props.editForm.name:"",rules:[{required:!0,message:"\u8bf7\u586b\u5199\u771f\u5b9e\u59d3\u540d!",pattern:ne.b.name}]})(b.a.createElement(P.a,{placeholder:"\u8bf7\u586b\u5199\u771f\u5b9e\u59d3\u540d"})))),b.a.createElement(B.a,{span:24},b.a.createElement(re,G()({label:"\u624b\u673a\u53f7"},o),e("mobile",{initialValue:this.props.editForm.mobile?this.props.editForm.mobile:"",rules:[{message:"\u8bf7\u586b\u5199\u6b63\u786e\u624b\u673a\u53f7\uff01",max:11,pattern:ne.b.phone}],validateTrigger:"onBlur"})(b.a.createElement(P.a,{placeholder:"\u8bf7\u586b\u5199\u624b\u673a\u53f7"}))))),b.a.createElement("div",{className:"itemTitle"},"2.\u8d26\u53f7\u5bc6\u7801"),b.a.createElement(I.a,null),b.a.createElement(S.a,{style:{marginTop:35}},b.a.createElement(B.a,{span:24},b.a.createElement(re,G()({label:"\u8d26\u53f7"},o),e("account",{initialValue:this.props.editForm.account?this.props.editForm.account:"",rules:[{required:!0,message:"\u8bf7\u586b\u5199\u6b63\u786e\u8d26\u53f7\uff01",max:30,pattern:ne.b.account}],validateTrigger:"onBlur"})(b.a.createElement(P.a,{placeholder:"\u53ea\u652f\u6301\u82f1\u6587/\u6570\u5b57"})))),b.a.createElement(B.a,{span:24},b.a.createElement(re,G()({label:"\u5bc6\u7801"},o),e("pwd",{rules:[{required:!1,message:"\u8bf7\u586b\u5199\u6b63\u786e\u5bc6\u7801\uff01",min:6,max:16,pattern:ne.b.password}],validateTrigger:"onBlur"})(b.a.createElement(P.a,{placeholder:"6-16\u4f4d\u5b57\u6bcd/\u6570\u5b57/\u4e0b\u5212\u7ebf",type:"password"}))))),b.a.createElement("div",{className:"itemTitle"},"3.\u7528\u6237\u89d2\u8272"),b.a.createElement(I.a,null),b.a.createElement(S.a,{style:{marginTop:35}},b.a.createElement(B.a,{span:24},b.a.createElement(re,G()({label:"\u89d2\u8272\u540d\u79f0"},o),e("role",{initialValue:this.props.editForm.role?this.props.editForm.role:"",rules:[{required:!0,message:"\u8bf7\u586b\u89d2\u8272\u540d\u79f0\uff01",max:6,pattern:ne.b.name}],validateTrigger:"onBlur"})(b.a.createElement(P.a,{placeholder:"\u8bf7\u8f93\u5165\u89d2\u8272\u540d\u79f0\uff0c\u4f8b\uff1a\u9500\u552e"}))))),b.a.createElement("div",{className:"itemTitle"},"4.\u89d2\u8272\u6743\u9650"),b.a.createElement(I.a,null),b.a.createElement(S.a,{style:{marginTop:35}},b.a.createElement(B.a,{span:5},b.a.createElement(re,G()({label:"\u6211\u7684\u8ba2\u5355"},s),e("wddd",{valuePropName:"checked",initialValue:!this.props.editForm.auth||0!=(this.props.editForm.auth-0&1)})(b.a.createElement(F,null)))),b.a.createElement(B.a,{span:5},b.a.createElement(re,G()({label:"\u6211\u7684\u7269\u6d41"},s),e("wdwl",{valuePropName:"checked",initialValue:!this.props.editForm.auth||0!=(this.props.editForm.auth-0&2)})(b.a.createElement(F,null)))),b.a.createElement(B.a,{span:5},b.a.createElement(re,G()({label:"\u6211\u7684\u8d26\u52a1"},s),e("wdzw",{valuePropName:"checked",initialValue:!this.props.editForm.auth||0!=(this.props.editForm.auth-0&4)})(b.a.createElement(F,null))))),b.a.createElement(S.a,{style:{marginTop:35}},b.a.createElement(B.a,{span:5},b.a.createElement(re,G()({label:"\u6211\u7684\u5ba2\u6237"},s),e("wdkh",{valuePropName:"checked",initialValue:!this.props.editForm.auth||0!=(this.props.editForm.auth-0&8)})(b.a.createElement(F,null)))),b.a.createElement(B.a,{span:5},b.a.createElement(re,G()({label:"\u6211\u7684\u4f9b\u5e94\u5546"},s),e("wdgys",{valuePropName:"checked",initialValue:!this.props.editForm.auth||0!=(this.props.editForm.auth-0&16)})(b.a.createElement(F,null)))),b.a.createElement(B.a,{span:5},b.a.createElement(re,G()({label:"\u6211\u7684\u516c\u53f8"},s),e("wdgs",{valuePropName:"checked",initialValue:!this.props.editForm.auth||0!=(this.props.editForm.auth-0&32)})(b.a.createElement(F,null))))),b.a.createElement(S.a,{style:{marginTop:35}},b.a.createElement(B.a,{span:5},b.a.createElement(re,G()({label:"app\u8fd0\u8425\u6570\u636e"},s),e("app",{valuePropName:"checked",initialValue:!this.props.editForm.auth||0!=(this.props.editForm.auth-0&64)})(b.a.createElement(F,null))))),b.a.createElement(S.a,{style:{width:500,margin:"42px 0 20px 85px"}},b.a.createElement(B.a,{span:5,offset:2},b.a.createElement(i.a,{className:"grayButton",style:{width:100},onClick:this.cacelForm},"\u53d6\u6d88")),b.a.createElement(B.a,{span:5,offset:2},b.a.createElement(i.a,{type:"primary",style:{width:100},onClick:this.saveForm},"\u4fdd\u5b58")))))))}}]),U()(t,e),t}(b.a.Component);t.default=Z.a.create()(Object($.connect)(n)(ee()(ie)))},b5vB:function(e,t){},g7Od:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Biqn"),r=a.n(n),i=(a("UQ5M"),a("/qCn")),l=a("En79"),o=a.n(l),s=a("5sPT"),c=a("7xWd");a.n(c);t.default={namespace:"permission",state:{list:[],page:1,total:0,imgUrl:"",editForm:{},find_auth:"",find_str:"",currentTab:"quanbu"},subscriptions:{setup:function(e){var t=e.dispatch;return e.history.listen(function(e){var a=e.pathname,n=e.query;"/permission"===a&&t({type:"fetch",payload:n})})}},effects:{fetch:o.a.mark(function e(t,a){var n,r,i,l,c,d,p,u,m,h,f;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.payload,r=n.page,i=void 0===r?1:r,l=n.find_auth,c=void 0===l?"":l,d=n.find_str,p=void 0===d?"":d,u=a.call,m=a.put,e.next=4,u(s.getPermissionList,{page:i,find_auth:c,find_str:p});case 4:if(h=e.sent,f=h.data,1!==f.code){e.next=9;break}return e.next=9,m({type:"save",payload:{list:f.data.list,total:parseInt(f.data.count,10),page:parseInt(i,10),find_auth:c,find_str:p}});case 9:case"end":return e.stop()}},e,this)}),postAvatar:o.a.mark(function e(t,a){var n,r,i,l,c;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,i=a.put,e.next=4,r(s.postAvatar,{file:n});case 4:if(l=e.sent,c=l.data,1!==c.code){e.next=11;break}return e.next=9,i({type:"save",payload:{imgUrl:c.url}});case 9:n.onProgress({percent:100}),n.onSuccess();case 11:case"end":return e.stop()}},e,this)}),insertAdmin:o.a.mark(function e(t,a){var n,r,l,d,p;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,l=a.put,e.next=4,r(s.insertUser,{form:n});case 4:if(d=e.sent,p=d.data,-2!==p.code){e.next=8;break}return e.abrupt("return",!1);case 8:if(1!==p.code){e.next=16;break}return i.a.success(p.msg),e.next=12,l({type:"save",payload:{currentTab:"quanbu"}});case 12:return e.next=14,l(c.routerRedux.push({pathname:"/permission"}));case 14:e.next=17;break;case 16:i.a.error(p.msg);case 17:case"end":return e.stop()}},e,this)}),modifyAdmin:o.a.mark(function e(t,a){var n,r,l,d,p;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,l=a.put,e.next=4,r(s.modifyUser,{form:n});case 4:if(d=e.sent,p=d.data,-2!==p.code){e.next=8;break}return e.abrupt("return",!1);case 8:if(1!==p.code){e.next=16;break}return i.a.success(p.msg),e.next=12,l({type:"save",payload:{currentTab:"quanbu"}});case 12:return e.next=14,l(c.routerRedux.push({pathname:"/permission"}));case 14:e.next=17;break;case 16:i.a.error(p.msg);case 17:case"end":return e.stop()}},e,this)}),forbiddenControl:o.a.mark(function e(t,a){var n,r,l,c,d,p,u,m,h;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,l=a.put,c=a.select,e.next=4,r(s.forbiddenControl,{id:n});case 4:if(d=e.sent,p=d.data,-2!==p.code){e.next=8;break}return e.abrupt("return",!1);case 8:if(1!==p.code){e.next=23;break}return i.a.success(p.msg),e.next=12,c(function(e){return e.backstage.page});case 12:return u=e.sent,e.next=15,c(function(e){return e.backstage.find_auth});case 15:return m=e.sent,e.next=18,c(function(e){return e.backstage.find_str});case 18:return h=e.sent,e.next=21,l({type:"fetch",payload:{page:u,find_auth:m,find_str:h}});case 21:e.next=24;break;case 23:i.a.error(p.msg);case 24:case"end":return e.stop()}},e,this)})},reducers:{save:function(e,t){return r()({},e,t.payload)}}}},lVw4:function(e,t,a){"use strict";function n(e){var t,a=e.prefixCls,n=void 0===a?"ant":a,r=e.type,l=void 0===r?"horizontal":r,c=e.orientation,u=void 0===c?"":c,m=e.className,h=e.children,f=e.dashed,y=p(e,["prefixCls","type","orientation","className","children","dashed"]),g=u.length>0?"-"+u:u,v=d()(m,n+"-divider",n+"-divider-"+l,(t={},o()(t,n+"-divider-with-text"+g,h),o()(t,n+"-divider-dashed",!!f),t));return s.createElement("div",i()({className:v},y),h&&s.createElement("span",{className:n+"-divider-inner-text"},h))}t.a=n;var r=a("Dd8w"),i=a.n(r),l=a("bOdI"),o=a.n(l),s=a("GiK3"),c=(a.n(s),a("HW6M")),d=a.n(c),p=this&&this.__rest||function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&(a[n[r]]=e[n[r]]);return a}},taDj:function(e,t,a){"use strict";var n=a("vtiu"),r=(a.n(n),a("M1go"));a.n(r)},"z5+k":function(e,t,a){"use strict";function n(e){return{loading:e.loading.models.logisticsDetail}}var r=(a("sRCI"),a("vnWH")),i=(a("faxx"),a("FV1P")),l=(a("JYrs"),a("QoDT")),o=(a("crfj"),a("zwGx")),s=a("Z60a"),c=a.n(s),d=a("j/rp"),p=a.n(d),u=a("C9uT"),m=a.n(u),h=a("T/v0"),f=a.n(h),y=a("tNLN"),g=a.n(y),v=a("GiK3"),b=a.n(v),E=a("S6G3"),k=(a.n(E),a("7xWd")),x=(a.n(k),a("iXYn")),w=function(e){function t(e){var a;return c()(this,t),a=f()(this,g()(t).call(this,e)),a.deleteOrder=function(){a.props.dispatch({type:"order/delOrder",payload:{id:a.props.delOrderId}})},a.successHandler=function(){a.props.dispatch(k.routerRedux.push({pathname:"/order/doOrder"})),a.props.dispatch({type:"orderDetail/changeOpenState",payload:{openState:!1}})},a.errorHandler=function(){a.props.dispatch(k.routerRedux.push({pathname:"/order"})).then(function(){a.setState({visible:!1})})},a.orderCancelHandler=function(){a.props.dispatch({type:"orderDetail/cancelOrder",payload:{id:a.props.cancelId}}).then(function(){a.setState({visible:!1})})},a.editCancelHandler=function(){a.props.dispatch(k.routerRedux.push({pathname:"/order"})),a.props.dispatch({type:"orderDetail/changeState",payload:{editable:!1}})},a.cancelLogisticsHandler=function(){a.props.dispatch({type:"logistics/cancelDispatch",payload:{id:a.props.cancelID}}).then(function(){a.setState({visible:!1})})},a.confirmLogisticsHandler=function(){a.props.dispatch({type:"home/confirmBill",payload:{id:a.props.billID,load_num:a.props.load_num,unload_num:a.props.unload_num,load_time:a.props.load_time,unload_time:a.props.unload_time,load_bill:a.props.load_bill,unload_bill:a.props.unload_bill}}).then(function(){a.props.doClose(),a.setState({visible:!1})})},a.disableAccount=function(e){e&&e.stopPropagation(),a.setState({visible:!1}),a.props.foruser?a.props.dispatch({type:"permission/forbiddenControl",payload:{id:a.props.id}}):a.props.dispatch({type:"backstage/forbiddenControl",payload:{id:a.props.id}})},a.goOrder=function(){a.props.dispatch(k.routerRedux.push({pathname:"/order"})),a.props.dispatch({type:"orderDetail/save",payload:{openState:!1}})},a.showModelHandler=function(e){e&&e.stopPropagation(),a.setState({visible:!0})},a.hideModelHandler=function(e){e&&e.stopPropagation(),a.props.openState?a.props.dispatch({type:"orderDetail/save",payload:{openState:!1}}):a.setState({visible:!1})},a.deleteOne=function(e){e&&e.stopPropagation(),"user"===a.props.delType?a.props.dispatch({type:"maintain/deleteCustomer",payload:{id:a.props.delID}}):"supplier"===a.props.delType?a.props.dispatch({type:"maintain/deleteSupplier",payload:{id:a.props.delID}}):"vehicle"===a.props.delType&&a.props.dispatch({type:"maintain/deleteCar",payload:{id:a.props.delID}})},a.state={visible:!1,modalState:{success:{icon:"success",okText:"\u7ee7\u7eed\u4e0b\u5355",cancelText:"\u79bb\u5f00",text:"\u606d\u559c\u60a8\u652f\u4ed8\u6210\u529f\uff0c\u8ba2\u5355\u5df2\u63d0\u4ea4\uff01",okHandler:a.successHandler,cancelHandler:a.goOrder},error:{icon:"error",okText:"\u53bb\u5145\u503c",cancelText:"\u53d6\u6d88",text:"\u652f\u4ed8\u5931\u8d25\uff0c\u5f53\u524d\u8d26\u6237\u4f59\u989d\u4e0d\u8db3\uff01",okHandler:a.errorHandler},cancelOrder:{icon:"cancel",okText:"\u786e\u5b9a\u53d6\u6d88",cancelText:"\u518d\u60f3\u60f3",text:"\u53d6\u6d88\u540e\u8ba2\u5355\u5c06\u88ab\u5220\u9664\uff0c\u786e\u8ba4\u53d6\u6d88\u8ba2\u5355\u5417\uff1f",okHandler:a.orderCancelHandler},cancelEdit:{icon:"cancel",okText:"\u79bb\u5f00",cancelText:"\u53d6\u6d88",text:"\u60a8\u8fd8\u6709\u4fe1\u606f\u672a\u4fdd\u5b58\uff0c\u786e\u5b9a\u79bb\u5f00\u5f53\u524d\u9875\u9762\u5417\uff1f",okHandler:a.editCancelHandler},cancelLogistics:{icon:"cancel",okText:"\u786e\u5b9a\u53d6\u6d88",cancelText:"\u518d\u60f3\u60f3",text:"\u53d6\u6d88\u540e\u8fd0\u5355\u5c06\u88ab\u91cd\u65b0\u8c03\u5ea6\uff0c\u786e\u8ba4\u53d6\u6d88\u5417\uff1f",okHandler:a.cancelLogisticsHandler},confirmLogistics:{icon:"cancel",okText:"\u786e\u5b9a\u78c5\u5355",cancelText:"\u518d\u60f3\u60f3",text:"\u786e\u5b9a\u78c5\u5355\u540e\u4e0d\u53ef\u518d\u6b21\u66f4\u6539\u54e6 :\uff09",okHandler:a.confirmLogisticsHandler},disableAccount:{icon:"cancel",okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",text:"\u786e\u5b9a".concat(a.props.type,"\u5f53\u524d\u8d26\u53f7\u5417\uff1f"),okHandler:a.disableAccount},deleteOne:{icon:"error",okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",text:"\u5982\u6b64\u6570\u636e\u6709\u8bef\uff0c\u60a8\u53ef\u4ee5\u7f16\u8f91\u4fee\u6539\uff0c\u4f46\u5220\u9664\u6b64\u6570\u636e\u540e\u9700\u8981\u91cd\u65b0\u5f55\u5165\uff0c\u786e\u5b9a\u5220\u9664\u5417\uff1f",okHandler:a.deleteOne},deleteOrder:{icon:"error",okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",text:"\u6b64\u64cd\u4f5c\u4f1a\u5f7b\u5e95\u5220\u9664\u8ba2\u5355\uff0c\u786e\u5b9a\u5220\u9664\u5417\uff1f",okHandler:a.deleteOrder}}},a}return m()(t,[{key:"render",value:function(){var e=this.props,t=e.children,a=e.state,n=this.state.modalState[a];return b.a.createElement("div",{style:{cursor:"pointer",color:"#3477ED",display:"inline-block"},onClick:this.showModelHandler},t,b.a.createElement(r.a,{title:"\u63d0\u793a",visible:this.state.visible,footer:null,onCancel:this.hideModelHandler,bodyStyle:{textAlign:"center",fontSize:16,fontFamily:"PingFangHK-Medium"},destroyOnClose:!0},b.a.createElement("div",null,b.a.createElement("img",{src:x.a[n.icon],alt:""})),b.a.createElement("div",{style:{marginTop:30}},n.text),b.a.createElement(i.a,{type:"flex",justify:"space-around",style:{margin:"40px 35px 0 35px"}},b.a.createElement(l.a,null,b.a.createElement(o.a,{onClick:n.cancelHandler?n.cancelHandler:this.hideModelHandler,className:"grayButton"},n.cancelText)),b.a.createElement(l.a,null,b.a.createElement(o.a,{onClick:n.okHandler,type:"primary",style:{width:120}},n.okText)))))}}]),p()(t,e),t}(b.a.Component);t.a=Object(E.connect)(n)(w)}});