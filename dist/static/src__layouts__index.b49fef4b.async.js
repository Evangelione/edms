webpackJsonp([21],{"4iE9":function(e,t){},"8H71":function(e,t){},LPKe:function(e,t,a){"use strict";function n(e){return function(t){return function(a){function n(){return f()(this,n),v()(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return O()(n,a),y()(n,[{key:"render",value:function(){var a=e.prefixCls;return S.createElement(t,u()({prefixCls:a},this.props))}}]),n}(S.Component)}}function o(e){return{currentKey:e.collapsed.currentKey}}function s(e){function t(){a(0===n.pathname.indexOf("/backstage")||0===n.pathname.indexOf("/permission")||0===n.pathname.indexOf("/maintain")?{type:"login/backlogout"}:{type:"login/logout"})}var a=e.dispatch,n=e.location,o=e.currentPageName;return x.a.createElement(fe,{className:Z.a.header},x.a.createElement("span",{style:{paddingLeft:20,fontSize:18,fontWeight:600,color:"#545F76"}},function(){return o}()),x.a.createElement(se.a,{selectedKeys:[n.pathname],mode:"horizontal",className:Z.a.menu},x.a.createElement(se.a.Item,{key:"alipay"},x.a.createElement("div",{onClick:t,style:{color:"#545f76"}},x.a.createElement(W.a,{type:"logout"}),"\u9000\u51fa\u767b\u5f55"))),0===n.pathname.indexOf("/backstage")||0===n.pathname.indexOf("/permission")||0===n.pathname.indexOf("/maintain")?x.a.createElement("div",{className:Z.a.user},x.a.createElement("div",{className:Z.a.avatar},x.a.createElement("img",{src:JSON.parse(sessionStorage.getItem("adminData"))?JSON.parse(sessionStorage.getItem("adminData")).head_img:"",alt:""})),x.a.createElement("div",{style:{display:"inline-block"}},JSON.parse(sessionStorage.getItem("adminData"))?JSON.parse(sessionStorage.getItem("adminData")).name:"")):x.a.createElement("div",{className:Z.a.user},x.a.createElement("div",{className:Z.a.avatar},x.a.createElement("img",{src:JSON.parse(sessionStorage.getItem("userData"))?JSON.parse(sessionStorage.getItem("userData")).head_img:"",alt:""})),x.a.createElement("div",{style:{display:"inline-block"}},JSON.parse(sessionStorage.getItem("userData"))?JSON.parse(sessionStorage.getItem("userData")).name:"")))}function i(e){var t=e.collapsed;return{collapsed:t.collapsed,currentPageName:t.currentPageName}}function r(e){var t=e.children,a=e.location;return"/login"===a.pathname?x.a.createElement(U,{className:Z.a.scrollLayout},x.a.createElement(ve,{location:a,children:t})):"/admin"===a.pathname?x.a.createElement(U,{className:Z.a.scrollLayout},x.a.createElement(ve,{location:a,children:t})):x.a.createElement(U,{className:Z.a.layout},x.a.createElement(he,null),x.a.createElement(U,{style:{position:"relative"}},x.a.createElement(ge,{location:a}),x.a.createElement(ve,{location:a,children:t})))}Object.defineProperty(t,"__esModule",{value:!0});var l=(a("vtiu"),a("4iE9"),a("bOdI")),c=a.n(l),p=a("Gu7T"),m=a.n(p),d=a("Dd8w"),u=a.n(d),h=a("Zrlr"),f=a.n(h),g=a("wxAW"),y=a.n(g),E=a("zwoO"),v=a.n(E),b=a("Pf15"),O=a.n(b),S=a("GiK3"),x=a.n(S),k=a("KSGD"),N=a("HW6M"),C=a.n(N),w=this&&this.__rest||function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&(a[n[o]]=e[n[o]]);return a},I=function(e){function t(){return f()(this,t),v()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return O()(t,e),y()(t,[{key:"render",value:function(){var e=this.props,t=e.prefixCls,a=e.className,n=e.children,o=w(e,["prefixCls","className","children"]),s=C()(a,t);return S.createElement("div",u()({className:s},o),n)}}]),t}(S.Component),_=function(e){function t(){f()(this,t);var e=v()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.state={siders:[]},e}return O()(t,e),y()(t,[{key:"getChildContext",value:function(){var e=this;return{siderHook:{addSider:function(t){e.setState({siders:[].concat(m()(e.state.siders),[t])})},removeSider:function(t){e.setState({siders:e.state.siders.filter(function(e){return e!==t})})}}}}},{key:"render",value:function(){var e=this.props,t=e.prefixCls,a=e.className,n=e.children,o=e.hasSider,s=w(e,["prefixCls","className","children","hasSider"]),i=C()(a,t,c()({},t+"-has-sider",o||this.state.siders.length>0));return S.createElement("div",u()({className:i},s),n)}}]),t}(S.Component);_.childContextTypes={siderHook:k.object};var K=n({prefixCls:"ant-layout"})(_),j=n({prefixCls:"ant-layout-header"})(I),P=n({prefixCls:"ant-layout-footer"})(I),A=n({prefixCls:"ant-layout-content"})(I);K.Header=j,K.Footer=P,K.Content=A;var T=K,H=a("R8mX"),D=a("JkBm"),W=a("FC3+"),L=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},q=L,J=this&&this.__rest||function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&(a[n[o]]=e[n[o]]);return a};if("undefined"!=typeof window){var z=function(e){return{media:e,matches:!1,addListener:function(){},removeListener:function(){}}};window.matchMedia=window.matchMedia||z}var F={xs:"480px",sm:"576px",md:"768px",lg:"992px",xl:"1200px",xxl:"1600px"},M=function(){var e=0;return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e+=1,""+t+e}}(),R=function(e){function t(e){f()(this,t);var a=v()(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));a.responsiveHandler=function(e){a.setState({below:e.matches});var t=a.props.onBreakpoint;t&&t(e.matches),a.state.collapsed!==e.matches&&a.setCollapsed(e.matches,"responsive")},a.setCollapsed=function(e,t){"collapsed"in a.props||a.setState({collapsed:e});var n=a.props.onCollapse;n&&n(e,t)},a.toggle=function(){var e=!a.state.collapsed;a.setCollapsed(e,"clickTrigger")},a.belowShowChange=function(){a.setState({belowShow:!a.state.belowShow})},a.uniqueId=M("ant-sider-");var n=void 0;"undefined"!=typeof window&&(n=window.matchMedia),n&&e.breakpoint&&e.breakpoint in F&&(a.mql=n("(max-width: "+F[e.breakpoint]+")"));var o=void 0;return o="collapsed"in e?e.collapsed:e.defaultCollapsed,a.state={collapsed:o,below:!1},a}return O()(t,e),y()(t,[{key:"getChildContext",value:function(){return{siderCollapsed:this.state.collapsed,collapsedWidth:this.props.collapsedWidth}}},{key:"componentDidMount",value:function(){this.mql&&(this.mql.addListener(this.responsiveHandler),this.responsiveHandler(this.mql)),this.context.siderHook&&this.context.siderHook.addSider(this.uniqueId)}},{key:"componentWillUnmount",value:function(){this.mql&&this.mql.removeListener(this.responsiveHandler),this.context.siderHook&&this.context.siderHook.removeSider(this.uniqueId)}},{key:"render",value:function(){var e,t=this.props,a=t.prefixCls,n=t.className,o=t.theme,s=t.collapsible,i=t.reverseArrow,r=t.trigger,l=t.style,p=t.width,m=t.collapsedWidth,d=J(t,["prefixCls","className","theme","collapsible","reverseArrow","trigger","style","width","collapsedWidth"]),h=Object(D.a)(d,["collapsed","defaultCollapsed","onCollapse","breakpoint","onBreakpoint"]),f=this.state.collapsed?m:p,g=q(f)?f+"px":String(f),y=0===parseFloat(String(m||0))?S.createElement("span",{onClick:this.toggle,className:a+"-zero-width-trigger"},S.createElement(W.a,{type:"bars"})):null,E={expanded:i?S.createElement(W.a,{type:"right"}):S.createElement(W.a,{type:"left"}),collapsed:i?S.createElement(W.a,{type:"left"}):S.createElement(W.a,{type:"right"})},v=this.state.collapsed?"collapsed":"expanded",b=E[v],O=null!==r?y||S.createElement("div",{className:a+"-trigger",onClick:this.toggle,style:{width:g}},r||b):null,x=u()({},l,{flex:"0 0 "+g,maxWidth:g,minWidth:g,width:g}),k=C()(n,a,a+"-"+o,(e={},c()(e,a+"-collapsed",!!this.state.collapsed),c()(e,a+"-has-trigger",s&&null!==r&&!y),c()(e,a+"-below",!!this.state.below),c()(e,a+"-zero-width",0===parseFloat(g)),e));return S.createElement("div",u()({className:k},h,{style:x}),S.createElement("div",{className:a+"-children"},this.props.children),s||this.state.below&&y?O:null)}}],[{key:"getDerivedStateFromProps",value:function(e){return"collapsed"in e?{collapsed:e.collapsed}:null}}]),t}(S.Component);R.__ANT_LAYOUT_SIDER=!0,R.defaultProps={prefixCls:"ant-layout-sider",collapsible:!1,defaultCollapsed:!1,reverseArrow:!1,width:200,collapsedWidth:80,style:{},theme:"dark"},R.childContextTypes={siderCollapsed:k.bool,collapsedWidth:k.oneOfType([k.number,k.string])},R.contextTypes={siderHook:k.object},Object(H.polyfill)(R);var B=R;T.Sider=B;var U=T,G=a("V++0"),Z=a.n(G),Q=(a("baa2"),a("Z60a")),V=a.n(Q),X=a("j/rp"),Y=a.n(X),$=a("C9uT"),ee=a.n($),te=a("T/v0"),ae=a.n(te),ne=a("tNLN"),oe=a.n(ne),se=(a("Qbm7"),a("aOwA")),ie=a("S6G3"),re=a("TTni"),le=a.n(re),ce=a("6OU9"),pe=a("oiih"),me=U.Sider,de=se.a.SubMenu,ue=function(e){function t(e){var a;return V()(this,t),a=ae()(this,oe()(t).call(this,e)),a.rootSubmenuKeys=["sub1"],a.onOpenChange=function(e){var t=e.find(function(e){return-1===a.state.openKeys.indexOf(e)});-1===a.rootSubmenuKeys.indexOf(t)?a.setState({openKeys:e}):a.setState({openKeys:t?[t]:[]})},a.onSelect=function(e){var t=e.key;"balance"!==t&&"analysis"!==t&&a.setState({openKeys:[]})},a.getCurrentTab=function(){return"/"===a.props.location.pathname?["home"]:0===a.props.location.pathname.indexOf("/backstage")?["administrator"]:0===a.props.location.pathname.indexOf("/permission")?["permission"]:0===a.props.location.pathname.indexOf("/maintain")?["maintain"]:0===a.props.location.pathname.indexOf("/order")?["order"]:0===a.props.location.pathname.indexOf("/logistics")?["logistics"]:0===a.props.location.pathname.indexOf("/account/balance")?["balance"]:0===a.props.location.pathname.indexOf("/account/analysis")?["analysis"]:0===a.props.location.pathname.indexOf("/customer")?["customer"]:0===a.props.location.pathname.indexOf("/supplier")?["supplier"]:0===a.props.location.pathname.indexOf("/company")?["company"]:["administrator"]},a.state={openKeys:[],currentKey:[""]},a}return ee()(t,[{key:"render",value:function(){var e=window.location.hostname.match(/[A-Za-z]+/g)[0],t=this.props.collapsed;return x.a.createElement(me,{trigger:null,collapsible:!0,collapsed:t},0===this.props.location.pathname.indexOf("/backstage")||0===this.props.location.pathname.indexOf("/permission")||0===this.props.location.pathname.indexOf("/maintain")?x.a.createElement("div",null,x.a.createElement("div",{className:Z.a.logo,style:{backgroundImage:"url(".concat(pe.b[e].logo,")")}}),x.a.createElement(se.a,{theme:"dark",defaultSelectedKeys:this.props.currentKey,selectedKeys:this.props.currentKey,mode:"inline",openKeys:this.state.openKeys,onSelect:this.onSelect,onOpenChange:this.onOpenChange},0!=(1&sessionStorage.getItem("backAuth"))?x.a.createElement(se.a.Item,{key:"administrator"},x.a.createElement(le.a,{to:"/backstage"}),x.a.createElement("i",{className:"iconfont icon-shouye"}),x.a.createElement("span",null,"\u4f01\u4e1a\u7ba1\u7406")):"",0!=(2&sessionStorage.getItem("backAuth"))?x.a.createElement(se.a.Item,{key:"permission"},x.a.createElement(le.a,{to:"/permission"}),x.a.createElement(W.a,{type:"file-text",style:{marginRight:20}}),x.a.createElement("span",null,"\u7528\u6237\u5217\u8868")):"",0!=(4&sessionStorage.getItem("backAuth"))?x.a.createElement(se.a.Item,{key:"maintain"},x.a.createElement(le.a,{to:"/maintain"}),x.a.createElement("i",{className:"iconfont icon-iconfont31quanbushangpin"}),x.a.createElement("span",null,"\u6570\u636e\u7ef4\u62a4")):"")):x.a.createElement("div",null,x.a.createElement("div",{className:Z.a.logo,style:{backgroundImage:"url(".concat(pe.b[e].logo,")")}}),x.a.createElement(se.a,{theme:"dark",defaultSelectedKeys:this.props.currentKey,selectedKeys:this.props.currentKey,mode:"inline",openKeys:this.state.openKeys,onSelect:this.onSelect,onOpenChange:this.onOpenChange},x.a.createElement(se.a.Item,{key:"home"},x.a.createElement(le.a,{to:"/"}),x.a.createElement("i",{className:"iconfont icon-shouye"}),x.a.createElement("span",null,"\u9996\u9875")),0!=(1&sessionStorage.getItem("loginAuth"))?x.a.createElement(se.a.Item,{key:"order"},x.a.createElement(le.a,{to:"/order"}),x.a.createElement("i",{className:"iconfont icon-tijindingdan"}),x.a.createElement("span",null,"\u6211\u7684\u8ba2\u5355")):"",0!=(2&sessionStorage.getItem("loginAuth"))?x.a.createElement(se.a.Item,{key:"logistics"},x.a.createElement(le.a,{to:"/logistics"}),x.a.createElement("i",{className:"iconfont icon-wuliu",style:{fontSize:22,marginRight:17,marginLeft:"-3px"}}),x.a.createElement("span",null,"\u6211\u7684\u7269\u6d41")):"",0!=(4&sessionStorage.getItem("loginAuth"))?x.a.createElement(de,{key:"sub1",title:x.a.createElement("span",null,x.a.createElement("i",{className:"iconfont icon-zhangdan"}),x.a.createElement("span",null,"\u6211\u7684\u8d26\u52a1")),style:{marginBottom:8}},x.a.createElement(se.a.Item,{key:"balance"},x.a.createElement(le.a,{to:"/account/balance"}),"\u4f59\u989d\u7ba1\u7406"),x.a.createElement(se.a.Item,{key:"analysis"},x.a.createElement(le.a,{to:"/account/analysis"}),"\u6570\u636e\u5206\u6790")):"",0!=(8&sessionStorage.getItem("loginAuth"))?x.a.createElement(se.a.Item,{key:"customer"},x.a.createElement(le.a,{to:"/customer"}),x.a.createElement("i",{className:"iconfont icon-kehuguanli"}),x.a.createElement("span",null,"\u6211\u7684\u5ba2\u6237")):"",0!=(16&sessionStorage.getItem("loginAuth"))?x.a.createElement(se.a.Item,{key:"supplier"},x.a.createElement(le.a,{to:"/supplier"}),x.a.createElement("i",{className:"iconfont icon-iconfont31quanbushangpin"}),x.a.createElement("span",null,"\u6211\u7684\u4f9b\u5e94\u5546")):"",0!=(32&sessionStorage.getItem("loginAuth"))?x.a.createElement(se.a.Item,{key:"company"},x.a.createElement(le.a,{to:"/company"}),x.a.createElement("i",{className:"iconfont icon-gongsi"}),x.a.createElement("span",null,"\u6211\u7684\u516c\u53f8")):"")))}}]),Y()(t,e),t}(x.a.Component),he=Object(ie.connect)(o)(Object(ce.c)(ue)),fe=U.Header,ge=Object(ie.connect)(i)(s),ye=U.Content,Ee=function(e){function t(){return V()(this,t),ae()(this,oe()(t).apply(this,arguments))}return ee()(t,[{key:"UNSAFE_componentWillReceiveProps",value:function(e){this.props.location!==e.location&&document.getElementById("scrollTop").scrollIntoView(!0)}},{key:"render",value:function(){var e=this.props,t=e.location,a=e.children;return x.a.createElement("div",{style:{height:"100%"},id:"scrollTop"},x.a.createElement(ye,{id:"layout",className:"/login"===t.pathname?Z.a.login:"/admin"===t.pathname?Z.a.backstagelogin:Z.a.content},a))}}]),Y()(t,e),t}(x.a.Component),ve=Ee,be=a("rp7U"),Oe=a.n(be);t.default=Oe()(r)},Qbm7:function(e,t,a){"use strict";var n=a("vtiu"),o=(a.n(n),a("8H71"));a.n(o),a("/m1I")},TTni:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a("zRe7"),o=n.Link;t.default=o}});