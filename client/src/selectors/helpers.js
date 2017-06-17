import normalizeUrl from 'normalize-url'

const normalizeUrlConfigs = {
  normalizeProtocol: true,
  normalizeHttps: false,
  stripFragment: false,
  stripWWW: false,
  removeQueryParameters: false,
  removeTrailingSlash: false,
  removeDirectoryIndex: false
}

export function normalizeFetchUrl(url){
  return normalizeUrl(url, normalizeUrlConfigs)
}
