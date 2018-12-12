"use strict";var precacheConfig=[["/static/common-umi.c61dac54.async.js","ca3e1651fa0651f29b9e67d1fd56ca86"],["/static/src__layouts__index.5e0aae1b.async.js","3280854d0436f907baca004602f7d2c1"],["/static/src__pages__account___layout.8198ea98.async.js","59ec711b317397c623f1043d00e0efb0"],["/static/src__pages__account__models__analysis.js.7d7ed026.async.js","3de4f62a23134aa6beb5f53d87c02701"],["/static/src__pages__account__models__balance.js.55da943a.async.js","cc583a53c20cc72f7aaa489f4875cae8"],["/static/src__pages__admin__page.532f8989.async.js","888f9a83e9bfccb9cc288f97bdd16eb7"],["/static/src__pages__backstage___layout.9491a9ef.async.js","1fcae542c5e06cf2ee6f526fe7952309"],["/static/src__pages__backstage__models__backstage.js.cc70e6cd.async.js","1c12eceab281e49ba4fb9894f8f5c3a9"],["/static/src__pages__company__models__company.js.30e1c631.async.js","6d6d06c8ae03657675b41023c51f3268"],["/static/src__pages__company__page.b9fe3934.async.js","424c6ec59b4d01dbd7ac9105332d149c"],["/static/src__pages__customer___layout.3b59ebb6.async.js","3415cda06d3bbd2af7e0aeffbc4f8afc"],["/static/src__pages__customer__models__customer.js.a3d933d4.async.js","5e8148ca99b71de0c2136b0c81418dd0"],["/static/src__pages__index.b6394b1a.async.js","794fbfe865168591962f016f4669c091"],["/static/src__pages__login__page.2f01aa33.async.js","00373a9715a758a15269a6ed0f30d5b5"],["/static/src__pages__logistics___layout.da6f654d.async.js","17cc1c5c694a20cdb6f45a3697c86cb8"],["/static/src__pages__logistics__models__logistics.js.9428a565.async.js","3699ce15263a87985a99f5c39f0cf00f"],["/static/src__pages__logistics__models__logisticsDetail.js.f34a37e6.async.js","58d7ba45ff05b50080547b657f5c7349"],["/static/src__pages__maintain___layout.6a20b1e7.async.js","d7666a8aea991d7a99c42f702bc77de2"],["/static/src__pages__maintain__models__maintain.js.16dca714.async.js","1d90e9ac77fe6dd3e068f24f273efd48"],["/static/src__pages__order___layout.e5b9bee5.async.js","3d99152b343d6d8679b4b2858fc0025c"],["/static/src__pages__order__models__order.js.3452a4fd.async.js","e4554c70fda0dcc46c2ebb1dc3827f9a"],["/static/src__pages__order__models__orderDetail.js.67a7eda2.async.js","70ae93f33888abf1b0a8ff433e613bcc"],["/static/src__pages__permission___layout.b840e1aa.async.js","dff6dc483f6467d71f88150e2067426a"],["/static/src__pages__permission__models__permission.js.dfefbe4c.async.js","706ab3966eac974146e7e9c555609806"],["/static/src__pages__supplier___layout.cb79c339.async.js","c89f4aa741c7196da2f9f436528cf910"],["/static/src__pages__supplier__models__supplier.js.0be9b0f6.async.js","ffb0c856026ee887823d3b6055aa86e4"],["/static/static/bottom.28d54106.png","28d5410668103285c4c30583784908c3"],["/static/static/che.15a60998.svg","15a6099814bfa64342f6c1fc6f1132b4"],["/static/static/dingdanzhaungtai_icon.17128558.png","17128558016fbbc1999609fb49f37f09"],["/static/static/houtai_login_bg.78711d79.png","78711d795a7141cced3d8b98d264fe32"],["/static/static/iconfont.4a6d56a1.svg","4a6d56a118161cf1d730de940c626f08"],["/static/static/index_bg_1.1d8c7183.png","1d8c71832baa6e0313a4ce2bd57f857d"],["/static/static/index_bg_2.582df734.png","582df73435c61f41b7b079cc26196067"],["/static/static/index_bg_3.c64b4631.png","c64b46310c4ac7094af251ed73e96855"],["/static/static/lch_logo.6a9e9e6e.png","6a9e9e6ee7664bff8adfd89894b1edf6"],["/static/static/qianduan_login_bg.b98c0c49.png","b98c0c4974f2790becef189736aede86"],["/static/static/scheduling_now.aca0f37b.gif","aca0f37bc19dba26319ec3c51c3c091b"],["/static/static/settlement.6211b484.gif","6211b484029f64ecd4cd6da52909e258"],["/static/static/shouye_icon.a4fd0b21.png","a4fd0b21b5b85c32c70a32f9452b359d"],["/static/static/xjln1.f239c604.png","f239c604c4b0ebb77233e0f610f37e51"],["/static/static/yay.44dd3333.jpg","44dd3333d0ce70df3163ee28484ec397"],["/static/static/yingkui.46710dda.png","46710dda68851b0ecb071a58b5429ce1"],["/static/static/yundanzhuangtai_icon.c234b892.png","c234b89217370c96de803c6c57255d61"],["/static/umi.163bab0f.js","21f0fbefeb6e6c9bf22040319d9e29fe"],["/static/umi.f3f9dd2a.css","f3f9dd2af6399dc3784e248edb4cc826"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var c=new URL(e);return"/"===c.pathname.slice(-1)&&(c.pathname+=a),c.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,c,s){var t=new URL(e);return s&&t.pathname.match(s)||(t.search+=(t.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(c)),t.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var c=new URL(a).pathname;return e.some(function(e){return c.match(e)})},stripIgnoredUrlParameters=function(e,a){var c=new URL(e);return c.hash="",c.search=c.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),c.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],c=e[1],s=new URL(a,self.location),t=createCacheKey(s,hashParamName,c,!1);return[s.toString(),t]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(c){if(!a.has(c)){var s=new Request(c,{credentials:"same-origin"});return fetch(s).then(function(a){if(!a.ok)throw new Error("Request for "+c+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(c,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(c){return Promise.all(c.map(function(c){if(!a.has(c.url))return e.delete(c)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,c=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(c))||(c=addDirectoryIndex(c,"index.html"),a=urlsToCacheKeys.has(c));0,a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(c)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});