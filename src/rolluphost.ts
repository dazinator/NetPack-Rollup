import rollup = require('rollup');

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

    public async BuildChunks(inputOptions: rollup.RollupDirOptions, outputOptions: rollup.OutputOptionsDir): Promise<RollupResult[]> {
        inputOptions.experimentalCodeSplitting = true;
        const build = await rollup.rollup(inputOptions);
        const outputBundle = await build.generate(outputOptions);
        const output = outputBundle.output;

        var results = [];

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

                var rollupResult = { Code: outputChunk.code, SourceMap: outputChunk.map, FileName: outputChunk.fileName, Exports: outputChunk.exports, Imports: outputChunk.imports, IsEntry: outputChunk.isEntry, Modules: modulesResult }
                results.push(rollupResult);
            }
            else if ((<rollup.OutputFile>chunk).toString) {
                var file = (<rollup.OutputFile>chunk);
                var fileResult = { Code: file.toString() }
                results.push(fileResult);
            }
        }

        return results;
    }

    public async build(inputOptions: rollup.RollupFileOptions, outputOptions: rollup.OutputOptions): Promise<RollupResult> {
        const bundle = await rollup.rollup(inputOptions);

        var result = await bundle.generate(outputOptions);
        var modulesResult = [];
        for (let key in result.modules) {
            var module: rollup.RenderedModule = result.modules[key];
            var moduleResult = { OriginalLength: module.originalLength, Length: module.renderedLength, RemovedExports: module.removedExports, Exports: module.renderedExports }
            modulesResult.push(moduleResult);
        }

        var rollupResult = { Code: result.code, SourceMap: result.map, FileName: result.fileName, Exports: result.exports, Imports: result.imports, IsEntry: result.isEntry, Modules: modulesResult }
        return rollupResult;
    }
}


