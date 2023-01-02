(function(){"use strict";const l="https://9sako6-cors-proxy-server.deno.dev",g=i=>`${l}?quest=${i}`;class p extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}get src(){return this.getAttribute("src")}get baseUrl(){return this.src?new URL(this.src).origin:null}get domain(){return this.src?new URL(this.src).hostname:null}async connectedCallback(){var c,a,s,d;if(!this.src)return;const o=await(await fetch(g(this.src))).text(),t=document.createElement("html");t.innerHTML=o;const e=t.querySelector("head"),r=((c=e==null?void 0:e.querySelector('meta[property="og:title"]'))==null?void 0:c.getAttribute("content"))??void 0,m=((a=e==null?void 0:e.querySelector('meta[property="og:image"]'))==null?void 0:a.getAttribute("content"))??void 0,h=((s=e==null?void 0:e.querySelector('meta[property="og:description"]'))==null?void 0:s.getAttribute("content"))??void 0,v=((d=e==null?void 0:e.querySelector('meta[property="og:url"]'))==null?void 0:d.getAttribute("content"))??void 0,u=`${this.baseUrl}/favicon.ico`;this.render({ogTitle:r,ogImageUrl:m,ogDescription:h,ogUrl:v,faviconUrl:u})}get css(){return`
.ogp-card-anchor {
  text-decoration: none;
  color: inherit;
  display: block;
  max-width: 800px;
}

.ogp-card-anchor:hover {
  background: #f9fdff;
}

.ogp-card-container {
  display: block;
}

.ogp-card {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  justify-content: space-between;
  align-items: center;
  height: 120px;
  font-size: 15px;
  border: 1px solid #ddd;
  border-radius: 0.2em;
  overflow: hidden;
}

.ogp-card-og-image-container {
  height: 120px;
  grid-column: span 2 / span 2;
}

.ogp-card-og-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.ogp-card-main-container {
  padding: 0.5em 1em;
  grid-column: span 4 / span 4;
}

.ogp-card-title {
  max-width: 100%;
  font-size: 1em;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ogp-card-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: rgb(108, 110, 112);
  font-size: 0.8em;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ogp-card-domain-container {
  max-width: 100%;
  padding-top: 0.5em;
  justify-content: end;
  display: flex;
  align-items: center;
  font-size: 0.8em;
  overflow: hidden;
  color: rgb(108, 110, 112);
}

.ogp-card-domain {
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ogp-card-favicon {
  height: 14px;
  width: 14px;
  padding-right: 3px;
}
    `}render({ogTitle:n,ogImageUrl:o,ogDescription:t,ogUrl:e,faviconUrl:r}){this.shadowRoot.innerHTML=`
    <style>${this.css}</style>
    <a href="${e||this.src}" target="_blank" rel="noopener noreferrer" class="ogp-card-anchor">
      <div class="ogp-card-container">
        <div class="ogp-card">
          <div class="ogp-card-main-container">
            <h2 class="ogp-card-title">${n||""}</h2>
            <div class="ogp-card-description">${t||""}</div>
            <div class="ogp-card-domain-container">
              <img class="ogp-card-favicon" src="${r}" />
              <div class="ogp-card-domain">${this.domain}</div>
            </div>
          </div>
          <div class="ogp-card-og-image-container">
            <img class="ogp-card-og-image"
              src="${o||""}" />
          </div>
        </div>
      </div>
    </a>
    `}}customElements.define("og-card",p)})();
