import rollupHost from "../rolluphost";
import RollupInputOptions from "../RollupFileOptions";
import { RollupDirOptions } from "../RollupFileOptions";
import RollupOutputOptions from "../RollupOutputOptions";
import { RollupOutputOptionsDir } from "../RollupOutputOptions";
import hypothetical = require("rollup-plugin-hypothetical")
import * as fs from "fs";
import { fail } from "assert";
import { rollup, OutputChunk } from "rollup";
import { printTimings } from './timings';

describe("NetpackRollupHost", () => {

    describe("Bundling", () => {

        it("bundles multiple in memory files to single file", () => {

            // Arrange
            var classAFileContents = fs.readFileSync('testFiles/ModuleA/classa.js', "utf-8");
            var classBFileContents = fs.readFileSync('testFiles/ModuleB/classb.js', "utf-8");

            //var webRoot = "testFiles";
            var filePathA = "/ModuleA/ClassA";
            var filePathB = "/ModuleB/ClassB";

            var files = {

            };
            files[filePathA] = classAFileContents;
            files[filePathB] = classBFileContents;

            var inputOptions = new RollupInputOptions();
            inputOptions.input = "/ModuleB/ClassB";

            var hypotheticalPlugin = hypothetical({
                files: files
            });

            hypotheticalPlugin.cwd = false;
            inputOptions.plugins = [hypotheticalPlugin];

            var outputOptions = new RollupOutputOptions();
            outputOptions.format = "esm";
            outputOptions.sourcemap = true;
            // outputOptions.paths = {};
            //  outputOptions.globals = {};

            let sut = new rollupHost();
            sut.build(inputOptions, outputOptions).then(result => {

                var code = result.Output.Code;
                var sourceMap = result.Output.SourceMap;

            }).catch((reason) => {
                fail("error " + reason)
            });
        });

        // see https://github.com/rollup/rollup-starter-code-splitting
        it("bundles multiple entry points to code split chunks", () => {

            // Arrange
            var files = {
            };
            files["/src/main-a"] = fs.readFileSync('testFiles/CodeSplitting/main-a.js', "utf-8");
            files["/src/main-b"] = fs.readFileSync('testFiles/CodeSplitting/main-b.js', "utf-8");
            files["/src/used-by-a"] = fs.readFileSync('testFiles/CodeSplitting/used-by-a.js', "utf-8");
            files["/src/used-by-b"] = fs.readFileSync('testFiles/CodeSplitting/used-by-b.js', "utf-8");
            files["/src/used-by-both"] = fs.readFileSync('testFiles/CodeSplitting/used-by-both.js', "utf-8");
            files["/src/dynamically-imported/apply-color-and-message"] = fs.readFileSync('testFiles/CodeSplitting/dynamically-imported/apply-color-and-message.js', "utf-8");
            files["/src/dynamically-imported/dom"] = fs.readFileSync('testFiles/CodeSplitting/dynamically-imported/dom.js', "utf-8");

            var inputOptions = new RollupDirOptions();
            inputOptions.input = ["/src/main-a", "/src/main-b"];
            inputOptions.perf = true;
            var hypotheticalPlugin = hypothetical({
                files: files
            });

            hypotheticalPlugin.cwd = false;
            inputOptions.plugins = [hypotheticalPlugin];

            var outputOptions = new RollupOutputOptionsDir();
            outputOptions.format = "esm";
            outputOptions.sourcemap = "inline";
            let sut = new rollupHost();
            sut.BuildChunks(inputOptions, outputOptions).then(result => {

                printTimings(result.Timings);
                // for (let item in result) {
                //     var codeItem = result[item];
                //     console.log(codeItem);
                //  }          



            }).catch((reason) => {
                fail("error " + reason)
            });
        });

        it("uses cache when re-bundling to single file", () => {

            // Arrange
            var classAFileContents = fs.readFileSync('testFiles/ModuleA/classa.js', "utf-8");
            var classBFileContents = fs.readFileSync('testFiles/ModuleB/classb.js', "utf-8");

            //var webRoot = "testFiles";
            var filePathA = "/ModuleA/ClassA";
            var filePathB = "/ModuleB/ClassB";

            var files = {

            };
            files[filePathA] = classAFileContents;
            files[filePathB] = classBFileContents;

            // cold start.
            var inputOptions = new RollupInputOptions();
            inputOptions.input = "/ModuleB/ClassB";
            inputOptions.perf = true;

            var hypotheticalPlugin = hypothetical({
                files: files
            });

            hypotheticalPlugin.cwd = false;
            inputOptions.plugins = [hypotheticalPlugin];

            var outputOptions = new RollupOutputOptions();
            outputOptions.format = "esm";
            // outputOptions.paths = {};
            //  outputOptions.globals = {};

            let cache = null;
            let sut = new rollupHost();
            sut.build(inputOptions, outputOptions).then(result => {
                cache = result.Cache;
                console.log("------ No Cache =, Initial Build ------ ");
                printTimings(result.Timings);
                console.log(result.Output.Code);
                // now build again from cache, with no file changes.
                inputOptions.cache = cache;
                sut.build(inputOptions, outputOptions).then(result => {
                    cache = result.Cache;
                    console.log("------ Rebuild #1 using Cache ------ ");
                    printTimings(result.Timings);
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
                        printTimings(result.Timings);
                        console.log(result.Output.Code);
                    }).catch((reason) => {
                        fail("error " + reason)
                    });


                }).catch((reason) => {
                    fail("error " + reason)
                });


            }).catch((reason) => {
                fail("error " + reason)
            });

        });

    });
});