import normalizeUrl from 'normalize-url'

export function fetchWebsite(url){
  const normalizedUrl = normalizeUrl(url, {
    normalizeProtocol: true,
    normalizeHttps: false,
    stripFragment: false,
    stripWWW: false,
    removeQueryParameters: false,
    removeTrailingSlash: false,
    removeDirectoryIndex: false
  })

  return fetch(normalizedUrl, {mode: 'no-cors', cache: 'no-cache', redirect: 'follow'})
    .then(response => response.text())
}

export function requestReembed(reembedFields){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('http://reembed.me/g7k3d0z')
    }, 1000)
  })
}
