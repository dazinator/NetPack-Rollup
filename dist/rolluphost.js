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
    BuildChunks(inputOptions, outputOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            inputOptions.experimentalCodeSplitting = true;
            const build = yield rollup.rollup(inputOptions);
            const outputBundle = yield build.generate(outputOptions);
            const output = outputBundle.output;
            var results = [];
            for (let key in output) {
                var chunk = output[key];
                if (chunk.toString) {
                    var file = chunk;
                    var fileResult = { Code: file.toString() };
                    results.push(fileResult);
                }
                else if (chunk.toString) {
                    var outputChunk = chunk;
                    var modulesResult = [];
                    for (let key in outputChunk.modules) {
                        var module = outputChunk.modules[key];
                        var moduleResult = { OriginalLength: module.originalLength, Length: module.renderedLength, RemovedExports: module.removedExports, Exports: module.renderedExports };
                        modulesResult.push(moduleResult);
                    }
                    var rollupResult = { Code: outputChunk.code, SourceMap: outputChunk.map, FileName: outputChunk.fileName, Exports: outputChunk.exports, Imports: outputChunk.imports, IsEntry: outputChunk.isEntry, Modules: modulesResult };
                    results.push(rollupResult);
                }
            }
            return results;
        });
    }
    build(inputOptions, outputOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const bundle = yield rollup.rollup(inputOptions);
            var result = yield bundle.generate(outputOptions);
            var modulesResult = [];
            for (let key in result.modules) {
                var module = result.modules[key];
                var moduleResult = { OriginalLength: module.originalLength, Length: module.renderedLength, RemovedExports: module.removedExports, Exports: module.renderedExports };
                modulesResult.push(moduleResult);
            }
            var rollupResult = { Code: result.code, SourceMap: result.map, FileName: result.fileName, Exports: result.exports, Imports: result.imports, IsEntry: result.isEntry, Modules: modulesResult };
            return rollupResult;
        });
    }
}
exports.default = RollupHost;
//# sourceMappingURL=rolluphost.js.map