import { tokenTag } from './template-tags/token-tag'
import { init } from './services/main'

init()

module.exports = {
  templateTags: [tokenTag],
}
