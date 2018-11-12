import rollup = require('rollup');

export interface RollupCodeSplitResult {
    Outputs: RollupResult[]
    Cache: any,
    Timings: any
}

export interface RollupSingleFileBundleResult {
    Output: RollupResult
    Cache: any,
    Timings: any
    Key: string
}

export interface RollupResult {
    Code: string;
    SourceMap: SourceMap
    FileName: string
    Exports: string[]
    Imports: string[]
    IsEntry: boolean
    Modules: RollupModuleResult[]
}

export interface RollupModuleResult {
    OriginalLength: number;
    RemovedExports: string[]
    Length: number;
    Exports: string[]
}

export interface SourceMap {
    version: string;
    file: string;
    sources: string[];
    sourcesContent: string[];
    names: string[];
    mappings: string;

    toString(): string;
    toUrl(): string;
}

export default class RollupHost {

    public async BuildChunks(inputOptions: rollup.RollupDirOptions, outputOptions: rollup.OutputOptionsDir, buildKey:string=null): Promise<RollupCodeSplitResult> {
        inputOptions.experimentalCodeSplitting = true;
        const build = await rollup.rollup(inputOptions);       

        var timings = null;

        const outputBundle = await build.generate(outputOptions);
        const output = outputBundle.output;

        var outputs = [];

        for (let key in output) {
            var chunk: rollup.OutputFile | rollup.OutputChunk = output[key];

            if ((<rollup.OutputChunk>chunk).code) {
                var outputChunk = (<rollup.OutputChunk>chunk);
                var modulesResult = [];

                for (let key in outputChunk.modules) {
                    var module: rollup.RenderedModule = outputChunk.modules[key];
                    var moduleResult = { OriginalLength: module.originalLength, Length: module.renderedLength, RemovedExports: module.removedExports, Exports: module.renderedExports }
                    modulesResult.push(moduleResult);
                }

                var code = outputChunk.code;
                if (outputOptions.sourcemap === 'inline' && outputChunk.map != null) {
                    code += `\n//# sourceMappingUrl=${outputChunk.map.toUrl()}\n`;
                }

                var rollupResult = { Code: code, SourceMap: outputChunk.map, FileName: outputChunk.fileName, Exports: outputChunk.exports, Imports: outputChunk.imports, IsEntry: outputChunk.isEntry, Modules: modulesResult }
                outputs.push(rollupResult);
            }
            else if ((<rollup.OutputFile>chunk).toString) {
                var file = (<rollup.OutputFile>chunk);
                var fileResult = { Code: file.toString() }
                outputs.push(fileResult);
            }
        }

        var result = { Cache: build.cache, Outputs: outputs, Timings: null, Key: buildKey }
        if (build.getTimings != null) {
            timings = build.getTimings();
            result.Timings = timings;
        }

        return result;
    }

    public async build(inputOptions: rollup.RollupFileOptions, outputOptions: rollup.OutputOptions, buildKey:string=null): Promise<RollupSingleFileBundleResult> {
        const bundle = await rollup.rollup(inputOptions);
        
        var result = await bundle.generate(outputOptions);

        var modulesResult = [];
        for (let key in result.modules) {
            var module: rollup.RenderedModule = result.modules[key];
            var moduleResult = { OriginalLength: module.originalLength, Length: module.renderedLength, RemovedExports: module.removedExports, Exports: module.renderedExports }
            modulesResult.push(moduleResult);
        }

        var timings = null;
        if (bundle.getTimings != null) {
            timings = bundle.getTimings();
        }

        var code = result.code;     
       
        if (outputOptions.sourcemap === 'inline' && result.map != null) {
            code += `\n//# sourceMappingUrl=${result.map.toUrl()}\n`;
        }

        var output = { Code: code, SourceMap: result.map, FileName: result.fileName, Exports: result.exports, Imports: result.imports, IsEntry: result.isEntry, Modules: modulesResult, Cache: bundle.cache, Timings: timings }
        return { Cache: bundle.cache, Output: output, Timings: timings, Key: buildKey }
    }
}


