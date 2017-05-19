import normalizeUrl from 'normalize-url'
import iconv from 'iconv-lite'

const API_HOST = 'http://localhost:5000'

export function fetchWebsite(url) {
  const normalizedUrl = normalizeUrl(url, {
    normalizeProtocol: true,
    normalizeHttps: false,
    stripFragment: false,
    stripWWW: false,
    removeQueryParameters: false,
    removeTrailingSlash: false,
    removeDirectoryIndex: false
  })

  const encodedUrl = encodeURIComponent(normalizedUrl)

  return fetch(`${API_HOST}/api/v1/fetchWebsite?url=${encodedUrl}`, {mode: 'cors'})
    .then(response => {
      const contentType = response.headers.get('content-type')
      const charsetMatch = /charset=\s*"?([^\s;"]*)/i.exec(contentType)
      const matchedCharset = charsetMatch && charsetMatch[1]
      const charset = iconv.encodingExists(matchedCharset) ? matchedCharset : 'utf-8'
      return response.text()
        .then(text => {
          const decoded = iconv.decode(text, charset)
          debugger
          return decoded
        })
    })
}

export function requestReembed(reembedFields){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('http://reembed.me/g7k3d0z')
    }, 1000)
  })
}
