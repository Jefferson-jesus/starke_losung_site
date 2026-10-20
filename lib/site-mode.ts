export type SiteMode = "standard" | "premium";

export const SITE_MODE_COOKIE = "SITE_MODE";

export function resolveSiteMode(value?: string | null): SiteMode | null {
  if (value === "standard" || value === "premium") {
    return value;
  }
  return null;
}

// Run before paint so a saved mode does not require a server-rendered cookie variant.
export function getModeInitScript(defaultMode: SiteMode) {
  return `(function(){var mode=${JSON.stringify(defaultMode)};try{var query=new URLSearchParams(location.search).get('mode');if(query==='standard'||query==='premium'){mode=query}else{var stored=localStorage.getItem('site-mode');if(stored==='standard'||stored==='premium'){mode=stored}}}catch(e){}document.documentElement.dataset.mode=mode})()`;
}
