import htmlparser from 'htmlparser2'

export function getRelevantTags(htmlText){
  return new Promise((resolve, reject) => {
    const tags = {
      meta: [],
      title: undefined
    }

    let currentTag = undefined
    const parserEvents = {
      onopentag(name, attributes){
        currentTag = name
        if(currentTag === 'meta'){
          if(!tags.meta[name]){
            tags.meta[name] = []
          }
          tags.meta.push(attributes)
        }
      },
      ontext(text){
        if(currentTag === 'title'){
          tags.title = text
        }
      },
      onerror(error){
        reject(error)
      },
      onend(){
        resolve(tags)
      }
    }

    const parser = new htmlparser.Parser(parserEvents, {
      decodeEntities: true,
      lowerCaseTags: true,
      lowerCaseAttributeNames: true,
      recognizeCDATA: true
    })
    parser.write(htmlText)
    parser.end()
  })

}