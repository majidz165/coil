(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function _(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=_(n);fetch(n.href,r)}})();var N,d,X,x,K,ee,W,V,B,H,C={},te=[],le=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Z=Array.isArray;function P(t,e){for(var _ in e)t[_]=e[_];return t}function _e(t){var e=t.parentNode;e&&e.removeChild(t)}function ce(t,e,_){var i,n,r,l={};for(r in e)r=="key"?i=e[r]:r=="ref"?n=e[r]:l[r]=e[r];if(arguments.length>2&&(l.children=arguments.length>3?N.call(arguments,2):_),typeof t=="function"&&t.defaultProps!=null)for(r in t.defaultProps)l[r]===void 0&&(l[r]=t.defaultProps[r]);return I(t,l,i,n,null)}function I(t,e,_,i,n){var r={type:t,props:e,key:_,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:n??++X,__i:-1,__u:0};return n==null&&d.vnode!=null&&d.vnode(r),r}function O(t){return t.children}function A(t,e){this.props=t,this.context=e}function S(t,e){if(e==null)return t.__?S(t.__,t.__i+1):null;for(var _;e<t.__k.length;e++)if((_=t.__k[e])!=null&&_.__e!=null)return _.__e;return typeof t.type=="function"?S(t):null}function ne(t){var e,_;if((t=t.__)!=null&&t.__c!=null){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if((_=t.__k[e])!=null&&_.__e!=null){t.__e=t.__c.base=_.__e;break}return ne(t)}}function Y(t){(!t.__d&&(t.__d=!0)&&x.push(t)&&!E.__r++||K!==d.debounceRendering)&&((K=d.debounceRendering)||ee)(E)}function E(){var t,e,_,i,n,r,l,c;for(x.sort(W);t=x.shift();)t.__d&&(e=x.length,i=void 0,r=(n=(_=t).__v).__e,l=[],c=[],_.__P&&((i=P({},n)).__v=n.__v+1,d.vnode&&d.vnode(i),z(_.__P,i,n,_.__n,_.__P.namespaceURI,32&n.__u?[r]:null,l,r??S(n),!!(32&n.__u),c),i.__v=n.__v,i.__.__k[i.__i]=i,ie(l,i,c),i.__e!=r&&ne(i)),x.length>e&&x.sort(W));E.__r=0}function oe(t,e,_,i,n,r,l,c,u,s,p){var o,m,f,v,b,y=i&&i.__k||te,a=e.length;for(_.__d=u,se(_,e,y),u=_.__d,o=0;o<a;o++)(f=_.__k[o])!=null&&typeof f!="boolean"&&typeof f!="function"&&(m=f.__i===-1?C:y[f.__i]||C,f.__i=o,z(t,f,m,n,r,l,c,u,s,p),v=f.__e,f.ref&&m.ref!=f.ref&&(m.ref&&q(m.ref,null,f),p.push(f.ref,f.__c||v,f)),b==null&&v!=null&&(b=v),65536&f.__u||m.__k===f.__k?u=re(f,u,t):typeof f.type=="function"&&f.__d!==void 0?u=f.__d:v&&(u=v.nextSibling),f.__d=void 0,f.__u&=-196609);_.__d=u,_.__e=b}function se(t,e,_){var i,n,r,l,c,u=e.length,s=_.length,p=s,o=0;for(t.__k=[],i=0;i<u;i++)l=i+o,(n=t.__k[i]=(n=e[i])==null||typeof n=="boolean"||typeof n=="function"?null:typeof n=="string"||typeof n=="number"||typeof n=="bigint"||n.constructor==String?I(null,n,null,null,null):Z(n)?I(O,{children:n},null,null,null):n.constructor===void 0&&n.__b>0?I(n.type,n.props,n.key,n.ref?n.ref:null,n.__v):n)!=null?(n.__=t,n.__b=t.__b+1,c=fe(n,_,l,p),n.__i=c,r=null,c!==-1&&(p--,(r=_[c])&&(r.__u|=131072)),r==null||r.__v===null?(c==-1&&o--,typeof n.type!="function"&&(n.__u|=65536)):c!==l&&(c==l-1?o--:c==l+1?o++:c>l?p>u-l?o+=c-l:o--:c<l&&(c==l-o?o-=c-l:o++),c!==i+o&&(n.__u|=65536))):(r=_[l])&&r.key==null&&r.__e&&!(131072&r.__u)&&(r.__e==t.__d&&(t.__d=S(r)),j(r,r,!1),_[l]=null,p--);if(p)for(i=0;i<s;i++)(r=_[i])!=null&&!(131072&r.__u)&&(r.__e==t.__d&&(t.__d=S(r)),j(r,r))}function re(t,e,_){var i,n;if(typeof t.type=="function"){for(i=t.__k,n=0;i&&n<i.length;n++)i[n]&&(i[n].__=t,e=re(i[n],e,_));return e}t.__e!=e&&(e&&t.type&&!_.contains(e)&&(e=S(t)),_.insertBefore(t.__e,e||null),e=t.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType===8);return e}function fe(t,e,_,i){var n=t.key,r=t.type,l=_-1,c=_+1,u=e[_];if(u===null||u&&n==u.key&&r===u.type&&!(131072&u.__u))return _;if(i>(u!=null&&!(131072&u.__u)?1:0))for(;l>=0||c<e.length;){if(l>=0){if((u=e[l])&&!(131072&u.__u)&&n==u.key&&r===u.type)return l;l--}if(c<e.length){if((u=e[c])&&!(131072&u.__u)&&n==u.key&&r===u.type)return c;c++}}return-1}function J(t,e,_){e[0]==="-"?t.setProperty(e,_??""):t[e]=_==null?"":typeof _!="number"||le.test(e)?_:_+"px"}function U(t,e,_,i,n){var r;e:if(e==="style")if(typeof _=="string")t.style.cssText=_;else{if(typeof i=="string"&&(t.style.cssText=i=""),i)for(e in i)_&&e in _||J(t.style,e,"");if(_)for(e in _)i&&_[e]===i[e]||J(t.style,e,_[e])}else if(e[0]==="o"&&e[1]==="n")r=e!==(e=e.replace(/(PointerCapture)$|Capture$/i,"$1")),e=e.toLowerCase()in t||e==="onFocusOut"||e==="onFocusIn"?e.toLowerCase().slice(2):e.slice(2),t.l||(t.l={}),t.l[e+r]=_,_?i?_.u=i.u:(_.u=V,t.addEventListener(e,r?H:B,r)):t.removeEventListener(e,r?H:B,r);else{if(n=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in t)try{t[e]=_??"";break e}catch{}typeof _=="function"||(_==null||_===!1&&e[4]!=="-"?t.removeAttribute(e):t.setAttribute(e,e=="popover"&&_==1?"":_))}}function Q(t){return function(e){if(this.l){var _=this.l[e.type+t];if(e.t==null)e.t=V++;else if(e.t<_.u)return;return _(d.event?d.event(e):e)}}}function z(t,e,_,i,n,r,l,c,u,s){var p,o,m,f,v,b,y,a,h,L,w,F,M,G,T,R,k=e.type;if(e.constructor!==void 0)return null;128&_.__u&&(u=!!(32&_.__u),r=[c=e.__e=_.__e]),(p=d.__b)&&p(e);e:if(typeof k=="function")try{if(a=e.props,h="prototype"in k&&k.prototype.render,L=(p=k.contextType)&&i[p.__c],w=p?L?L.props.value:p.__:i,_.__c?y=(o=e.__c=_.__c).__=o.__E:(h?e.__c=o=new k(a,w):(e.__c=o=new A(a,w),o.constructor=k,o.render=pe),L&&L.sub(o),o.props=a,o.state||(o.state={}),o.context=w,o.__n=i,m=o.__d=!0,o.__h=[],o._sb=[]),h&&o.__s==null&&(o.__s=o.state),h&&k.getDerivedStateFromProps!=null&&(o.__s==o.state&&(o.__s=P({},o.__s)),P(o.__s,k.getDerivedStateFromProps(a,o.__s))),f=o.props,v=o.state,o.__v=e,m)h&&k.getDerivedStateFromProps==null&&o.componentWillMount!=null&&o.componentWillMount(),h&&o.componentDidMount!=null&&o.__h.push(o.componentDidMount);else{if(h&&k.getDerivedStateFromProps==null&&a!==f&&o.componentWillReceiveProps!=null&&o.componentWillReceiveProps(a,w),!o.__e&&(o.shouldComponentUpdate!=null&&o.shouldComponentUpdate(a,o.__s,w)===!1||e.__v===_.__v)){for(e.__v!==_.__v&&(o.props=a,o.state=o.__s,o.__d=!1),e.__e=_.__e,e.__k=_.__k,e.__k.forEach(function(D){D&&(D.__=e)}),F=0;F<o._sb.length;F++)o.__h.push(o._sb[F]);o._sb=[],o.__h.length&&l.push(o);break e}o.componentWillUpdate!=null&&o.componentWillUpdate(a,o.__s,w),h&&o.componentDidUpdate!=null&&o.__h.push(function(){o.componentDidUpdate(f,v,b)})}if(o.context=w,o.props=a,o.__P=t,o.__e=!1,M=d.__r,G=0,h){for(o.state=o.__s,o.__d=!1,M&&M(e),p=o.render(o.props,o.state,o.context),T=0;T<o._sb.length;T++)o.__h.push(o._sb[T]);o._sb=[]}else do o.__d=!1,M&&M(e),p=o.render(o.props,o.state,o.context),o.state=o.__s;while(o.__d&&++G<25);o.state=o.__s,o.getChildContext!=null&&(i=P(P({},i),o.getChildContext())),h&&!m&&o.getSnapshotBeforeUpdate!=null&&(b=o.getSnapshotBeforeUpdate(f,v)),oe(t,Z(R=p!=null&&p.type===O&&p.key==null?p.props.children:p)?R:[R],e,_,i,n,r,l,c,u,s),o.base=e.__e,e.__u&=-161,o.__h.length&&l.push(o),y&&(o.__E=o.__=null)}catch(D){if(e.__v=null,u||r!=null){for(e.__u|=u?160:32;c&&c.nodeType===8&&c.nextSibling;)c=c.nextSibling;r[r.indexOf(c)]=null,e.__e=c}else e.__e=_.__e,e.__k=_.__k;d.__e(D,e,_)}else r==null&&e.__v===_.__v?(e.__k=_.__k,e.__e=_.__e):e.__e=ue(_.__e,e,_,i,n,r,l,u,s);(p=d.diffed)&&p(e)}function ie(t,e,_){e.__d=void 0;for(var i=0;i<_.length;i++)q(_[i],_[++i],_[++i]);d.__c&&d.__c(e,t),t.some(function(n){try{t=n.__h,n.__h=[],t.some(function(r){r.call(n)})}catch(r){d.__e(r,n.__v)}})}function ue(t,e,_,i,n,r,l,c,u){var s,p,o,m,f,v,b,y=_.props,a=e.props,h=e.type;if(h==="svg"?n="http://www.w3.org/2000/svg":h==="math"?n="http://www.w3.org/1998/Math/MathML":n||(n="http://www.w3.org/1999/xhtml"),r!=null){for(s=0;s<r.length;s++)if((f=r[s])&&"setAttribute"in f==!!h&&(h?f.localName===h:f.nodeType===3)){t=f,r[s]=null;break}}if(t==null){if(h===null)return document.createTextNode(a);t=document.createElementNS(n,h,a.is&&a),r=null,c=!1}if(h===null)y===a||c&&t.data===a||(t.data=a);else{if(r=r&&N.call(t.childNodes),y=_.props||C,!c&&r!=null)for(y={},s=0;s<t.attributes.length;s++)y[(f=t.attributes[s]).name]=f.value;for(s in y)if(f=y[s],s!="children"){if(s=="dangerouslySetInnerHTML")o=f;else if(s!=="key"&&!(s in a)){if(s=="value"&&"defaultValue"in a||s=="checked"&&"defaultChecked"in a)continue;U(t,s,null,f,n)}}for(s in a)f=a[s],s=="children"?m=f:s=="dangerouslySetInnerHTML"?p=f:s=="value"?v=f:s=="checked"?b=f:s==="key"||c&&typeof f!="function"||y[s]===f||U(t,s,f,y[s],n);if(p)c||o&&(p.__html===o.__html||p.__html===t.innerHTML)||(t.innerHTML=p.__html),e.__k=[];else if(o&&(t.innerHTML=""),oe(t,Z(m)?m:[m],e,_,i,h==="foreignObject"?"http://www.w3.org/1999/xhtml":n,r,l,r?r[0]:_.__k&&S(_,0),c,u),r!=null)for(s=r.length;s--;)r[s]!=null&&_e(r[s]);c||(s="value",v!==void 0&&(v!==t[s]||h==="progress"&&!v||h==="option"&&v!==y[s])&&U(t,s,v,y[s],n),s="checked",b!==void 0&&b!==t[s]&&U(t,s,b,y[s],n))}return t}function q(t,e,_){try{if(typeof t=="function"){var i=typeof t.__u=="function";i&&t.__u(),i&&e==null||(t.__u=t(e))}else t.current=e}catch(n){d.__e(n,_)}}function j(t,e,_){var i,n;if(d.unmount&&d.unmount(t),(i=t.ref)&&(i.current&&i.current!==t.__e||q(i,null,e)),(i=t.__c)!=null){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(r){d.__e(r,e)}i.base=i.__P=null}if(i=t.__k)for(n=0;n<i.length;n++)i[n]&&j(i[n],e,_||typeof t.type!="function");_||t.__e==null||_e(t.__e),t.__c=t.__=t.__e=t.__d=void 0}function pe(t,e,_){return this.constructor(t,_)}function ae(t,e,_){var i,n,r,l;d.__&&d.__(t,e),n=(i=typeof _=="function")?null:e.__k,r=[],l=[],z(e,t=(!i&&_||e).__k=ce(O,null,[t]),n||C,C,e.namespaceURI,!i&&_?[_]:n?null:e.firstChild?N.call(e.childNodes):null,r,!i&&_?_:n?n.__e:e.firstChild,i,l),ie(r,t,l)}N=te.slice,d={__e:function(t,e,_,i){for(var n,r,l;e=e.__;)if((n=e.__c)&&!n.__)try{if((r=n.constructor)&&r.getDerivedStateFromError!=null&&(n.setState(r.getDerivedStateFromError(t)),l=n.__d),n.componentDidCatch!=null&&(n.componentDidCatch(t,i||{}),l=n.__d),l)return n.__E=n}catch(c){t=c}throw t}},X=0,A.prototype.setState=function(t,e){var _;_=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=P({},this.state),typeof t=="function"&&(t=t(P({},_),this.props)),t&&P(_,t),t!=null&&this.__v&&(e&&this._sb.push(e),Y(this))},A.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),Y(this))},A.prototype.render=O,x=[],ee=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,W=function(t,e){return t.__v.__b-e.__v.__b},E.__r=0,V=0,B=Q(!1),H=Q(!0);var de=0;function g(t,e,_,i,n,r){e||(e={});var l,c,u=e;if("ref"in u)for(c in u={},e)c=="ref"?l=e[c]:u[c]=e[c];var s={type:t,props:u,key:_,ref:l,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:--de,__i:-1,__u:0,__source:n,__self:r};if(typeof t=="function"&&(l=t.defaultProps))for(c in l)u[c]===void 0&&(u[c]=l[c]);return d.vnode&&d.vnode(s),s}const he="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='27.68'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20296'%3e%3cpath%20fill='%23673AB8'%20d='m128%200l128%2073.9v147.8l-128%2073.9L0%20221.7V73.9z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M34.865%20220.478c17.016%2021.78%2071.095%205.185%20122.15-34.704c51.055-39.888%2080.24-88.345%2063.224-110.126c-17.017-21.78-71.095-5.184-122.15%2034.704c-51.055%2039.89-80.24%2088.346-63.224%20110.126Zm7.27-5.68c-5.644-7.222-3.178-21.402%207.573-39.253c11.322-18.797%2030.541-39.548%2054.06-57.923c23.52-18.375%2048.303-32.004%2069.281-38.442c19.922-6.113%2034.277-5.075%2039.92%202.148c5.644%207.223%203.178%2021.403-7.573%2039.254c-11.322%2018.797-30.541%2039.547-54.06%2057.923c-23.52%2018.375-48.304%2032.004-69.281%2038.441c-19.922%206.114-34.277%205.076-39.92-2.147Z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M220.239%20220.478c17.017-21.78-12.169-70.237-63.224-110.126C105.96%2070.464%2051.88%2053.868%2034.865%2075.648c-17.017%2021.78%2012.169%2070.238%2063.224%20110.126c51.055%2039.889%20105.133%2056.485%20122.15%2034.704Zm-7.27-5.68c-5.643%207.224-19.998%208.262-39.92%202.148c-20.978-6.437-45.761-20.066-69.28-38.441c-23.52-18.376-42.74-39.126-54.06-57.923c-10.752-17.851-13.218-32.03-7.575-39.254c5.644-7.223%2019.999-8.261%2039.92-2.148c20.978%206.438%2045.762%2020.067%2069.281%2038.442c23.52%2018.375%2042.739%2039.126%2054.06%2057.923c10.752%2017.85%2013.218%2032.03%207.574%2039.254Z'%3e%3c/path%3e%3cpath%20fill='%23FFF'%20d='M127.552%20167.667c10.827%200%2019.603-8.777%2019.603-19.604c0-10.826-8.776-19.603-19.603-19.603c-10.827%200-19.604%208.777-19.604%2019.603c0%2010.827%208.777%2019.604%2019.604%2019.604Z'%3e%3c/path%3e%3c/svg%3e";function ve(){return g("div",{children:[g("a",{href:"https://preactjs.com",target:"_blank",children:g("img",{src:he,alt:"Preact logo",height:"160",width:"160"})}),g("h1",{children:"Get Started building Vite-powered Preact Apps "}),g("section",{children:[g($,{title:"Learn Preact",description:"If you're new to Preact, try the interactive tutorial to learn important concepts",href:"https://preactjs.com/tutorial"}),g($,{title:"Differences to React",description:"If you're coming from React, you may want to check out our docs to see where Preact differs",href:"https://preactjs.com/guide/v10/differences-to-react"}),g($,{title:"Learn Vite",description:"To learn more about Vite and how you can customize it to fit your needs, take a look at their excellent documentation",href:"https://vitejs.dev"})]})]})}function $(t){return g("a",{href:t.href,target:"_blank",class:"resource",children:[g("h2",{children:t.title}),g("p",{children:t.description})]})}ae(g(ve,{}),document.getElementById("app"));
