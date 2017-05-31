import cheerio from 'cheerio'
import {first, compact, startsWith} from 'lodash'
import urijs from 'urijs'

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
      title: extractTitle(doc),
      description: extractDescription(doc),
      imageUrl: extractImage(doc, urlToFetch)
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

function extractImage(doc, urlToFetch) {
  const imageUrl = first(compact([
    doc("meta[name='image']").attr('content'),
    doc("meta[property='og:image']").attr('content'),
    doc('img').attr('src'),
  ]))

  const imageProtocol = urijs(imageUrl).protocol()
  if(imageProtocol){
    return imageUrl
  }

  if(startsWith(imageUrl, '//')){
    const urlToFetchProtocol = urijs(urlToFetch).protocol()
    return urijs(imageUrl).protocol(urlToFetchProtocol).toString()
  }

  return urijs.joinPaths(urlToFetch, imageUrl).toString()
}