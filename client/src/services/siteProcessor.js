export function calculateEmbeddedFields(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        title: 'fetched title',
        description: 'fetched description',
        url: 'fetched url'
      })
    }, 1000)
  })
}