import {first, uniq, compact, startsWith, flattenDeep} from 'lodash'

export function flattenDeepCheerioElements(elements){
  return flattenDeep(
    compact(elements).map(element => element.toArray())
  )
}