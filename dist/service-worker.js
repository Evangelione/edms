"use strict";var precacheConfig=[["/static/common-umi.651a8ad8.async.js","47f97d277433503981c13268638477c9"],["/static/src__layouts__index.ec9ff53b.async.js","810a63b6466a56125c5a1ec7c725c5c4"],["/static/src__pages__account___layout.27022a89.async.js","84ae96e6ad4e868ec0b237e04a10a773"],["/static/src__pages__account__models__analysis.js.9229c253.async.js","c33b0a0e088353777a7ac0dbd72345f1"],["/static/src__pages__account__models__balance.js.989b0216.async.js","913486cd8a4477489410da33b2dd6e58"],["/static/src__pages__backstage___layout.0d95583e.async.js","86e9a295b43b35ae5636f51f816eb840"],["/static/src__pages__backstage__models__backstage.js.7d4fc90f.async.js","66819ff2fc3cc2a7a923cb1d664864b5"],["/static/src__pages__backstagelogin__page.184a998f.async.js","2104ff29f5e8097434172843bd802c68"],["/static/src__pages__company__models__company.js.20c77b91.async.js","669a43ec388cc6c69a81c7c2adb7ff4b"],["/static/src__pages__company__page.c2263873.async.js","74a7db08ecef3294d3dae0032884530c"],["/static/src__pages__customer__models__customer.js.aa8988ac.async.js","c7fdd02187efd48bb71db391655ef404"],["/static/src__pages__customer__page.5aafcdde.async.js","d4a23a2e42913cf2ac46305e720581b9"],["/static/src__pages__index.e079ec70.async.js","98e6c2cfc2d5071368845885f1bba2ba"],["/static/src__pages__login__page.35608aa7.async.js","c64b30e3e9ae0e718c36db7e1599e423"],["/static/src__pages__logistics___layout.32fe774c.async.js","00ec32cf4b86bc3919393a5e613ae49c"],["/static/src__pages__logistics__models__logistics.js.1a625b95.async.js","604b332e89972b63978fe9f66bd6e946"],["/static/src__pages__logistics__models__logisticsDetail.js.6f34b121.async.js","97379d2fdefa2963f775cde7827e123a"],["/static/src__pages__maintain___layout.1c0a5d79.async.js","85210cdc6cbf832509853ea1cddf4144"],["/static/src__pages__maintain__models__maintain.js.41b7aedb.async.js","d6d2e0054684782d97e5ea5b896d9cb5"],["/static/src__pages__order___layout.e04a02e0.async.js","1d8a53ca672678418f7dd53bd5e9bb1b"],["/static/src__pages__order__models__order.js.28e71da9.async.js","0ed1bb40c69ba40b049a660c629c7a21"],["/static/src__pages__order__models__orderDetail.js.bd6d4d93.async.js","839b5cecb711bfe092df702cae626d08"],["/static/src__pages__permission___layout.2b650ccf.async.js","62ef3a90db79da5c43a953f266e63d69"],["/static/src__pages__permission__models__permission.js.c92a0817.async.js","c21a2c587cc642048081d5170805e9cb"],["/static/src__pages__supplier__models__supplier.js.63b1f093.async.js","fc922784cd67389ed3bae1fbe487fac8"],["/static/src__pages__supplier__page.24fd1703.async.js","9367bf5b3306f35f75a34bf10c76a20a"],["/static/static/bottom.28d54106.png","28d5410668103285c4c30583784908c3"],["/static/static/dingdanzhaungtai_icon.17128558.png","17128558016fbbc1999609fb49f37f09"],["/static/static/houtai_login_bg.78711d79.png","78711d795a7141cced3d8b98d264fe32"],["/static/static/iconfont.4a6d56a1.svg","4a6d56a118161cf1d730de940c626f08"],["/static/static/index_bg_1.1d8c7183.png","1d8c71832baa6e0313a4ce2bd57f857d"],["/static/static/index_bg_2.582df734.png","582df73435c61f41b7b079cc26196067"],["/static/static/index_bg_3.c64b4631.png","c64b46310c4ac7094af251ed73e96855"],["/static/static/lch_logo.6a9e9e6e.png","6a9e9e6ee7664bff8adfd89894b1edf6"],["/static/static/qianduan_login_bg.b98c0c49.png","b98c0c4974f2790becef189736aede86"],["/static/static/xjln1.f239c604.png","f239c604c4b0ebb77233e0f610f37e51"],["/static/static/yay.44dd3333.jpg","44dd3333d0ce70df3163ee28484ec397"],["/static/static/yundanzhuangtai_icon.c234b892.png","c234b89217370c96de803c6c57255d61"],["/static/umi.004889a2.js","d7fbe748f1a4c2709983bc889daeb9ad"],["/static/umi.de396f6d.css","de396f6d142dac3c022bed964dafedf7"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var c=new URL(e);return"/"===c.pathname.slice(-1)&&(c.pathname+=a),c.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,c,s){var t=new URL(e);return s&&t.pathname.match(s)||(t.search+=(t.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(c)),t.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var c=new URL(a).pathname;return e.some(function(e){return c.match(e)})},stripIgnoredUrlParameters=function(e,a){var c=new URL(e);return c.hash="",c.search=c.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),c.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],c=e[1],s=new URL(a,self.location),t=createCacheKey(s,hashParamName,c,!1);return[s.toString(),t]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(c){if(!a.has(c)){var s=new Request(c,{credentials:"same-origin"});return fetch(s).then(function(a){if(!a.ok)throw new Error("Request for "+c+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(c,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(c){return Promise.all(c.map(function(c){if(!a.has(c.url))return e.delete(c)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,c=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(c))||(c=addDirectoryIndex(c,"index.html"),a=urlsToCacheKeys.has(c));0,a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(c)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});