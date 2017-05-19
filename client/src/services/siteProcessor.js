import cheerio from 'cheerio'

export function getRelevantTags(htmlText){
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
      image: extractImage(doc)
    })
  })

}

function extractDescription(doc){
  return {
    meta: {
      'description': doc("meta[name='description']").attr('content'),
      'og:description': doc("meta[property='og:description']").attr('content')
    }
  }
}

function extractTitle(doc) {
  // return {
  //   'title': doc('title').text(),
  //   meta: {
  //     'title': doc("meta[name='title']").attr('content'),
  //     'og:title': doc("meta[property='og:title']").attr('content')
  //   }
  // }
}

function extractImage(doc) {
  // return {
  //   meta: {
  //     'image': doc.find("meta[name='image']").attr('content'),
  //     'og:image': doc.find("meta[property='og:image']").attr('content')
  //   },
  //   img: {
  //     'src': doc.find('img').attr('src')
  //   }
  // }
}