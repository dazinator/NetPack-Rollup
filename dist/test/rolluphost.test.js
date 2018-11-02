"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rolluphost_1 = require("../rolluphost");
const RollupFileOptions_1 = require("../RollupFileOptions");
const RollupFileOptions_2 = require("../RollupFileOptions");
const RollupOutputOptions_1 = require("../RollupOutputOptions");
const RollupOutputOptions_2 = require("../RollupOutputOptions");
const hypothetical = require("rollup-plugin-hypothetical");
const fs = require("fs");
const assert_1 = require("assert");
const timings_1 = require("./timings");
describe("NetpackRollupHost", () => {
    describe("Bundling", () => {
        it("bundles multiple in memory files to single file", () => {
            // Arrange
            var classAFileContents = fs.readFileSync('testFiles/ModuleA/classa.js', "utf-8");
            var classBFileContents = fs.readFileSync('testFiles/ModuleB/classb.js', "utf-8");
            //var webRoot = "testFiles";
            var filePathA = "/ModuleA/ClassA";
            var filePathB = "/ModuleB/ClassB";
            var files = {};
            files[filePathA] = classAFileContents;
            files[filePathB] = classBFileContents;
            var inputOptions = new RollupFileOptions_1.default();
            inputOptions.input = "/ModuleB/ClassB";
            var hypotheticalPlugin = hypothetical({
                files: files
            });
            hypotheticalPlugin.cwd = false;
            inputOptions.plugins = [hypotheticalPlugin];
            var outputOptions = new RollupOutputOptions_1.default();
            outputOptions.format = "esm";
            outputOptions.sourcemap = true;
            // outputOptions.paths = {};
            //  outputOptions.globals = {};
            let sut = new rolluphost_1.default();
            sut.build(inputOptions, outputOptions).then(result => {
                var code = result.Output.Code;
                var sourceMap = result.Output.SourceMap;
            }).catch((reason) => {
                assert_1.fail("error " + reason);
            });
        });
        // see https://github.com/rollup/rollup-starter-code-splitting
        it("bundles multiple entry points to code split chunks", () => {
            // Arrange
            var files = {};
            files["/src/main-a"] = fs.readFileSync('testFiles/CodeSplitting/main-a.js', "utf-8");
            files["/src/main-b"] = fs.readFileSync('testFiles/CodeSplitting/main-b.js', "utf-8");
            files["/src/used-by-a"] = fs.readFileSync('testFiles/CodeSplitting/used-by-a.js', "utf-8");
            files["/src/used-by-b"] = fs.readFileSync('testFiles/CodeSplitting/used-by-b.js', "utf-8");
            files["/src/used-by-both"] = fs.readFileSync('testFiles/CodeSplitting/used-by-both.js', "utf-8");
            files["/src/dynamically-imported/apply-color-and-message"] = fs.readFileSync('testFiles/CodeSplitting/dynamically-imported/apply-color-and-message.js', "utf-8");
            files["/src/dynamically-imported/dom"] = fs.readFileSync('testFiles/CodeSplitting/dynamically-imported/dom.js', "utf-8");
            var inputOptions = new RollupFileOptions_2.RollupDirOptions();
            inputOptions.input = ["/src/main-a", "/src/main-b"];
            inputOptions.perf = true;
            var hypotheticalPlugin = hypothetical({
                files: files
            });
            hypotheticalPlugin.cwd = false;
            inputOptions.plugins = [hypotheticalPlugin];
            var outputOptions = new RollupOutputOptions_2.RollupOutputOptionsDir();
            outputOptions.format = "esm";
            outputOptions.sourcemap = "inline";
            let sut = new rolluphost_1.default();
            sut.BuildChunks(inputOptions, outputOptions).then(result => {
                timings_1.printTimings(result.Timings);
                // for (let item in result) {
                //     var codeItem = result[item];
                //     console.log(codeItem);
                //  }          
            }).catch((reason) => {
                assert_1.fail("error " + reason);
            });
        });
        it("uses cache when re-bundling to single file", () => {
            // Arrange
            var classAFileContents = fs.readFileSync('testFiles/ModuleA/classa.js', "utf-8");
            var classBFileContents = fs.readFileSync('testFiles/ModuleB/classb.js', "utf-8");
            //var webRoot = "testFiles";
            var filePathA = "/ModuleA/ClassA";
            var filePathB = "/ModuleB/ClassB";
            var files = {};
            files[filePathA] = classAFileContents;
            files[filePathB] = classBFileContents;
            // cold start.
            var inputOptions = new RollupFileOptions_1.default();
            inputOptions.input = "/ModuleB/ClassB";
            inputOptions.perf = true;
            var hypotheticalPlugin = hypothetical({
                files: files
            });
            hypotheticalPlugin.cwd = false;
            inputOptions.plugins = [hypotheticalPlugin];
            var outputOptions = new RollupOutputOptions_1.default();
            outputOptions.format = "esm";
            // outputOptions.paths = {};
            //  outputOptions.globals = {};
            let cache = null;
            let sut = new rolluphost_1.default();
            sut.build(inputOptions, outputOptions).then(result => {
                cache = result.Cache;
                console.log("------ No Cache =, Initial Build ------ ");
                timings_1.printTimings(result.Timings);
                console.log(result.Output.Code);
                // now build again from cache, with no file changes.
                inputOptions.cache = cache;
                sut.build(inputOptions, outputOptions).then(result => {
                    cache = result.Cache;
                    console.log("------ Rebuild #1 using Cache ------ ");
                    timings_1.printTimings(result.Timings);
                    console.log(result.Output.Code);
                    // now build again from cache, with one file change.
                    inputOptions.cache = cache;
                    files[filePathB] = fs.readFileSync('testFiles/ModuleB/classbchanged.js', "utf-8");
                    // see https://github.com/Permutatrix/rollup-plugin-hypothetical/issues/10
                    hypotheticalPlugin = hypothetical({
                        files: files
                    });
                    inputOptions.plugins = [hypotheticalPlugin];
                    sut.build(inputOptions, outputOptions).then(result => {
                        cache = result.Cache;
                        console.log("------ Rebuild #2 using Cache, but class changed ------ ");
                        timings_1.printTimings(result.Timings);
                        console.log(result.Output.Code);
                    }).catch((reason) => {
                        assert_1.fail("error " + reason);
                    });
                }).catch((reason) => {
                    assert_1.fail("error " + reason);
                });
            }).catch((reason) => {
                assert_1.fail("error " + reason);
            });
        });
    });
});
//# sourceMappingURL=rolluphost.test.js.map