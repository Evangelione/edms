"use strict";var precacheConfig=[["/static/common-umi.05a184c2.async.js","ff2dd5967eecefd0710999b323e8c705"],["/static/src__layouts__index.cedceebb.async.js","27f88bcf751e0883093889472d4bfead"],["/static/src__pages__account___layout.8f50bc0a.async.js","3648094770a0b1d7f35985c620a2b8ea"],["/static/src__pages__account__models__analysis.js.a709f383.async.js","4dc6d924df48f72fad34822323f635d2"],["/static/src__pages__account__models__balance.js.192e7c14.async.js","faac1b37a56e5e6de41538b4df156bda"],["/static/src__pages__admin__page.68ce1694.async.js","4060a73c527d465d1801e4a6d486d789"],["/static/src__pages__backstage___layout.169d6c23.async.js","cafee3162b9154926219561918e946f0"],["/static/src__pages__backstage__models__backstage.js.d4a179ae.async.js","f1dcb897a355afac7a23a9ad38f260a9"],["/static/src__pages__company__models__company.js.a87a373a.async.js","2aa31dba784e9d5f7d7d5a930055c1b0"],["/static/src__pages__company__page.caa786d5.async.js","9c3a2a2afe44e1c567c4439ef42d37cb"],["/static/src__pages__customer___layout.96f98da3.async.js","d6fa7c14cdbd0868ce988b83d0afa020"],["/static/src__pages__customer__models__customer.js.9bf31dc7.async.js","71ca52499437a59db91e069f06d0d92e"],["/static/src__pages__index.d44f6476.async.js","2bf90e656ef70ccbab77daa8008b2153"],["/static/src__pages__login__page.0d67bffe.async.js","21df0fba5c96638b81b86d8ea3dad4de"],["/static/src__pages__logistics___layout.5c19e80a.async.js","717eaf04191fc1a10f7974db468f3924"],["/static/src__pages__logistics__models__logistics.js.94a19c85.async.js","ad30b4693cf9fbe0f89cd652b0dba5eb"],["/static/src__pages__logistics__models__logisticsDetail.js.d477ede2.async.js","2eb1f9b737e3731b48d9bf2bd7eb5033"],["/static/src__pages__maintain___layout.d7446f9f.async.js","364edbaf078e4f6b7763acf22451266e"],["/static/src__pages__maintain__models__maintain.js.d9451175.async.js","1e1716c2fc8410dacf7d0e34bfc2cd64"],["/static/src__pages__order___layout.785b6b17.async.js","05ba606c117ac754c0128a972099beeb"],["/static/src__pages__order__models__order.js.06d7df37.async.js","b1a29f1202ac31b9bc6a63d0c7be54e0"],["/static/src__pages__order__models__orderDetail.js.4f81e92c.async.js","effaec5a7a9a945507d6b6bc8bf6e0b6"],["/static/src__pages__permission___layout.67553c8c.async.js","696a03a9cce67558a78e7b490519759d"],["/static/src__pages__permission__models__permission.js.2cddca24.async.js","5304de9b34a87a3c02168dcafc8387d9"],["/static/src__pages__supplier___layout.a5a61bec.async.js","5c043988957f4e37930b2c51045e4d90"],["/static/src__pages__supplier__models__supplier.js.19fd070a.async.js","f9da6bfb869832c156fed20c32cb4a6d"],["/static/static/bottom.28d54106.png","28d5410668103285c4c30583784908c3"],["/static/static/dingdanzhaungtai_icon.17128558.png","17128558016fbbc1999609fb49f37f09"],["/static/static/houtai_login_bg.78711d79.png","78711d795a7141cced3d8b98d264fe32"],["/static/static/iconfont.4a6d56a1.svg","4a6d56a118161cf1d730de940c626f08"],["/static/static/index_bg_1.1d8c7183.png","1d8c71832baa6e0313a4ce2bd57f857d"],["/static/static/index_bg_2.582df734.png","582df73435c61f41b7b079cc26196067"],["/static/static/index_bg_3.c64b4631.png","c64b46310c4ac7094af251ed73e96855"],["/static/static/lch_logo.6a9e9e6e.png","6a9e9e6ee7664bff8adfd89894b1edf6"],["/static/static/qianduan_login_bg.b98c0c49.png","b98c0c4974f2790becef189736aede86"],["/static/static/shouye_icon.a4fd0b21.png","a4fd0b21b5b85c32c70a32f9452b359d"],["/static/static/xjln1.f239c604.png","f239c604c4b0ebb77233e0f610f37e51"],["/static/static/yay.44dd3333.jpg","44dd3333d0ce70df3163ee28484ec397"],["/static/static/yingkui.46710dda.png","46710dda68851b0ecb071a58b5429ce1"],["/static/static/yundanzhuangtai_icon.c234b892.png","c234b89217370c96de803c6c57255d61"],["/static/umi.cd94438a.js","48b9bbb5c89d8aa083efc2e6a170e892"],["/static/umi.d3f26322.css","d3f2632283a76113dc74046c01aea855"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var c=new URL(e);return"/"===c.pathname.slice(-1)&&(c.pathname+=a),c.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,c,s){var t=new URL(e);return s&&t.pathname.match(s)||(t.search+=(t.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(c)),t.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var c=new URL(a).pathname;return e.some(function(e){return c.match(e)})},stripIgnoredUrlParameters=function(e,a){var c=new URL(e);return c.hash="",c.search=c.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),c.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],c=e[1],s=new URL(a,self.location),t=createCacheKey(s,hashParamName,c,!1);return[s.toString(),t]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(c){if(!a.has(c)){var s=new Request(c,{credentials:"same-origin"});return fetch(s).then(function(a){if(!a.ok)throw new Error("Request for "+c+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(c,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(c){return Promise.all(c.map(function(c){if(!a.has(c.url))return e.delete(c)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,c=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(c))||(c=addDirectoryIndex(c,"index.html"),a=urlsToCacheKeys.has(c));0,a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(c)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});