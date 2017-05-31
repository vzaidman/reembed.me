import normalizeUrl from 'normalize-url'
import axios from 'axios'
import iconv from 'iconv-lite'

const API_URL = process.env.API_URL

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

  return axios({
    url: `${API_URL}/api/v1/fetchWebsite?url=${encodedUrl}`,
    method: 'get',
    responseType: 'text'
  }).then(response => {
      const contentType = response.headers['content-type']
      const charsetMatch = /charset=\s*"?([^\s;"]*)/i.exec(contentType)
      const matchedCharset = charsetMatch && charsetMatch[1]
      const charset = (matchedCharset && iconv.encodingExists(matchedCharset)) ?
        matchedCharset : 'utf-8'

      return iconv.decode(response.data, charset)
    })
}

export function requestReembed(reembedFields){
  return axios({
    url: `${API_URL}/api/v1/requestReembed`,
    data: reembedFields,
    method: 'post',
    responseType: 'text'
  }).then(response => {
    return response.data
  })
}
