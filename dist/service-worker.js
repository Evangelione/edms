"use strict";var precacheConfig=[["/static/common-umi.e7b63c59.async.js","1ec39d00d10827e54bbeac1541dbed08"],["/static/src__layouts__index.95ff2339.async.js","bbfa6b6d63b9f7c63270c1a6122d661b"],["/static/src__pages__account___layout.2c0c1f7c.async.js","c416eacba4a6341618706badd0bb6fb6"],["/static/src__pages__account__models__analysis.js.a709f383.async.js","4dc6d924df48f72fad34822323f635d2"],["/static/src__pages__account__models__balance.js.7ac3deaf.async.js","08d409681e15fe1e989b2181fd199786"],["/static/src__pages__admin__page.68ce1694.async.js","4060a73c527d465d1801e4a6d486d789"],["/static/src__pages__backstage___layout.77ef66fe.async.js","9ddbf59aff7486cc4d1040e2237e0e4a"],["/static/src__pages__backstage__models__backstage.js.dabfa275.async.js","7f7496497920db679aa9efbcd5ba8aab"],["/static/src__pages__company__models__company.js.a87a373a.async.js","2aa31dba784e9d5f7d7d5a930055c1b0"],["/static/src__pages__company__page.45b7aab2.async.js","d61d673b4917023f41a93c25a6d4d083"],["/static/src__pages__customer___layout.d3504d4c.async.js","ad142f0a551369d13f8a29682800baf4"],["/static/src__pages__customer__models__customer.js.987580f6.async.js","2239af526b770949d98ef0e376603f0a"],["/static/src__pages__index.814cc2e4.async.js","9e757cc46bb7e1c387e1abebe16622fd"],["/static/src__pages__login__page.0d67bffe.async.js","21df0fba5c96638b81b86d8ea3dad4de"],["/static/src__pages__logistics___layout.2f2d59c7.async.js","e1a36793a356024adc025379cd5e623e"],["/static/src__pages__logistics__models__logistics.js.f39c8057.async.js","3ffd4712a874da14bd05f483955ff6a7"],["/static/src__pages__logistics__models__logisticsDetail.js.053f883e.async.js","820fc1d17a1785a2618b6a02551bae8a"],["/static/src__pages__maintain___layout.5447e791.async.js","6f69e79b7f6a31f6ed8ba6ccdf586f42"],["/static/src__pages__maintain__models__maintain.js.d9451175.async.js","1e1716c2fc8410dacf7d0e34bfc2cd64"],["/static/src__pages__order___layout.04d299b0.async.js","c61d8e35eb13bee6ba4108eb1d869cb8"],["/static/src__pages__order__models__order.js.ca88c88d.async.js","4e831bee9d235b8b6ad570d4a0b67f3b"],["/static/src__pages__order__models__orderDetail.js.1fcba87b.async.js","3d3cddd3a1cf9eb170846f9f94c9f3d5"],["/static/src__pages__permission___layout.112f123f.async.js","34ffb03a401a4a071ab88e247df6c5e2"],["/static/src__pages__permission__models__permission.js.2cddca24.async.js","5304de9b34a87a3c02168dcafc8387d9"],["/static/src__pages__supplier___layout.6b899989.async.js","d968dfe87cb31db2ef8c0402ef953da8"],["/static/src__pages__supplier__models__supplier.js.3c4e3277.async.js","6790d5076c2a2d3a13709c62112e2e50"],["/static/static/bottom.28d54106.png","28d5410668103285c4c30583784908c3"],["/static/static/che.15a60998.svg","15a6099814bfa64342f6c1fc6f1132b4"],["/static/static/dingdanzhaungtai_icon.17128558.png","17128558016fbbc1999609fb49f37f09"],["/static/static/houtai_login_bg.78711d79.png","78711d795a7141cced3d8b98d264fe32"],["/static/static/iconfont.4a6d56a1.svg","4a6d56a118161cf1d730de940c626f08"],["/static/static/index_bg_1.1d8c7183.png","1d8c71832baa6e0313a4ce2bd57f857d"],["/static/static/index_bg_2.582df734.png","582df73435c61f41b7b079cc26196067"],["/static/static/index_bg_3.c64b4631.png","c64b46310c4ac7094af251ed73e96855"],["/static/static/lch_logo.6a9e9e6e.png","6a9e9e6ee7664bff8adfd89894b1edf6"],["/static/static/pay.02b8fcd3.gif","02b8fcd3ae6a3ced0d8367f03e8b5d15"],["/static/static/qianduan_login_bg.b98c0c49.png","b98c0c4974f2790becef189736aede86"],["/static/static/scheduling_now.aca0f37b.gif","aca0f37bc19dba26319ec3c51c3c091b"],["/static/static/settlement.6211b484.gif","6211b484029f64ecd4cd6da52909e258"],["/static/static/shouye_icon.a4fd0b21.png","a4fd0b21b5b85c32c70a32f9452b359d"],["/static/static/xjln1.f239c604.png","f239c604c4b0ebb77233e0f610f37e51"],["/static/static/yay.44dd3333.jpg","44dd3333d0ce70df3163ee28484ec397"],["/static/static/yingkui.46710dda.png","46710dda68851b0ecb071a58b5429ce1"],["/static/static/yundanzhuangtai_icon.c234b892.png","c234b89217370c96de803c6c57255d61"],["/static/umi.82173683.css","821736831079faddc200b2f79bfc7899"],["/static/umi.efb8567f.js","73e1e6c42be45601f76ef9e57d3b0eab"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var c=new URL(e);return"/"===c.pathname.slice(-1)&&(c.pathname+=a),c.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,c,t){var s=new URL(e);return t&&s.pathname.match(t)||(s.search+=(s.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(c)),s.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var c=new URL(a).pathname;return e.some(function(e){return c.match(e)})},stripIgnoredUrlParameters=function(e,a){var c=new URL(e);return c.hash="",c.search=c.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),c.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],c=e[1],t=new URL(a,self.location),s=createCacheKey(t,hashParamName,c,!1);return[t.toString(),s]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(c){if(!a.has(c)){var t=new Request(c,{credentials:"same-origin"});return fetch(t).then(function(a){if(!a.ok)throw new Error("Request for "+c+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(c,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(c){return Promise.all(c.map(function(c){if(!a.has(c.url))return e.delete(c)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,c=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(c))||(c=addDirectoryIndex(c,"index.html"),a=urlsToCacheKeys.has(c));0,a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(c)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});