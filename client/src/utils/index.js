import {compact, flattenDeep} from 'lodash'

export function flattenDeepCheerioElements(elements){
  return flattenDeep(
    compact(elements).map(element => element.toArray())
  )
}