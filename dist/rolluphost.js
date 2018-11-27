"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rollup = require("rollup");
class RollupHost {
    BuildChunks(inputOptions, outputOptions, buildKey = null) {
        return __awaiter(this, void 0, void 0, function* () {
            inputOptions.experimentalCodeSplitting = true;
            const build = yield rollup.rollup(inputOptions);
            var timings = null;
            const outputBundle = yield build.generate(outputOptions);
            const output = outputBundle.output;
            var outputs = [];
            for (let key in output) {
                var chunk = output[key];
                if (chunk.code) {
                    var outputChunk = chunk;
                    var modulesResult = [];
                    for (let key in outputChunk.modules) {
                        var module = outputChunk.modules[key];
                        var moduleResult = { OriginalLength: module.originalLength, Length: module.renderedLength, RemovedExports: module.removedExports, Exports: module.renderedExports, Id: key };
                        modulesResult.push(moduleResult);
                    }
                    var code = outputChunk.code;
                    if (outputOptions.sourcemap === 'inline' && outputChunk.map != null) {
                        code += `\n//# sourceMappingUrl=${outputChunk.map.toUrl()}\n`;
                    }
                    var rollupResult = { Id: key, Code: code, SourceMap: outputChunk.map, FileName: outputChunk.fileName, Exports: outputChunk.exports, Imports: outputChunk.imports, IsEntry: outputChunk.isEntry, Modules: modulesResult };
                    outputs.push(rollupResult);
                }
                else if (chunk.toString) {
                    var file = chunk;
                    var fileResult = { Id: key, Code: file.toString() };
                    outputs.push(fileResult);
                }
            }
            var result = { Cache: build.cache, Outputs: outputs, Timings: null, Key: buildKey };
            if (build.getTimings != null) {
                timings = build.getTimings();
                result.Timings = timings;
            }
            return result;
        });
    }
    build(inputOptions, outputOptions, buildKey = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const bundle = yield rollup.rollup(inputOptions);
            var result = yield bundle.generate(outputOptions);
            var modulesResult = [];
            for (let key in result.modules) {
                var module = result.modules[key];
                var moduleResult = { OriginalLength: module.originalLength, Length: module.renderedLength, RemovedExports: module.removedExports, Exports: module.renderedExports, Id: key };
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
            var output = { Id: "", Code: code, SourceMap: result.map, FileName: result.fileName, Exports: result.exports, Imports: result.imports, IsEntry: result.isEntry, Modules: modulesResult, Cache: bundle.cache, Timings: timings };
            return { Cache: bundle.cache, Output: output, Timings: timings, Key: buildKey };
        });
    }
}
exports.default = RollupHost;
//# sourceMappingURL=rolluphost.js.map