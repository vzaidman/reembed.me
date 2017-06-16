import normalizeUrl from 'normalize-url'
import axios from 'axios'
import iconv from 'iconv-lite'
import urijs from 'urijs'

const API_URL = process.env.API_URL || ''

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

  return axios({
    url: urijs(API_URL).path('api/v1/fetchWebsite').toString(),
    params: {
      url: normalizedUrl
    },
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
    url: urijs(API_URL).path('api/v1/requestReembed').toString(),
    data: reembedFields,
    method: 'post',
    responseType: 'text'
  }).then(response => {
    const {reembeddedUrl} = response.data
    return reembeddedUrl
  })
}
