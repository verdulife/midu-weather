function N(){}const at=t=>t;function ft(t,e){for(const n in e)t[n]=e[n];return t}function V(t){return t()}function W(){return Object.create(null)}function b(t){t.forEach(V)}function X(t){return typeof t=="function"}function zt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let A;function Ft(t,e){return A||(A=document.createElement("a")),A.href=e,t===A.href}function _t(t){return Object.keys(t).length===0}function dt(t,...e){if(t==null)return N;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Gt(t,e,n){t.$$.on_destroy.push(dt(e,n))}function It(t,e,n,i){if(t){const r=Y(t,e,n,i);return t[0](r)}}function Y(t,e,n,i){return t[1]&&i?ft(n.ctx.slice(),t[1](i(e))):n.ctx}function Wt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const o=[],s=Math.max(e.dirty.length,r.length);for(let c=0;c<s;c+=1)o[c]=e.dirty[c]|r[c];return o}return e.dirty|r}return e.dirty}function Jt(t,e,n,i,r,o){if(r){const s=Y(e,n,i,o);t.p(s,r)}}function Kt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Qt(t,e,n){return t.set(n),e}const Z=typeof window!="undefined";let ht=Z?()=>window.performance.now():()=>Date.now(),z=Z?t=>requestAnimationFrame(t):N;const x=new Set;function tt(t){x.forEach(e=>{e.c(t)||(x.delete(e),e.f())}),x.size!==0&&z(tt)}function mt(t){let e;return x.size===0&&z(tt),{promise:new Promise(n=>{x.add(e={c:t,f:n})}),abort(){x.delete(e)}}}let R=!1;function pt(){R=!0}function gt(){R=!1}function yt(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function xt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let u=0;u<e.length;u++){const _=e[u];_.claim_order!==void 0&&l.push(_)}e=l}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let l=0;l<e.length;l++){const u=e[l].claim_order,_=(r>0&&e[n[r]].claim_order<=u?r+1:yt(1,r,a=>e[n[a]].claim_order,u))-1;i[l]=n[_]+1;const f=_+1;n[f]=l,r=Math.max(f,r)}const o=[],s=[];let c=e.length-1;for(let l=n[r]+1;l!=0;l=i[l-1]){for(o.push(e[l-1]);c>=l;c--)s.push(e[c]);c--}for(;c>=0;c--)s.push(e[c]);o.reverse(),s.sort((l,u)=>l.claim_order-u.claim_order);for(let l=0,u=0;l<s.length;l++){for(;u<o.length&&s[l].claim_order>=o[u].claim_order;)u++;const _=u<o.length?o[u]:null;t.insertBefore(s[l],_)}}function bt(t,e){t.appendChild(e)}function et(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function $t(t){const e=F("style");return wt(et(t),e),e.sheet}function wt(t,e){bt(t.head||t,e)}function vt(t,e){if(R){for(xt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Et(t,e,n){t.insertBefore(e,n||null)}function Nt(t,e,n){R&&!n?vt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function j(t){t.parentNode.removeChild(t)}function Ut(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function F(t){return document.createElement(t)}function nt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function G(t){return document.createTextNode(t)}function Vt(){return G(" ")}function Xt(){return G("")}function Yt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Zt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function te(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function kt(t){return Array.from(t.childNodes)}function it(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function st(t,e,n,i,r=!1){it(t);const o=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const c=t[s];if(e(c)){const l=n(c);return l===void 0?t.splice(s,1):t[s]=l,r||(t.claim_info.last_index=s),c}}for(let s=t.claim_info.last_index-1;s>=0;s--){const c=t[s];if(e(c)){const l=n(c);return l===void 0?t.splice(s,1):t[s]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,c}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function rt(t,e,n,i){return st(t,r=>r.nodeName===e,r=>{const o=[];for(let s=0;s<r.attributes.length;s++){const c=r.attributes[s];n[c.name]||o.push(c.name)}o.forEach(s=>r.removeAttribute(s))},()=>i(e))}function ee(t,e,n){return rt(t,e,n,F)}function ne(t,e,n){return rt(t,e,n,nt)}function At(t,e){return st(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>G(e),!0)}function ie(t){return At(t," ")}function J(t,e,n){for(let i=n;i<t.length;i+=1){const r=t[i];if(r.nodeType===8&&r.textContent.trim()===e)return i}return t.length}function se(t,e){const n=J(t,"HTML_TAG_START",0),i=J(t,"HTML_TAG_END",n);if(n===i)return new K(void 0,e);it(t);const r=t.splice(n,i-n+1);j(r[0]),j(r[r.length-1]);const o=r.slice(1,r.length-1);for(const s of o)s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new K(o,e)}function re(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function le(t,e){t.value=e==null?"":e}function ce(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function oe(t,e,n){t.classList[n?"add":"remove"](e)}function Tt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}class Ct{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=nt(n.nodeName):this.e=F(n.nodeName),this.t=n,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)Et(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(j)}}class K extends Ct{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)Nt(this.t,this.n[n],e)}}const M=new Map;let H=0;function St(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function jt(t,e){const n={stylesheet:$t(e),rules:{}};return M.set(t,n),n}function Q(t,e,n,i,r,o,s,c=0){const l=16.666/i;let u=`{
`;for(let p=0;p<=1;p+=l){const y=e+(n-e)*o(p);u+=p*100+`%{${s(y,1-y)}}
`}const _=u+`100% {${s(n,1-n)}}
}`,f=`__svelte_${St(_)}_${c}`,a=et(t),{stylesheet:d,rules:h}=M.get(a)||jt(a,t);h[f]||(h[f]=!0,d.insertRule(`@keyframes ${f} ${_}`,d.cssRules.length));const g=t.style.animation||"";return t.style.animation=`${g?`${g}, `:""}${f} ${i}ms linear ${r}ms 1 both`,H+=1,f}function Mt(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?o=>o.indexOf(e)<0:o=>o.indexOf("__svelte")===-1),r=n.length-i.length;r&&(t.style.animation=i.join(", "),H-=r,H||Ht())}function Ht(){z(()=>{H||(M.forEach(t=>{const{stylesheet:e}=t;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.rules={}}),M.clear())})}let E;function v(t){E=t}function I(){if(!E)throw new Error("Function called outside component initialization");return E}function ue(t){I().$$.on_mount.push(t)}function ae(t){I().$$.after_update.push(t)}function fe(t,e){return I().$$.context.set(t,e),e}const w=[],U=[],C=[],q=[],lt=Promise.resolve();let B=!1;function ct(){B||(B=!0,lt.then(ot))}function _e(){return ct(),lt}function L(t){C.push(t)}function de(t){q.push(t)}const O=new Set;let T=0;function ot(){const t=E;do{for(;T<w.length;){const e=w[T];T++,v(e),Lt(e.$$)}for(v(null),w.length=0,T=0;U.length;)U.pop()();for(let e=0;e<C.length;e+=1){const n=C[e];O.has(n)||(O.add(n),n())}C.length=0}while(w.length);for(;q.length;)q.pop()();B=!1,O.clear(),v(t)}function Lt(t){if(t.fragment!==null){t.update(),b(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(L)}}let $;function Rt(){return $||($=Promise.resolve(),$.then(()=>{$=null})),$}function P(t,e,n){t.dispatchEvent(Tt(`${e?"intro":"outro"}${n}`))}const S=new Set;let m;function he(){m={r:0,c:[],p:m}}function me(){m.r||b(m.c),m=m.p}function Dt(t,e){t&&t.i&&(S.delete(t),t.i(e))}function pe(t,e,n,i){if(t&&t.o){if(S.has(t))return;S.add(t),m.c.push(()=>{S.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}}const Ot={duration:0};function ge(t,e,n,i){let r=e(t,n),o=i?0:1,s=null,c=null,l=null;function u(){l&&Mt(t,l)}function _(a,d){const h=a.b-o;return d*=Math.abs(h),{a:o,b:a.b,d:h,duration:d,start:a.start,end:a.start+d,group:a.group}}function f(a){const{delay:d=0,duration:h=300,easing:g=at,tick:p=N,css:y}=r||Ot,D={start:ht()+d,b:a};a||(D.group=m,m.r+=1),s||c?c=D:(y&&(u(),l=Q(t,o,a,h,d,g,y)),a&&p(0,1),s=_(D,h),L(()=>P(t,a,"start")),mt(k=>{if(c&&k>c.start&&(s=_(c,h),c=null,P(t,s.b,"start"),y&&(u(),l=Q(t,o,s.b,s.duration,0,g,r.css))),s){if(k>=s.end)p(o=s.b,1-o),P(t,s.b,"end"),c||(s.b?u():--s.group.r||b(s.group.c)),s=null;else if(k>=s.start){const ut=k-s.start;o=s.a+s.d*g(ut/s.duration),p(o,1-o)}}return!!(s||c)}))}return{run(a){X(r)?Rt().then(()=>{r=r(),f(a)}):f(a)},end(){u(),s=c=null}}}function ye(t,e){const n={},i={},r={$$scope:1};let o=t.length;for(;o--;){const s=t[o],c=e[o];if(c){for(const l in s)l in c||(i[l]=1);for(const l in c)r[l]||(n[l]=c[l],r[l]=1);t[o]=c}else for(const l in s)r[l]=1}for(const s in i)s in n||(n[s]=void 0);return n}function xe(t){return typeof t=="object"&&t!==null?t:{}}function be(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function $e(t){t&&t.c()}function we(t,e){t&&t.l(e)}function Pt(t,e,n,i){const{fragment:r,on_mount:o,on_destroy:s,after_update:c}=t.$$;r&&r.m(e,n),i||L(()=>{const l=o.map(V).filter(X);s?s.push(...l):b(l),t.$$.on_mount=[]}),c.forEach(L)}function qt(t,e){const n=t.$$;n.fragment!==null&&(b(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Bt(t,e){t.$$.dirty[0]===-1&&(w.push(t),ct(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ve(t,e,n,i,r,o,s,c=[-1]){const l=E;v(t);const u=t.$$={fragment:null,ctx:null,props:o,update:N,not_equal:r,bound:W(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:W(),dirty:c,skip_bound:!1,root:e.target||l.$$.root};s&&s(u.root);let _=!1;if(u.ctx=n?n(t,e.props||{},(f,a,...d)=>{const h=d.length?d[0]:a;return u.ctx&&r(u.ctx[f],u.ctx[f]=h)&&(!u.skip_bound&&u.bound[f]&&u.bound[f](h),_&&Bt(t,f)),a}):[],u.update(),_=!0,b(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){pt();const f=kt(e.target);u.fragment&&u.fragment.l(f),f.forEach(j)}else u.fragment&&u.fragment.c();e.intro&&Dt(t.$$.fragment),Pt(t,e.target,e.anchor,e.customElement),gt(),ot()}v(l)}class Ee{$destroy(){qt(this,1),this.$destroy=N}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!_t(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{se as $,xe as A,qt as B,ft as C,_e as D,N as E,Ft as F,vt as G,L as H,ge as I,Ut as J,nt as K,ne as L,Gt as M,It as N,Jt as O,Kt as P,Wt as Q,oe as R,Ee as S,Yt as T,Qt as U,b as V,le as W,Zt as X,X as Y,U as Z,K as _,kt as a,be as a0,de as a1,te as b,ee as c,j as d,F as e,ce as f,Nt as g,At as h,ve as i,re as j,Vt as k,Xt as l,ie as m,he as n,pe as o,me as p,Dt as q,fe as r,zt as s,G as t,ae as u,ue as v,$e as w,we as x,Pt as y,ye as z};