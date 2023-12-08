var U=Object.defineProperty;var V=(t,e,n)=>e in t?U(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var S=(t,e,n)=>(V(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();function a(){}function D(t){return t()}function H(){return Object.create(null)}function j(t){t.forEach(D)}function F(t){return typeof t=="function"}function y(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function G(t){return Object.keys(t).length===0}function J(t,e){t.appendChild(e)}function $(t,e,n){t.insertBefore(e,n||null)}function p(t){t.parentNode&&t.parentNode.removeChild(t)}function E(t){return document.createElement(t)}function Q(t){return document.createTextNode(t)}function Z(){return Q(" ")}function h(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function W(t){return Array.from(t.childNodes)}let A;function g(t){A=t}const f=[],R=[];let d=[];const z=[],X=Promise.resolve();let O=!1;function Y(){O||(O=!0,X.then(K))}function P(t){d.push(t)}const C=new Set;let u=0;function K(){if(u!==0)return;const t=A;do{try{for(;u<f.length;){const e=f[u];u++,g(e),ee(e.$$)}}catch(e){throw f.length=0,u=0,e}for(g(null),f.length=0,u=0;R.length;)R.pop()();for(let e=0;e<d.length;e+=1){const n=d[e];C.has(n)||(C.add(n),n())}d.length=0}while(f.length);for(;z.length;)z.pop()();O=!1,C.clear(),g(t)}function ee(t){if(t.fragment!==null){t.update(),j(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(P)}}function te(t){const e=[],n=[];d.forEach(r=>t.indexOf(r)===-1?e.push(r):n.push(r)),n.forEach(r=>r()),d=e}const k=new Set;let ne;function m(t,e){t&&t.i&&(k.delete(t),t.i(e))}function L(t,e,n,r){if(t&&t.o){if(k.has(t))return;k.add(t),ne.c.push(()=>{k.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}function T(t){t&&t.c()}function v(t,e,n){const{fragment:r,after_update:s}=t.$$;r&&r.m(e,n),P(()=>{const o=t.$$.on_mount.map(D).filter(F);t.$$.on_destroy?t.$$.on_destroy.push(...o):j(o),t.$$.on_mount=[]}),s.forEach(P)}function _(t,e){const n=t.$$;n.fragment!==null&&(te(n.after_update),j(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function re(t,e){t.$$.dirty[0]===-1&&(f.push(t),Y(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function x(t,e,n,r,s,o,i=null,q=[-1]){const b=A;g(t);const l=t.$$={fragment:null,ctx:[],props:o,update:a,not_equal:s,bound:H(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(b?b.$$.context:[])),callbacks:H(),dirty:q,skip_bound:!1,root:e.target||b.$$.root};i&&i(l.root);let M=!1;if(l.ctx=n?n(t,e.props||{},(c,N,...I)=>{const B=I.length?I[0]:N;return l.ctx&&s(l.ctx[c],l.ctx[c]=B)&&(!l.skip_bound&&l.bound[c]&&l.bound[c](B),M&&re(t,c)),N}):[],l.update(),M=!0,j(l.before_update),l.fragment=r?r(l.ctx):!1,e.target){if(e.hydrate){const c=W(e.target);l.fragment&&l.fragment.l(c),c.forEach(p)}else l.fragment&&l.fragment.c();e.intro&&m(t.$$.fragment),v(t,e.target,e.anchor),K()}g(b)}class w{constructor(){S(this,"$$");S(this,"$$set")}$destroy(){_(this,1),this.$destroy=a}$on(e,n){if(!F(n))return a;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}$set(e){this.$$set&&!G(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const se="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(se);function oe(t){let e;return{c(){e=E("main"),e.innerHTML=`<h3 id="purpose" class="svelte-1q5kfj9">Purpose of This App</h3> <p>Tag Recovery is designed for collaborative writers in the Dreamwidth
    community. The app <strong>saves and recovers previous form text</strong> based
    on the currently logged in username and the community subdomain. Every username
    will have its own separate log of recovered form text values, so that the user
    can quickly pinpoint the appropriate text they wish to recover or continue adding
    to.</p> <hr class="svelte-1q5kfj9"/> <h3 id="support" class="svelte-1q5kfj9">Support This App</h3> <p>Leave a review, promote it on social medial, and consider a small donation,
    so that I can continue maintaining and updating this extension. Click the
    button below:</p> <p><a href="https://ko-fi.com/Z8Z8DBS8S" target="_blank"><img height="36" style="border:0px;height:36px;" src="https://storage.ko-fi.com/cdn/kofi1.png?v=3" alt="Buy Me a Coffee at ko-fi.com"/></a></p> <hr class="svelte-1q5kfj9"/> <h3 id="privacy" class="svelte-1q5kfj9">Privacy Policy</h3> <p>Tag Recovery <strong>does not collect nor save any of the user&#39;s data</strong> to an offsite server. Form text and usernames, stored locally for the purpose
    of convenient retrievel, remain solely on your local computer.</p> <hr class="svelte-1q5kfj9"/> <h3 id="technical" class="svelte-1q5kfj9">Technical</h3> <p>Tag Recovery <strong>saves form text after 2500 miliseconds</strong> of non-action
    from the keyboard. In future updates, this may be customizable by the user.</p> <p>Currently, users can customize how many days the form text will be stored
    until it expires. <strong>The default is 3 days before form text expires</strong>. It can be changed in the extension&#39;s popup window.</p>`,h(e,"class","svelte-1q5kfj9")},m(n,r){$(n,e,r)},p:a,i:a,o:a,d(n){n&&p(e)}}}class ie extends w{constructor(e){super(),x(this,e,null,oe,y,{})}}function le(t){let e;return{c(){e=E("div"),e.innerHTML='<ul class="svelte-v1lgdh"><li class="svelte-v1lgdh"><a href="#purpose" class="svelte-v1lgdh">Purpose</a></li> <li class="svelte-v1lgdh"><a href="#support" class="svelte-v1lgdh">Support</a></li> <li class="svelte-v1lgdh"><a href="#privacy" class="svelte-v1lgdh">Privacy</a></li> <li class="svelte-v1lgdh"><a href="#technical" class="svelte-v1lgdh">Technical</a></li></ul>',h(e,"id","split"),h(e,"class","svelte-v1lgdh")},m(n,r){$(n,e,r)},p:a,i:a,o:a,d(n){n&&p(e)}}}class ae extends w{constructor(e){super(),x(this,e,null,le,y,{})}}const ce="/assets/main-logo-white-transparent-1424441b.svg";function ue(t){let e;return{c(){e=E("div"),e.innerHTML=`<img src="${ce}" alt="Tag Recovery Logo"/>`,h(e,"id","logo-container"),h(e,"class","svelte-1rww215")},m(n,r){$(n,e,r)},p:a,i:a,o:a,d(n){n&&p(e)}}}class fe extends w{constructor(e){super(),x(this,e,null,ue,y,{})}}function de(t){let e,n,r,s,o;return n=new fe({}),s=new ae({}),{c(){e=E("header"),T(n.$$.fragment),r=Z(),T(s.$$.fragment),h(e,"class","svelte-pg9ml3")},m(i,q){$(i,e,q),v(n,e,null),J(e,r),v(s,e,null),o=!0},p:a,i(i){o||(m(n.$$.fragment,i),m(s.$$.fragment,i),o=!0)},o(i){L(n.$$.fragment,i),L(s.$$.fragment,i),o=!1},d(i){i&&p(e),_(n),_(s)}}}class he extends w{constructor(e){super(),x(this,e,null,de,y,{})}}function pe(t){let e,n,r,s;return e=new he({}),r=new ie({}),{c(){T(e.$$.fragment),n=Z(),T(r.$$.fragment)},m(o,i){v(e,o,i),$(o,n,i),v(r,o,i),s=!0},p:a,i(o){s||(m(e.$$.fragment,o),m(r.$$.fragment,o),s=!0)},o(o){L(e.$$.fragment,o),L(r.$$.fragment,o),s=!1},d(o){o&&p(n),_(e,o),_(r,o)}}}class ge extends w{constructor(e){super(),x(this,e,null,pe,y,{})}}new ge({target:document.getElementById("app")});
