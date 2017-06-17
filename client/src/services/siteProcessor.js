import {first, uniq, compact, startsWith} from 'lodash'

import cheerio from 'cheerio'
import urijs from 'urijs'

import {flattenDeepCheerioElements} from 'utils'

export function getRelevantTags(htmlText, urlToFetch){
  return new Promise((resolve, reject) => {
    const doc = cheerio.load(htmlText, {
      ignoreWhitespace: true,
      decodeEntities: true,
      lowerCaseTags: true,
      lowerCaseAttributeNames: true,
      recognizeCDATA: true,
      recognizeSelfClosing: true
    })

    resolve({
      title: extractTitle(doc) || '',
      description: extractDescription(doc) || '',
      imageUrls: extractImages(doc, urlToFetch)
    })
  })
}

function extractDescription(doc){
  return first(compact([
    doc("meta[name='description']").attr('content'),
    doc("meta[property='og:description']").attr('content')
  ]))
}

function extractTitle(doc) {
  return first(compact([
    doc("meta[name='title']").attr('content'),
    doc("meta[property='og:title']").attr('content'),
    doc('title').text(),
  ]))
}

function extractImages(doc, urlToFetch) {
  const imageUrls = flattenDeepCheerioElements([
    doc("meta[name='image']").attr("content"),
    doc("meta[property='og:image']").attr("content"),
    doc("img").map((i, imgNode) => doc(imgNode).attr("src"))
  ])

  return uniq(imageUrls
    .map(imageUrl => imageUrl.replace('\\', '/'))
    .map(imageUrl => {
      const imageProtocol = urijs(imageUrl).protocol()
      if(imageProtocol){
        return imageUrl
      }

      if(startsWith(imageUrl, '//')){
        const urlToFetchProtocol = urijs(urlToFetch).protocol()
        return urijs(imageUrl).protocol(urlToFetchProtocol).toString()
      }

      return urijs(imageUrl).absoluteTo(urlToFetch).toString()
    })
  )
}