import { PluginTemplateTag } from '../insomnia/insomnia.types'
import { getOa2 } from '../services/oa2'

export const tokenTag: PluginTemplateTag = {
  name: 'oa2_mate',
  displayName: 'oa2_mate',
  description: 'Latest known OAuth2 token',
  args: [],
  async run(arg) {
    const token = getOa2(arg.meta.workspaceId)
    return token ?? (!arg.renderPurpose ? '(no workspace tokens found)' : null)
  }
}
