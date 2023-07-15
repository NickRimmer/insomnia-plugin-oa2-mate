import { PluginTemplateTag } from '../insomnia/insomnia.types'
import { getCurrentTokenAsync } from '../services/main'

export const tokenTag: PluginTemplateTag = {
  name: 'oa2_mate',
  displayName: 'oa2_mate',
  description: 'Latest known OAuth2 token for current environment',
  args: [],
  async run(arg) {
    const storedToken = await getCurrentTokenAsync()
    return storedToken?.accessToken ?? (!arg.renderPurpose ? '(no workspace tokens found)' : null)
  }
}
