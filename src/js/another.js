require('./main')
import {
  join
} from 'lodash'
import {
  docTitle,
} from './libs/utils'
docTitle('Another')
console.log(join(['Another', 'module', 'loaded!'], ' '))
