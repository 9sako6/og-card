import { buildUrlWithProxy } from "./proxy/cors-proxy-server";

type OGP = {
  ogTitle?: string;
  ogImageUrl?: string;
  ogDescription?: string;
  ogUrl?: string;
};

type MetaInfo = {
  faviconUrl?: string;
} & OGP;

class OgCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  get src() {
    return this.getAttribute("src");
  }

  get baseUrl() {
    return this.src ? (new URL(this.src)).origin : null;
  }

  get domain() {
    return this.src ? (new URL(this.src)).hostname : null;
  }

  async connectedCallback() {
    if (!this.src) return;

    const res = await fetch(buildUrlWithProxy(this.src));
    const html = await res.text();
    const wrapper = document.createElement("html");
    wrapper.innerHTML = html;

    const head = wrapper.querySelector("head");
    const ogTitle =
      head?.querySelector('meta[property="og:title"]')?.getAttribute(
        "content",
      ) ?? undefined;
    const ogImageUrl =
      head?.querySelector('meta[property="og:image"]')?.getAttribute(
        "content",
      ) ?? undefined;
    const ogDescription =
      head?.querySelector('meta[property="og:description"]')?.getAttribute(
        "content",
      ) ?? undefined;
    const ogUrl =
      head?.querySelector('meta[property="og:url"]')?.getAttribute("content") ??
        undefined;

    const faviconUrl = `${this.baseUrl}/favicon.ico`;

    this.render({ ogTitle, ogImageUrl, ogDescription, ogUrl, faviconUrl });
  }

  get css() {
    return `
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
    `;
  }

  render({ ogTitle, ogImageUrl, ogDescription, ogUrl, faviconUrl }: MetaInfo) {
    this.shadowRoot!.innerHTML = `
    <style>${this.css}</style>
    <a href="${
      ogUrl || this.src
    }" target="_blank" rel="noopener noreferrer" class="ogp-card-anchor">
      <div class="ogp-card-container">
        <div class="ogp-card">
          <div class="ogp-card-main-container">
            <h2 class="ogp-card-title">${ogTitle || ""}</h2>
            <div class="ogp-card-description">${ogDescription || ""}</div>
            <div class="ogp-card-domain-container">
              <img class="ogp-card-favicon" src="${faviconUrl}" />
              <div class="ogp-card-domain">${this.domain}</div>
            </div>
          </div>
          <div class="ogp-card-og-image-container">
            <img class="ogp-card-og-image"
              src="${ogImageUrl || ""}" />
          </div>
        </div>
      </div>
    </a>
    `;
  }
}

customElements.define("og-card", OgCard);
