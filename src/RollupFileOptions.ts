import rollup = require('rollup');

export default class RollupInputOptions implements  rollup.RollupFileOptions
{
    cache?: rollup.RollupCache;      
    input: string;
    output?: rollup.OutputOptionsFile;
    manualChunks?: { [chunkAlias: string]: string[]; };
    external?: rollup.ExternalOption;
    plugins?: rollup.Plugin[];
    onwarn?: rollup.WarningHandler;
    experimentalCacheExpiry?: number;
    acorn?: {};
    acornInjectPlugins?: Function[];
    treeshake?: boolean | rollup.TreeshakingOptions;
    context?: string;
    moduleContext?: string | ((id: string) => string) | { [id: string]: string; };
    watch?: rollup.WatcherOptions;
    experimentalCodeSplitting?: boolean;
    experimentalDynamicImport?: boolean;
    experimentalTopLevelAwait?: boolean;
    inlineDynamicImports?: boolean;
    preserveSymlinks?: boolean;
    experimentalPreserveModules?: boolean;
    optimizeChunks?: boolean;
    chunkGroupingSize?: number;
    shimMissingExports?: boolean;
    pureExternalModules?: boolean;
    preferConst?: boolean;
    perf?: boolean;
    entry?: string;
    transform?: rollup.TransformHook;
    load?: rollup.LoadHook;
    resolveId?: rollup.ResolveIdHook;
    resolveExternal?: any;
}