!function(){"use strict";const e=["/client/client.42ad7ca8.js","/client/index.aa6ee60f.js"].concat(["/service-worker-index.html","/favicon.ico","/favicon.png","/global.css","/images/textures/back-pattern.png","/images/textures/batthern.png","/images/textures/billie-holiday.png","/images/textures/black-lozenge.png","/images/textures/climpek.png","/images/textures/diagmonds-light.png","/images/textures/diamond-upholstery.png","/images/textures/dimension.png","/images/textures/fabric-plaid.png","/images/textures/flowers.png","/images/textures/gplay.png","/images/textures/grid-me.png","/images/textures/hexellence.png","/images/textures/light-wool.png","/images/textures/maze-white.png","/images/textures/random-grey-variations.png","/images/textures/simple-dashed.png","/images/textures/swirl.png","/images/textures/transparent-square-tiles.png","/images/textures/vichy.png","/images/tiles/commerce_2.svg","/images/tiles/culture_2.svg","/images/tiles/industry_3.svg","/images/tiles/parks_4.svg","/images/tiles/parks_og.svg","/images/tiles/residential_1.svg","/js/fingerprint2-min.js","/js/Modernizr.js","/logo-192.png","/logo-512.png","/manifest.json"]),t=new Set(e);self.addEventListener("install",t=>{t.waitUntil(caches.open("cache1598896164871").then(t=>t.addAll(e)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const t of e)"cache1598896164871"!==t&&await caches.delete(t);self.clients.claim()}))}),self.addEventListener("fetch",e=>{if("GET"!==e.request.method||e.request.headers.has("range"))return;const s=new URL(e.request.url);s.protocol.startsWith("http")&&(s.hostname===self.location.hostname&&s.port!==self.location.port||(s.host===self.location.host&&t.has(s.pathname)?e.respondWith(caches.match(e.request)):"only-if-cached"!==e.request.cache&&e.respondWith(caches.open("offline1598896164871").then(async t=>{try{const s=await fetch(e.request);return t.put(e.request,s.clone()),s}catch(s){const a=await t.match(e.request);if(a)return a;throw s}}))))})}();
