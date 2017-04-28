export function calculateEmbeddedFields(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        title: 'My Own Title',
        description: 'My Own Description',
        useUrl: false,
        url: 'http://www.google.com'
      })
    }, 1000)
  })
}