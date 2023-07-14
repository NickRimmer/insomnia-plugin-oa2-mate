/* eslint-disable @typescript-eslint/no-explicit-any */
export type PluginTemplateTag = {
    args: any[];
    name: string;
    displayName: string;
    // disablePreview: () => boolean;
    description: string;
    // actions: any[];
    run: (context: any, ...arg: any[]) => Promise<any> | any;
    deprecated?: boolean;
    validate?: (value: any) => string | null;
    priority?: number;
}

export type BaseDoc = {
    _id: string;
    parentId: string;
    modified: number;
}
