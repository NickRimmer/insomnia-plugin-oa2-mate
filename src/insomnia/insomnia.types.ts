/* eslint-disable @typescript-eslint/no-explicit-any */
export type PluginTemplateTag = {
    args: any[],
    name: string,
    displayName: string,
    // disablePreview: () => boolean,
    description: string,
    // actions: any[],
    run: (context: any, ...arg: any[]) => Promise<any> | any,
    deprecated?: boolean,
    validate?: (value: any) => string | null,
    priority?: number,
}

export type BaseDoc = {
    _id: string,
    parentId: string,
    modified: number,
    type: string,
} & Record<string, string>

export type WindowApp = {
    getAppPath: () => string,
    getPath: (name: string) => string,
}

export type WindowMain = {
    on(channelName: string, callback: (e: any, data: any) => void): (() => void),
}
