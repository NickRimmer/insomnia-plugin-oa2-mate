// cached worksapces for oa2 tokens
const cache = {}

const getState = () => {
    let rootElement = document.querySelector("#root")
    let store = rootElement[Object.getOwnPropertyNames(rootElement).findLast(x => x.startsWith("__reactContainer"))].memoizedState.element.props.store
    return store.getState()
}

const getElement = (id, state) => {
    if (id.startsWith("oa2_")) return state.entities.oAuth2Tokens[id]
    if (id.startsWith("req_")) return state.entities.requests[id]
    if (id.startsWith("fld_")) return state.entities.requestGroups[id]
    if (id.startsWith("wrk_")) return state.entities.workspaces[id]

    console.error("Unknown id type: " + id)
    return null
}

const getWorkspace = (id, state) => {
    if (id.startsWith("wrk_")) return id
    let element = getElement(id, state)

    if (!element?.parentId) {
        console.error("No parent found for " + id)
        return null
    }

    return getWorkspace(element.parentId, state)
}

const getOa2Workspace = (id, state) => {
    if (cache[id]) return cache[id]

    let result = getWorkspace(id, state)
    if (result === null) return null

    cache[id] = result
    return result
}

const getOa2 = (workspaceId, state) => {
    let allTokens = Object.values(state.entities.oAuth2Tokens)
    let workspaceTokens = allTokens.filter(x => getOa2Workspace(x._id, state) === workspaceId)
    if (workspaceTokens.length === 0) {
        console.warn("No tokens found for workspace " + workspaceId)
        return null
    }

    let latest = workspaceTokens.sort((a, b) => b.modified - a.modified)[0]
    return latest.accessToken
}

const tokenTag = {
    name: 'oa2_mate',
    displayName: 'oa2_mate',
    description: 'Latest known OAuth2 token',
    args: [],
    async run(arg) {
        return getOa2(arg.meta.workspaceId, getState()) ?? (!arg.renderPurpose ? "(no workspace tokens found)" : null)
    }
}

module.exports = {
    templateTags: [tokenTag],
}