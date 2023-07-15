import { PluginTemplateTag } from '../insomnia/insomnia.types'
import { getCurrentTokenAsync, getLatestTokenAsync } from '../services/main'

export const tokenTag: PluginTemplateTag = {
  name: 'oa2_mate',
  displayName: 'oa2_mate',
  description: 'Latest known OAuth2 token for current environment',
  args: [
    {
      displayName: 'Use environment-specific access tokens only.',
      help: 'If checked, the access token will strictly correspond to the currently selected environment. Otherwise will be used the most recent access token regardless of the currently selected environment.',
      type: 'boolean',
      defaultValue: false,
    }
  ],
  async run(ctx, environmentSpecific) {
    // console.log('[oa2-mate] tokenTag.run', ctx, args)
    const storedToken = environmentSpecific === true
      ? await getCurrentTokenAsync()
      : await getLatestTokenAsync()

    return storedToken?.accessToken ?? (!ctx.renderPurpose ? `(no ${environmentSpecific === true ? 'environment' : 'workspace'} tokens found)` : null)
  }
}
