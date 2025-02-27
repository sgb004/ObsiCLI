(function(s){typeof define=="function"&&define.amd?define(s):s()})(function(){"use strict";var f=s=>{throw TypeError(s)};var a=(s,i,e)=>i.has(s)||f("Cannot "+e);var u=(s,i,e)=>(a(s,i,"read from private field"),e?e.call(s):i.get(s)),d=(s,i,e)=>i.has(s)?f("Cannot add the same private member more than once"):i instanceof WeakSet?i.add(s):i.set(s,e),c=(s,i,e,r)=>(a(s,i,"write to private field"),r?r.call(s,e):i.set(s,e),e),l=(s,i,e)=>(a(s,i,"access private method"),e);var i,e,r,o,m,p,v,b;class s extends HTMLElement{constructor(){super();d(this,o);d(this,i);d(this,e);d(this,r);this.innerHTML=`
			<div class="screen">
				<div class="output">
				</div>
				<form class="input">
					<input type="text" value="" />
					<input type="submit" value="" />
				</form>
			</div>
		`,c(this,i,this.querySelector(".output")),c(this,e,this.querySelector('form.input input[type="text"]')),c(this,r,{resolve:()=>{},reject:()=>{}}),l(this,o,m).call(this)}ou(t,n=""){const h=document.createElement("pre");["error","warning","success"].includes(n)&&h.classList.add(n),h.textContent=t,u(this,i).appendChild(h),this.scrollTo(0,this.scrollHeight)}ouError(t){this.ou(t,"error")}ouWarning(t){this.ou(t,"warning")}ouSuccess(t){this.ou(t,"success")}in(){return new Promise((t,n)=>{c(this,r,{resolve:t,reject:n})})}open(t){const n=t==null||t==null?`
ObsiCLI was opened correctly.`:t;this.ou(n),u(this,e).removeAttribute("disabled"),u(this,e).focus(),l(this,o,p).call(this,"opened")}close(t){const n=t==null||t==null?`
ObsiCLI was closed correctly.`:t;this.ou(n),u(this,e).setAttribute("disabled","disabled"),u(this,e).value="",l(this,o,p).call(this,"closed")}}i=new WeakMap,e=new WeakMap,r=new WeakMap,o=new WeakSet,m=function(){const t=this.querySelector(".input");t instanceof HTMLFormElement&&t.addEventListener("submit",l(this,o,v).bind(this)),this.addEventListener("click",l(this,o,b).bind(this))},p=function(t){const n=new CustomEvent(t);this.dispatchEvent(n)},v=function(t){t.preventDefault(),this.ou(u(this,e).value),u(this,r).resolve(u(this,e).value),t.currentTarget.reset(),c(this,r,{resolve:()=>{},reject:()=>{}})},b=function(){requestAnimationFrame(()=>{const t=window.getSelection();let n=!1;t.isCollapsed||t.anchorNode.parentNode.closest("obsi-cl")===this&&(n=!0),n||u(this,e).focus()})},customElements.define("obsi-cli",s)});
